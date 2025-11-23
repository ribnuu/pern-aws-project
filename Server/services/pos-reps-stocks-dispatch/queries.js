const { v4: uuidv4 } = require("uuid");
const setUpAssociations = require("../../models/pos");
const { Op } = require("sequelize");

const createRepsStockDispatchRecordQuery = async ({
  stock_quantity_given,
  item_code,
  created_by, // stock customer person id
}) => {
  try {
    const db_name = "pos_database_duke";
    const { StockRepsDispatch } = setUpAssociations(db_name);

    // Validate input parameters
    if (!stock_quantity_given || !item_code || !created_by) {
      throw new Error("Missing required fields");
    }

    // Check if stock_quantity_given is zero
    if (parseInt(stock_quantity_given) === 0) {
      throw new Error("Item quantity given is zero, record will not be saved.");
    }

    // Create new StockRepsDispatch record
    const newRecordData = {
      id: uuidv4(),
      stock_quantity_given,
      item_code,
      created_by,
      // Created_at and updated_at fields are automatically set
    };

    const newRepsDispatch = await StockRepsDispatch.create(newRecordData);

    console.log(
      "New reps stock dispatch record created successfully:",
      newRepsDispatch
    );
    return newRepsDispatch;
  } catch (error) {
    console.error("Error creating StockRepsDispatch record:", error);
    throw error;
  }
};

const getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeQuery =
  async ({
    fromDate,
    toDate,
    created_by, // stock customer person id
  }) => {
    try {
      const db_name = "pos_database_duke";
      const { StockRepsDispatch } = setUpAssociations(db_name);

      // Validate input parameters
      if (!fromDate || !toDate || !created_by) {
        throw new Error("Missing required fields");
      }

      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Retrieve records within the date range for the given stock_customer_person_id
      const records = await StockRepsDispatch.findAll({
        where: {
          created_by,
          created_at: {
            [Op.between]: [fromDate, endOfDay.toISOString()],
          },
        },
        order: [["created_at", "ASC"]],
      });

      // Group by item_code and aggregate quantities and created_at timestamps
      const groupedRecords = records.reduce((acc, record) => {
        const { item_code, stock_quantity_given, created_at } =
          record.dataValues;

        if (!acc[item_code]) {
          acc[item_code] = {
            total_quantity: 0,
            dispatches: [],
          };
        }

        acc[item_code].total_quantity += stock_quantity_given;
        acc[item_code].dispatches.push({
          quantity: stock_quantity_given,
          created_at,
        });

        return acc;
      }, {});

      // Format the output as a map with key-value pairs for each item_code
      const formattedOutput = Object.entries(groupedRecords).reduce(
        (map, [item_code, { total_quantity, dispatches }]) => {
          map[item_code] = {
            total_quantity,
            dispatches,
          };
          return map;
        },
        {}
      );

      // Create a summary object with total quantities for each item_code
      const summaryObject = Object.entries(groupedRecords).reduce(
        (summary, [item_code, { total_quantity }]) => {
          summary[item_code] = total_quantity;
          return summary;
        },
        {}
      );

      return { formattedOutput, summaryObject };
    } catch (error) {
      console.error("Error retrieving reps stock dispatch records:", error);
      throw error;
    }
  };

const updateMultipleRepsStocksDispatchQuery = async ({
  itemCode,
  billedQuantity,
  settledBy,
  fromDate,
  toDate,
}) => {
  const db_name = "pos_database_duke";
  const { StockRepsDispatch } = setUpAssociations(db_name);

  try {
    const endOfDay = new Date(toDate);
    endOfDay.setHours(23, 59, 59, 999); // Ensure we include the entire end date

    // Fetch records that need to be updated
    const records = await StockRepsDispatch.findAll({
      where: {
        item_code: itemCode,
        settled: false,
        created_at: {
          [Op.between]: [
            new Date(fromDate).toISOString(),
            endOfDay.toISOString(),
          ],
        },
      },
      order: [["created_at", "ASC"]], // Process oldest records first
    });

    // Calculate the total dispatched quantity
    const totalDispatchedQuantity = records.reduce(
      (sum, record) => sum + record.stock_quantity_given,
      0
    );

    // Check if the billed quantity exceeds the total dispatched quantity
    if (billedQuantity > totalDispatchedQuantity) {
      console.warn("Billed quantity exceeds the total dispatched quantity.");
      return;
    }

    // Process each record to settle the quantity
    for (const record of records) {
      if (billedQuantity <= 0) break; // Stop if no quantity is left to process

      const quantityGiven = record.stock_quantity_given;
      const quantityToSettle = Math.min(quantityGiven, billedQuantity); // Settle as much as possible

      // Update the record with the settled quantity
      await record.update({
        settled: true,
        returned: quantityGiven - quantityToSettle, // Remaining quantity after settlement
        settled_by: settledBy,
        settled_by_date_time: new Date(),
      });

      // Reduce the billed quantity by the amount settled
      billedQuantity -= quantityToSettle;
    }

    if (billedQuantity > 0) {
      console.warn(
        `There is still some quantity left to process: ${billedQuantity}`
      );
    }

    console.log("Stock records updated successfully");
  } catch (error) {
    console.error("Error updating stock records:", error);
  }
};

module.exports = {
  createRepsStockDispatchRecordQuery,
  getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeQuery,
  updateMultipleRepsStocksDispatchQuery,
};
