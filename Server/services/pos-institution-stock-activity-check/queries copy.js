const setUpAssociations = require("../../models/pos");
const { Op, Sequelize } = require("sequelize");

const getInstitutionsByNoPendingBills = async (institutions = []) => {
  try {
    await Promise.all(
      institutions.map(async (item) => {
        try {
          const insId = item.id;

          // Get the actual bill headers, not just the count
          const billHeaders = await StockBillHeader.findAll({
            where: {
              stock_customer_institution_id: insId,
            },
            attributes: ["created_at", "paid_status"], // Retrieve the created_at and paid_status
            order: [["created_at", "DESC"]], // Orders by created_at in descending order (latest first)
          });

          // If you want to get the count of paid bills, you can filter like this
          const paidBillsCount = billHeaders.filter(
            (b) => b.paid_status === true
          ).length;

          const pendingBillsCount = billHeaders.filter(
            (b) => b.paid_status === false
          ).length;

          item.dataValues.billsCount = billHeaders?.length || 0;

          // Set the paidBillsCount on the item
          item.dataValues.paidBillsCount = paidBillsCount;

          // Get the last billing date, if there are any bills
          item.dataValues.lastBillingDate =
            billHeaders.length > 0 ? billHeaders[0].created_at : null;

          item.dataValues.pendingBillsCount = pendingBillsCount;

          // Optionally log the paidBillsCount for debugging purposes
          console.log(
            `Paid Bills Count for Institution ID ${insId}: ${paidBillsCount}`
          );
        } catch (error) {
          console.error("Error fetching bill headers:", error);
        }
      })
    );
  } catch (error) {
    return [];
  }
};

