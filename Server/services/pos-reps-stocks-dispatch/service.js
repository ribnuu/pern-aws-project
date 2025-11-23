const repsStockDispatchQueries = require("./queries");

const createRepsStockDispatchRecordService = async (
  data,
  stockCustomerPersonId
) => {
  const { stock_quantity_given, item_code } = data;
  try {
    const result =
      await repsStockDispatchQueries.createRepsStockDispatchRecordQuery({
        stock_quantity_given,
        item_code,
        created_by: stockCustomerPersonId,
      });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeService =
  async (data, stockCustomerPersonId) => {
    const { fromDate, toDate } = data;
    try {
      const result =
        await repsStockDispatchQueries.getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeQuery(
          {
            fromDate,
            toDate,
            created_by: stockCustomerPersonId,
          }
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const updateMultipleRepsStocksDispatchService = async (
  data,
  stockCustomerPersonId
) => {
  try {
    console.log(data);
    // const result =
    //   await repsStockDispatchQueries.updateMultipleRepsStocksDispatchQuery({});
    // return result;
    const result =
      await repsStockDispatchQueries.updateMultipleRepsStocksDispatchQuery({
        itemCode: data.item_code,
        billedQuantity: data.billed,
        settledBy: stockCustomerPersonId,
        fromDate: data.fromDate,
        toDate: data.toDate,
      });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createRepsStockDispatchRecordService,
  getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeService,
  updateMultipleRepsStocksDispatchService,
};
