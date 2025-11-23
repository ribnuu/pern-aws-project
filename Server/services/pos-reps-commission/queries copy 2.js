const { Sequelize } = require("sequelize");
const setUpAssociations = require("../../models/pos");

const getAllRepsCommissionPayQuery = async ({
  fromDate,
  toDate,
  representativeStockCustomerPersonId, // Stock Customer Person Id, which is th Representative
  institutionId,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillDetail,
      StockBillpayDetail,
      StockBillHeader,
      StockCustomerInstitution,
      StockInstitutionRepresentative,
      StockCustomerPerson,
      StockItemHeader,
      StockRepsComm,
      StockRepsPaid,
    } = setUpAssociations(db_name);

    const startOfDay = fromDate ? new Date(fromDate) : null;
    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999); // Set to end of day
    }

    if (startOfDay) {
      startOfDay.setHours(0, 0, 0, 0);
    }

    const response = await StockBillDetail.findAll({
      include: [
        {
          model: StockBillHeader,
          as: "header",
          where: {
            stock_customer_institution_id: {
              [Sequelize.Op.ne]: null, // This checks if the column is not null
            },
            is_bill_to_company: true,
            paid_status: true,
            ...(institutionId && {
              stock_customer_institution_id: institutionId,
            }),
          },
          include: [
            {
              model: StockBillpayDetail,
              as: "billPayDetail",
              where: {
                ...(startOfDay || endOfDay
                  ? {
                      created_at: {
                        ...(startOfDay
                          ? { [Sequelize.Op.gte]: startOfDay }
                          : {}),
                        ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}),
                      },
                    }
                  : {}),
              },
            },
            {
              model: StockCustomerInstitution,
              as: "customerInstitution",
              attributes: ["name", "id"],
              include: [
                {
                  model: StockInstitutionRepresentative,
                  as: "representatives",
                  limit: 1,
                  include: [
                    {
                      model: StockCustomerPerson,
                      as: "customerPerson",
                      attributes: ["name", "id"],
                      where: representativeStockCustomerPersonId
                        ? { id: representativeStockCustomerPersonId }
                        : {},
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: StockItemHeader,
          as: "itemHeader",
        },
      ],
    });

    let finalGrandTotal = 0;
    let finalQtyTotal = 0;
    let finalCommissionTotal = 0;
    let pendingCommissionTotal = 0;

    const filteredResponse = response.filter((item) => {
      // Check if the condition is met to remove the item
      if (
        representativeStockCustomerPersonId &&
        item?.header?.customerInstitution?.representatives &&
        item?.header?.customerInstitution?.representatives.length <= 0
      ) {
        return false; // Exclude the item from the final response
      }
      return true; // Keep the item in the final response
    });

    // Extract item_codes, bill_numbers, and customerPersonIds from the filteredResponse array
    // This will allow us to perform bulk queries instead of querying in each loop iteration
    const itemCodes = filteredResponse.map((item) => item.item_code);
    const billNumbers = filteredResponse.map((item) => item.header.bill_number);
    const customerPersonIds = filteredResponse.map(
      (item) =>
        item.header.customerInstitution.representatives[0].customerPerson.id
    );

    // Fetch all relevant StockRepsComm records in bulk based on item_code and customer_person_id
    // This reduces the number of individual queries in the loop
    const commissions = await StockRepsComm.findAll({
      where: {
        item_code: { [Sequelize.Op.in]: itemCodes },
        customer_person_id: { [Sequelize.Op.in]: customerPersonIds },
      },
      attributes: ["commission", "item_code", "customer_person_id"], // Fetch only necessary attributes
    });

    // Fetch all StockRepsPaid records in bulk based on item_code and bill_number
    // This ensures that all relevant records are retrieved with a single query
    const stockRepsPaidRecords = await StockRepsPaid.findAll({
      where: {
        item_code: { [Sequelize.Op.in]: itemCodes },
        bill_number: { [Sequelize.Op.in]: billNumbers },
      },
    });

    // Create a commissionMap by organizing StockRepsComm results for quick lookup
    // Keys are a combination of item_code and customer_person_id for each commission
    const commissionMap = commissions.reduce((acc, curr) => {
      const key = `${curr.item_code}-${curr.customer_person_id}`;
      acc[key] = curr.commission; // Store the commission using the combined key
      return acc;
    }, {});

    // Create a paidMap by organizing StockRepsPaid results for quick lookup
    // Keys are a combination of item_code and bill_number for each paid record
    const paidMap = stockRepsPaidRecords.reduce((acc, curr) => {
      const key = `${curr.item_code}-${curr.bill_number}`;
      acc[key] = true; // If a paid record exists, mark it as true
      return acc;
    }, {});

    // Process each item in filteredResponse asynchronously
    await Promise.all(
      filteredResponse.map(async (item) => {
        try {
          // Extract the customerPersonId from the item for the commission lookup
          const customerPersonId =
            item.header.customerInstitution.representatives[0].customerPerson
              .id;

          // Create a key to find the corresponding commission in the commissionMap
          const key = `${item.item_code}-${customerPersonId}`;
          const commissionValue = commissionMap[key] || 0; // Default to 0 if not found

          // Build an object containing all the values to be set on the item
          const itemData = {
            commission: commissionValue, // Set the commission amount
            totalCommission: commissionValue * item.quantity, // Calculate total commission
            isComAvailable: !!commissionValue, // Set if commission is available (true/false)
            isCommissionPaid:
              paidMap[`${item.item_code}-${item.header.bill_number}`] || false, // Check if commission is paid
            allowSubmit: true, // Set submission allowance flag
          };

          // Update grand totals and pending commissions for the final output
          finalGrandTotal += item?.header?.grand_total || 0;
          finalQtyTotal += item?.quantity || 0;
          finalCommissionTotal += itemData.totalCommission;

          // If commission hasn't been paid, add to pendingCommissionTotal
          if (!itemData.isCommissionPaid) {
            pendingCommissionTotal += itemData.totalCommission;
          }

          // Set all the data values on the item using item.set()
          item.set(itemData);
        } catch (error) {
          // In case of an error, set default values on the item
          item.set({
            commission: 0,
            totalCommission: 0,
            allowSubmit: false,
            isCommissionPaid: false,
            isComAvailable: false,
          });
        }
      })
    );

    return {
      data: filteredResponse,
      finalGrandTotal: finalGrandTotal,
      finalQtyTotal: finalQtyTotal,
      finalCommissionTotal: finalCommissionTotal,
      pendingCommissionTotal: pendingCommissionTotal,
    };
  } catch (error) {
    console.error("Failed @ getAllRepsCommissionPayQuery", error);
    throw error;
  }
};

module.exports = {
  getAllRepsCommissionPayQuery,
};
