const { Sequelize, Op } = require("sequelize");
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

    // await Promise.all(
    //   filteredResponse.map(async (item) => {
    //     try {
    //       const commission = await StockRepsComm.findOne({
    //         where: {
    //           item_code: item.item_code,
    //           customer_person_id:
    //             item.header.customerInstitution.representatives[0]
    //               .customerPerson.id,
    //         },
    //         attributes: ["commission"],
    //       });

    //       if (commission) {
    //         item.dataValues.isComAvailable = true;
    //       }

    //       const stockRepsPaid = await StockRepsPaid.findAll({
    //         where: {
    //           item_code: item.item_code,
    //           bill_number: item.header.bill_number,
    //         },
    //       });

    //       item.dataValues.commission = commission.commission;
    //       item.dataValues.totalCommission =
    //         item.dataValues.commission * item.quantity;
    //       finalGrandTotal += item?.header?.grand_total || 0;
    //       finalQtyTotal += item?.quantity || 0;
    //       finalCommissionTotal += item.dataValues.totalCommission;

    //       if (stockRepsPaid && stockRepsPaid.length > 0) {
    //         item.dataValues.isCommissionPaid = true;
    //       } else {
    //         item.dataValues.isCommissionPaid = false;
    //         pendingCommissionTotal += item.dataValues.totalCommission;
    //       }

    //       item.dataValues.allowSubmit = true;
    //     } catch (error) {
    //       item.dataValues.commission = 0;
    //       item.dataValues.totalCommission = 0;
    //       item.dataValues.allowSubmit = false;
    //       item.dataValues.isCommissionPaid = false;
    //       pendingCommissionTotal += 0;
    //       item.dataValues.isComAvailable = false;
    //     }
    //   })
    // );

    await Promise.all(
      filteredResponse.map(async (item) => {
        try {
          // Fetch commission based on item_code and the representative's customer person ID
          const commission = await StockRepsComm.findOne({
            where: {
              item_code: item.item_code,
              customer_person_id:
                item.header.customerInstitution.representatives[0]
                  .customerPerson.id,
            },
            attributes: ["commission"],
          });

          // Set commission availability based on the existence of a commission
          if (commission) {
            item.setDataValue("isComAvailable", true);
          }

          // Fetch all StockRepsPaid entries for this item and bill number
          const stockRepsPaid = await StockRepsPaid.findAll({
            where: {
              item_code: item.item_code,
              bill_number: item.header.bill_number,
            },
          });

          // Set the commission and calculate the total commission
          const commissionValue = commission?.commission || 0;
          item.setDataValue("commission", commissionValue);
          item.setDataValue("totalCommission", commissionValue * item.quantity);

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