const getInstitutionStockActivityCheckDataQuery = async ({
  loadInstitutionsBy,
}) => {
  try {
    const db_name = "pos_database_duke";
    const {
      sequelize,
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

    // By default load all the institutions
    let institutions = [];
    institutions = await StockCustomerInstitution.findAll({
      attributes: [
        "id",
        "name", // Replace 'name' with actual attribute(s) you need
        "location_url",
        "is_active",
      ],
    });

    if (loadInstitutionsBy === "NO_PENDING_BILLS") {
      await getInstitutionsByNoPendingBills(institutions);
      // Fetch all institutions where there are no pending bills
      institutions = await StockCustomerInstitution.findAll({
        // where: {
        //   is_active: true,
        // },
        include: [
          {
            model: StockBillHeader,
            as: "bills",
            required: false, // This makes the join optional
            attributes: [], // We don't need the attributes from this join
            where: {
              paid_status: false,
              is_deleted: false,
            },
          },
          ...include,
        ],
        attributes: [
          "id",
          "name", // Replace 'name' with actual attribute(s) you need
          "location_url",
          "is_active",
        ],
        group: ["StockCustomerInstitution.id"], // Group by institution ID to aggregate results
        having: sequelize.literal('COUNT("bills"."id") = 0'), // Ensure there are no bills
      });
    }

    if (loadInstitutionsBy === "HAVE_PENDING_BILLS") {
      institutions = await StockCustomerInstitution.findAll({
        // where: {
        //   is_active: true,
        // },
        include: [
          {
            model: StockBillHeader,
            as: "bills",
            required: false, // Optional join
            attributes: [], // No need to include bill attributes in the result
            where: {
              paid_status: false, // Only unpaid (pending) bills
              is_deleted: false,
            },
          },
          ...include,
        ],
        attributes: [
          "id",
          "name", // Replace 'name' with the actual attribute(s) you need
          "location_url",
          "is_active",
          [
            Sequelize.fn("COUNT", Sequelize.col("bills.id")),
            "pendingBillCount",
          ], // Count the pending bills
        ],
        group: ["StockCustomerInstitution.id"], // Group by institution ID
        order: [["id", "ASC"]], // Sort by institution ID (optional)
      });
    }

    if (loadInstitutionsBy === "NO_TRANSACTIONS_WITHIN_LAST_30_DAYS") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Fetch institutions where no bills were raised in the last 30 days
      institutions = await StockCustomerInstitution.findAll({
        // where: {
        //   is_active: true,
        // },
        include: [
          {
            model: StockBillHeader,
            as: "bills",
            required: false, // Keep the join optional
            attributes: [], // We don't need to select any attributes from the bills
            where: {
              created_at: {
                [Op.gt]: thirtyDaysAgo, // Bills created within the last 30 days
              },
              is_deleted: false, // Ensure bills are not deleted
            },
          },
          ...include,
        ],
        attributes: [
          "id",
          "name", // Replace 'name' with actual attribute(s) you need
          "location_url",
          "is_active",
        ],
        group: ["StockCustomerInstitution.id"], // Group by institution ID
        having: sequelize.literal('COUNT("bills"."id") = 0'), // Ensure there are no bills in the last 30 days
      });
    }

    if (loadInstitutionsBy === "MORE_THAN_1_PENDING_BILLS") {
      institutions = await StockCustomerInstitution.findAll({
        // where: {
        //   is_active: true,
        // },
        include: [
          {
            model: StockBillHeader,
            as: "bills",
            required: false, // Optional join
            attributes: [], // No need to include bill attributes in the result
            where: {
              paid_status: false, // Only unpaid (pending) bills
              is_deleted: false,
            },
          },
          ...include,
        ],
        attributes: [
          "id",
          "name", // Replace 'name' with the actual attribute(s) you need
          "location_url",
          "is_active",
          [
            Sequelize.fn("COUNT", Sequelize.col("bills.id")),
            "pendingBillCount",
          ], // Count the pending bills
        ],
        group: ["StockCustomerInstitution.id"], // Group by institution ID
        having: Sequelize.literal('COUNT("bills"."id") > 1'), // Ensure more than 1 pending bill
        order: [["id", "ASC"]], // Sort by institution ID (optional)
      });
    }

    if (loadInstitutionsBy === "NO_TRANSACTIONS_WITHIN_LAST_21_DAYS") {
      const twentyOneDaysAgo = new Date();
      twentyOneDaysAgo.setDate(twentyOneDaysAgo.getDate() - 21);

      // Fetch institutions where no bills were raised in the last 30 days
      institutions = await StockCustomerInstitution.findAll({
        // where: {
        //   is_active: true,
        // },
        include: [
          {
            model: StockBillHeader,
            as: "bills",
            required: false, // Keep the join optional
            attributes: [], // We don't need to select any attributes from the bills
            where: {
              created_at: {
                [Op.gt]: twentyOneDaysAgo, // Bills created within the last 30 days
              },
              is_deleted: false, // Ensure bills are not deleted
            },
          },
          ...include,
        ],
        attributes: [
          "id",
          "name", // Replace 'name' with actual attribute(s) you need
          "location_url",
          "is_active",
        ],
        group: ["StockCustomerInstitution.id"], // Group by institution ID
        having: sequelize.literal('COUNT("bills"."id") = 0'), // Ensure there are no bills in the last 30 days
      });
    }

    await Promise.all(
      institutions.map(async (item) => {
        try {
          const insId = item.id;

          // Get the actual bill headers, not just the count
          const billHeaders = await StockBillHeader.findAll({
            where: {
              stock_customer_institution_id: insId,
            },
            attributes: ["created_at", "paid_status"], // Retrieve the created_at and paid_status
            order: [["created_at", "DESC"]], // Orders by created_at in descending order (latest first)
          });

          // If you want to get the count of paid bills, you can filter like this
          const paidBillsCount = billHeaders.filter(
            (b) => b.paid_status === true
          ).length;

          const pendingBillsCount = billHeaders.filter(
            (b) => b.paid_status === false
          ).length;

          item.dataValues.billsCount = billHeaders?.length || 0;

          // Set the paidBillsCount on the item
          item.dataValues.paidBillsCount = paidBillsCount;

          // Get the last billing date, if there are any bills
          item.dataValues.lastBillingDate =
            billHeaders.length > 0 ? billHeaders[0].created_at : null;

          item.dataValues.pendingBillsCount = pendingBillsCount;

          // Optionally log the paidBillsCount for debugging purposes
          console.log(
            `Paid Bills Count for Institution ID ${insId}: ${paidBillsCount}`
          );
        } catch (error) {
          console.error("Error fetching bill headers:", error);
        }
      })
    );

    return institutions;
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
