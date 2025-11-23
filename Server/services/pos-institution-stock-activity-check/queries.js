const setUpAssociations = require("../../models/pos");
// const fs = require("fs");
// const path = require("path");

// const getInstitutionsByNoPendingBills = async (institutions = []) => {
//   try {
//     await Promise.all(
//       institutions.map(async (item) => {
//         try {
//           const bills = item?.bills || [];
//           const pendingBillsCount = bills.filter(
//             (b) => b.paid_status === false
//           ).length;
//           const paidBillsCount = bills.filter(
//             (b) => b.paid_status === true
//           ).length;
//           if (item?.name === "MARINE DISH") {
//             console.log(pendingBillsCount);
//             console.log(paidBillsCount);
//           }
//           item.dataValues.paidBillsCount = paidBillsCount;
//           item.dataValues.pendingBillsCount = pendingBillsCount;

//           item.dataValues.billsCount = bills?.length || 0;

//           const lastBillingDate =
//             bills.length > 0
//               ? new Date(bills[bills.length - 1].created_at)
//               : null;

//           item.dataValues.lastBillingDate = lastBillingDate;

//           item.dataValues.hasPendingBills =
//             pendingBillsCount && pendingBillsCount > 0 ? true : false;
//         } catch (error) {
//           console.error("Error fetching bill headers:", error);
//         }
//       })
//     );
//     return institutions;
//   } catch (error) {
//     return [];
//   }
// };

const getInstitutionsByNoPendingBills = async (institutions = []) => {
  try {
    // const billIds = []; // Array to store the bill IDs
    await Promise.all(
      institutions.map(async (item) => {
        try {
          const bills = item?.bills || [];

          // Collect all the bill IDs
          // const billIdsForInstitution = bills.map((b) => b.id);
          // billIds.push(...billIdsForInstitution); // Push to the main array

          const pendingBillsCount = bills.filter(
            (b) => b.paid_status === false
          ).length;
          const paidBillsCount = bills.filter(
            (b) => b.paid_status === true
          ).length;

          item.dataValues.paidBillsCount = paidBillsCount;
          item.dataValues.pendingBillsCount = pendingBillsCount;
          item.dataValues.billsCount = bills?.length || 0;

          const lastBillingDate =
            bills.length > 0
              ? new Date(bills[bills.length - 1].created_at)
              : null;

          item.dataValues.lastBillingDate = lastBillingDate;
          item.dataValues.hasPendingBills =
            pendingBillsCount && pendingBillsCount > 0 ? true : false;
        } catch (error) {
          console.error("Error fetching bill headers:", error);
        }
      })
    );

    // Write the collected bill IDs to a JSON file
    // const filePath = path.join(__dirname, "bill_ids.json");
    // fs.writeFileSync(filePath, JSON.stringify(billIds, null, 2), "utf-8");

    return institutions;
  } catch (error) {
    console.error("Error processing institutions:", error);
    return [];
  }
};

const getInstitutionsByNoTransactionsForNDays = async (
  institutions = [],
  nDays = 30
) => {
  try {
    await Promise.all(
      institutions.map(async (item) => {
        try {
          const bills = item?.bills || [];
          const pendingBillsCount = bills.filter(
            (b) => b.paid_status === false
          ).length;
          const paidBillsCount = bills.filter(
            (b) => b.paid_status === true
          ).length;

          item.dataValues.paidBillsCount = paidBillsCount;
          item.dataValues.pendingBillsCount = pendingBillsCount;
          item.dataValues.billsCount = bills?.length || 0;

          const lastBillingDate =
            bills.length > 0
              ? new Date(bills[bills.length - 1].created_at)
              : null;

          if (item.name === "MKB CEYLON SUPERMARKET") {
            item.bills.forEach((element) => {
              console.log(element.created_at);
            });
          }

          item.dataValues.lastBillingDate = lastBillingDate;

          item.dataValues.hasPendingBills =
            pendingBillsCount > 0 ? true : false;

          // Add the noTransactionsForNDays flag based on the lastBillingDate
          if (lastBillingDate) {
            const today = new Date();
            const timeDiff = today - lastBillingDate; // Time difference in milliseconds
            const dayDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days

            // If no transactions have occurred within the last N days
            item.dataValues.noTransactionsForNDays = dayDiff >= nDays;
          } else {
            // If there is no lastBillingDate, it means no transactions, so set the flag to true
            item.dataValues.noTransactionsForNDays = true;
          }
        } catch (error) {
          console.error("Error fetching bill headers:", error);
        }
      })
    );
    return institutions;
  } catch (error) {
    console.error("Error in getInstitutionsByNoTransactionsForNDays:", error);
    return [];
  }
};

