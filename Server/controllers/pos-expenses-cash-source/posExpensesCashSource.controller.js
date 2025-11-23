const posExpensesCashSourceServices = require("../../services/pos-expenses-cash-source/service");

const getAllExpensesCashSourceHeadersController = async (req, res) => {
  try {
    const data =
      await posExpensesCashSourceServices.getAllExpensesCashSourceHeadersService();
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get all expenses cash source headers",
    });
  }
};

module.exports = {
  getAllExpensesCashSourceHeadersController,
};
