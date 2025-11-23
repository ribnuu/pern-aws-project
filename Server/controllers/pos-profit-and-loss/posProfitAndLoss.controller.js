const posProfitAndLossService = require("../../services/pos-profit-and-loss/service");

const getProfitAndLossDataController = async (req, res) => {
  try {
    const data = await posProfitAndLossService.getProfitAndLossDataService();
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get profit and loss data",
      message: error.message,
    });
  }
};
const getProfitAndLossUpdateDataController = async (_, res) => {
  try {
    const data = await posProfitAndLossService.getProfitAndLossUpdateDataService();
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get profit and loss data",
      message: error.message,
    });
  }
};

module.exports = {
  getProfitAndLossDataController,
  getProfitAndLossUpdateDataController
};
