const repsStockDispatchService = require("../../services/pos-reps-stocks-dispatch/service");

const createRepsStockDispatchRecordController = async (req, res) => {
  const data = req.body;
  const stockCustomerPersonId = req.stock_customer_person_id;

  try {
    const response =
      await repsStockDispatchService.createRepsStockDispatchRecordService(
        data,
        stockCustomerPersonId
      );
    res.send({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create stock reps dispatch record" });
  }
};

const getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeController =
  async (req, res) => {
    try {
      const data = req.body;
      const stockCustomerPersonId = req.stock_customer_person_id;

      const response =
        await repsStockDispatchService.getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeService(
          data,
          stockCustomerPersonId
        );
      res.send({ success: true, data: response });
    } catch (error) {
      res.status(500).json({
        error:
          "Failed to fetch reps stock dispatch rcord by stock customer person id and date range controller",
      });
    }
  };

const updateMultipleRepsStocksDispatchController = async (req, res) => {
  try {
    const data = req.body;
    const stockCustomerPersonId = req.stockCustomerPersonId;
    const response =
      await repsStockDispatchService.updateMultipleRepsStocksDispatchService(
        data,
        stockCustomerPersonId
      );
    res.send({ success: true, data: response });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update multiple reps stock dispatch",
    });
  }
};

module.exports = {
  createRepsStockDispatchRecordController,
  getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeController,
  updateMultipleRepsStocksDispatchController,
};
