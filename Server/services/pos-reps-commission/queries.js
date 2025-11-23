const { Sequelize } = require("sequelize");
const setUpAssociations = require("../../models/pos");
const dayjs = require("dayjs");

const getAllRepsCommissionPayQuery = async ({
  fromDate,
  toDate,
  representativeStockCustomerPersonId, // Stock Customer Person Id, which is th Representative
  institutionId,
  loadCustomerBills,
}) => {
  const loadCustomerBillsBoolean = loadCustomerBills === "true";

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
          // paid_date_time
          model: StockBillHeader,
          as: "header",
          where: {
            ...(loadCustomerBillsBoolean
              ? {
                  paid_status: true,
                  ...(institutionId && {
                    stock_customer_institution_id: institutionId,
                  }),
                }
              : {
                  stock_customer_institution_id: {
                    [Sequelize.Op.ne]: null, // This checks if the column is not null
                  },
                  is_bill_to_company: true, // Uncomment this if it's needed
                  paid_status: true,
                  ...(institutionId && {
                    stock_customer_institution_id: institutionId,
                  }),
                }),
            ...(startOfDay || endOfDay
              ? {
                  paid_date_time: {
                    ...(startOfDay ? { [Sequelize.Op.gte]: startOfDay } : {}),
                    ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}),
                  },
                }
              : {}),
          },

          // where: {
          //   stock_customer_institution_id: {
          //     [Sequelize.Op.ne]: null, // This checks if the column is not null
          //   },
          //   is_bill_to_company: true,
          //   paid_status: true,
          //   ...(institutionId && {
          //     stock_customer_institution_id: institutionId,
          //   }),
          // },
          include: [
            {
              model: StockBillpayDetail,
              as: "billPayDetail",
              // where: {
              //   ...(startOfDay || endOfDay
              //     ? {
              //         created_at: {
              //           ...(startOfDay
              //             ? { [Sequelize.Op.gte]: startOfDay }
              //             : {}),
              //           ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}),
              //         },
              //       }
              //     : {}),
              // },
            },
            {
              model: StockCustomerInstitution,
              as: "customerInstitution",
              attributes: ["name", "id", "is_active"],
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

    await Promise.all(
      filteredResponse.map(async (item) => {
        try {
          const customerPersonId =
            item.header.customerInstitution.representatives[0]?.customerPerson
              ?.id;

          const cacheKey = `${item.item_code}-${customerPersonId}`;

          const commission = await StockRepsComm.findOne({
            where: {
              item_code: item.item_code,
              customer_person_id: customerPersonId,
            },
            attributes: ["commission", "created_at"],
          });

          // Set commission data and cache if found
          const commissionData = {
            commission: commission?.commission || 0,
            created_at: commission?.created_at || null,
          };

          // Set commission availability based on the existence of a commission
          item.setDataValue("isComAvailable", !!commissionData.commission);

          // Fetch all StockRepsPaid entries for this item and bill number
          const stockRepsPaid = await StockRepsPaid.findAll({
            where: {
              item_code: item.item_code,
              bill_number: item.header.bill_number,
            },
          });

          const commisPaidOn =
            stockRepsPaid && stockRepsPaid.length > 0
              ? dayjs(stockRepsPaid[0].created_at).format("MMMM D, YYYY h:mm A")
              : "";

          // Set the commission and calculate the total commission
          const commissionValue = commissionData.commission || 0;

          item.setDataValue("commission", commissionValue);
          item.setDataValue("totalCommission", commissionValue * item.quantity);
          item.setDataValue("commisPaidOn", commisPaidOn);

          // Update final totals for grand total, quantity, and commission
          finalGrandTotal += item?.header?.grand_total || 0;
          finalQtyTotal += item?.quantity || 0;
          finalCommissionTotal += item.getDataValue("totalCommission");

          // Set isCommissionPaid based on whether stockRepsPaid records exist
          const isCommissionPaid = stockRepsPaid && stockRepsPaid.length > 0;
          item.setDataValue("isCommissionPaid", isCommissionPaid);

          // If commission is not paid, add to the pending commission total
          if (!isCommissionPaid) {
            pendingCommissionTotal += item.getDataValue("totalCommission");
          }

          // Set allowSubmit flag
          item.setDataValue("allowSubmit", true);
        } catch (error) {
          // console.error("Error processing item:", error);
          // Handle errors and set default values
          item.setDataValue("commission", 0);
          item.setDataValue("totalCommission", 0);
          item.setDataValue("allowSubmit", false);
          item.setDataValue("isCommissionPaid", false);
          pendingCommissionTotal += 0;
          item.setDataValue("isComAvailable", false);
        }
      })
    );

    // const commissionCache = {}; // Use an object for caching

    // for (const item of filteredResponse) {
    //   try {
    //     const customerPersonId =
    //       item.header.customerInstitution.representatives[0]?.customerPerson
    //         ?.id;

    //     const cacheKey = `${item.item_code}-${customerPersonId}`;

    //     console.log("Before Cache Check:", commissionCache); // Check cache state before accessing

    //     // Check if the data is in cache
    //     if (commissionCache[cacheKey]) {
    //       console.log("Cache hit for key:", cacheKey);
    //       commissionData = commissionCache[cacheKey];
    //     } else {
    //       console.log("Cache miss for key:", cacheKey); // Cache miss log
    //       // Fetch commission if not cached
    //       const commission = await StockRepsComm.findOne({
    //         where: {
    //           item_code: item.item_code,
    //           customer_person_id: customerPersonId,
    //         },
    //         attributes: ["commission", "created_at"],
    //       });

    //       // Set commission data and cache if found
    //       commissionData = {
    //         commission: commission?.commission || 0,
    //         created_at: commission?.created_at || null,
    //       };

    //       // Store in cache
    //       commissionCache[cacheKey] = commissionData;
    //       console.log("Cache set for key:", cacheKey, "Data:", commissionData); // Log the cache set
    //     }

    //     // Set commission availability based on the existence of a commission
    //     item.setDataValue("isComAvailable", !!commissionData.commission);

    //     // Fetch all StockRepsPaid entries for this item and bill number
    //     const stockRepsPaid = await StockRepsPaid.findAll({
    //       where: {
    //         item_code: item.item_code,
    //         bill_number: item.header.bill_number,
    //       },
    //     });

    //     const commisPaidOn =
    //       stockRepsPaid && stockRepsPaid.length > 0
    //         ? dayjs(stockRepsPaid[0].created_at).format("MMMM D, YYYY h:mm A")
    //         : "";

    //     // Set the commission and calculate the total commission
    //     const commissionValue = commissionData.commission || 0;

    //     item.setDataValue("commission", commissionValue);
    //     item.setDataValue("totalCommission", commissionValue * item.quantity);
    //     item.setDataValue("commisPaidOn", commisPaidOn);

    //     // Update final totals for grand total, quantity, and commission
    //     finalGrandTotal += item?.header?.grand_total || 0;
    //     finalQtyTotal += item?.quantity || 0;
    //     finalCommissionTotal += item.getDataValue("totalCommission");

    //     // Set isCommissionPaid based on whether stockRepsPaid records exist
    //     const isCommissionPaid = stockRepsPaid && stockRepsPaid.length > 0;
    //     item.setDataValue("isCommissionPaid", isCommissionPaid);

    //     // If commission is not paid, add to the pending commission total
    //     if (!isCommissionPaid) {
    //       pendingCommissionTotal += item.getDataValue("totalCommission");
    //     }

    //     // Set allowSubmit flag
    //     item.setDataValue("allowSubmit", true);
    //   } catch (error) {
    //     console.error("Error processing item:", error);
    //     // Handle errors and set default values
    //     item.setDataValue("commission", 0);
    //     item.setDataValue("totalCommission", 0);
    //     item.setDataValue("allowSubmit", false);
    //     item.setDataValue("isCommissionPaid", false);
    //     pendingCommissionTotal += 0;
    //     item.setDataValue("isComAvailable", false);
    //   }
    // }

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
