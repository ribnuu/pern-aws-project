const { Sequelize } = require("sequelize");
const setUpAssociations = require("../../models/pos");
const dayjs = require("dayjs");

const getAllRepsCommissionPayQuery = async () => {
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

    const response = await StockBillDetail.findAll({
      include: [
        {
          model: StockBillHeader,
          as: "header",
          where: {
            paid_status: true,
          },
          include: [
            {
              model: StockBillpayDetail,
              as: "billPayDetail",
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
      order: [
        [
          { model: StockBillHeader, as: "header" },
          { model: StockBillpayDetail, as: "billPayDetail" },
          "created_at",
          "DESC",
        ],
      ],
    });

    let finalGrandTotal = 0;
    let finalQtyTotal = 0;
    let finalCommissionTotal = 0;
    let pendingCommissionTotal = 0;

    await Promise.all(
      response.map(async (item) => {
        try {
          const customerPersonId =
            item.header.customerInstitution.representatives[0]?.customerPerson
              ?.id;

          if (
            item.header.billPayDetail &&
            item.header.billPayDetail.length > 0
          ) {
            const latestBpDate = new Date(
              item.header.billPayDetail[0].created_at
            ).toISOString();
            const r = await StockBillHeader.update(
              { paid_date_time: latestBpDate },
              {
                where: {
                  bill_number: item.header.bill_number,
                },
              }
            );
            console.log(`Rows affected: ${r[0]}`);
            if (r[0] === 0) {
              console.log(
                `No rows were updated for bill number: ${item.header.bill_number}`
              );
            }
          } else {
            const latestBpDate = new Date(
              "Fri Sep 25 2024 14:28:25 GMT+0530 (India Standard Time)"
            ).toISOString();
            const r = await StockBillHeader.update(
              { paid_date_time: latestBpDate },
              {
                where: {
                  bill_number: item.header.bill_number,
                },
              }
            );
            console.log(`Rows affected: ${r[0]}`);
            if (r[0] === 0) {
              console.log(
                `No rows were updated for bill number: ${item.header.bill_number}`
              );
            }
            console.log(item);
          }

          const cacheKey = `${item.item_code}-${customerPersonId}`;

          const commission = await StockRepsComm.findOne({
            where: {
              item_code: item.item_code,
              customer_person_id: customerPersonId,
            },
            attributes: ["commission", "created_at"],
          });

          // Set commission data and cache if found
          commissionData = {
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

    return {
      data: response,
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