const getInstitutionsByMoreThanNPendingBills = async (
  institutions = [],
  nBills = 5 // The number of pending bills to check against
) => {
  try {
    await Promise.all(
      institutions.map(async (item) => {
        try {
          const bills = item?.bills || [];
          const pendingBillsCount = bills.filter(
            (b) => b.paid_status === false
          ).length;
          const paidBillsCount = bills.filter(
            (b) => b.paid_status === true
          ).length;

          item.dataValues.paidBillsCount = paidBillsCount;
          item.dataValues.pendingBillsCount = pendingBillsCount;
          item.dataValues.billsCount = bills?.length || 0;

          const lastBillingDate =
            bills.length > 0
              ? new Date(bills[bills.length - 1].created_at)
              : null;

          item.dataValues.lastBillingDate = lastBillingDate;

          item.dataValues.hasPendingBills = pendingBillsCount > 0;

          // Add flag for institutions with more than `nBills` pending bills
          item.dataValues.hasMoreThanNPendingBills = pendingBillsCount > nBills;
        } catch (error) {
          console.error("Error fetching bill headers:", error);
        }
      })
    );

    return institutions;
  } catch (error) {
    console.error("Error in getInstitutionsByMoreThanNPendingBills:", error);
    return [];
  }
};

const getInstitutionStockActivityCheckDataQuery = async ({
  loadInstitutionsBy,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      StockBillHeader,
      StockCustomerInstitution,
      Address,
      StockInstitutionRepresentative,
      StockCustomerPerson,
    } = setUpAssociations(db_name);

    const include = [];
    include.push({
      model: Address,
      as: "addresses",
      limit: 1,
      attributes: ["city", "district", "province"],
      required: false,
    });

    include.push({
      model: StockInstitutionRepresentative,
      as: "representatives",
      limit: 1,
      attributes: ["stock_customer_person_id"],
      required: false,
      include: {
        model: StockCustomerPerson,
        as: "customerPerson",
        attributes: ["name"],
      },
    });

    let institutions = [];
    institutions = await StockCustomerInstitution.findAll({
      attributes: ["id", "name", "location_url", "is_active"],
      include: [
        {
          model: StockBillHeader,
          as: "bills",
          where: {
            is_deleted: false,
          },
          attributes: ["created_at", "paid_status", "id"],
        },
        ...include,
      ],
      order: [[{ model: StockBillHeader, as: "bills" }, "created_at", "ASC"]], // Order bills by created_at in descending order
    });

    if (loadInstitutionsBy === "NO_PENDING_BILLS") {
      const res = await getInstitutionsByNoPendingBills(institutions);
      return res;
    }

    if (loadInstitutionsBy === "HAVE_PENDING_BILLS") {
      const res = await getInstitutionsByNoPendingBills(institutions);
      return res;
    }

    if (loadInstitutionsBy === "NO_TRANSACTIONS_WITHIN_LAST_30_DAYS") {
      const res = getInstitutionsByNoTransactionsForNDays(institutions, 30);
      return res;
    }

    if (loadInstitutionsBy === "NO_TRANSACTIONS_WITHIN_LAST_21_DAYS") {
      const res = getInstitutionsByNoTransactionsForNDays(institutions, 21);
      return res;
    }

    if (loadInstitutionsBy === "MORE_THAN_1_PENDING_BILLS") {
      const res = getInstitutionsByMoreThanNPendingBills(institutions, 1);
      return res;
    }

    return [];
  } catch (error) {
    console.error(
      "Error fetching institution stock activity check data",
      error
    );
    throw error;
  }
};

module.exports = {
  getInstitutionStockActivityCheckDataQuery,
};
