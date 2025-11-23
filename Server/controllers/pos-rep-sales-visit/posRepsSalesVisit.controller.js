const posRepsSalesVisitController = require("../../services/pos-reps-sales-visit/service");

const getAllLatestRepSalesVisitsController = async (req, res) => {
  try {
    const data =
      await posRepsSalesVisitController.getAllLatestRepSalesVisitsService();
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to fetch all latest rep sales visit" });
  }
};

const insertStockRepVisitController = async (req, res) => {
  try {
    const reqBody = req.body;
    if (!reqBody) {
      res.status(500).json({
        error: "Failed to insert stock rep visit record - Invalid data",
      });
    } else if (
      Object.keys(reqBody).length === 0 &&
      reqBody.constructor === Object
    ) {
      // reqBody is an empty object
      res.status(500).json({
        error: "Failed to insert stock rep visit record - Empty req body",
      });
    } else {
      const data =
        await posRepsSalesVisitController.insertStockRepVisitService(reqBody);

      res.send({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to insert stock rep visit record" });
  }
};
module.exports = {
  getAllLatestRepSalesVisitsController,
  insertStockRepVisitController,
};
