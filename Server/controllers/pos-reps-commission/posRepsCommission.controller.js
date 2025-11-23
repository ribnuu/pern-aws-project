const posRepsCommissionsServices = require("../../services/pos-reps-commission/service");
const posRepsCommissonPayPdfGenerateServices = require("../../services/pdf-generation/pos-reps-commission/service");

const getAllRepsCommissionPayController = async (req, res) => {
  try {
    const reqQuery = req.query;
    const response =
      await posRepsCommissionsServices.getAllRepsCommissionPayService({
        reqQuery,
      });
    res.send({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create stock reps dispatch record" });
  }
};

const generateRepsCommissionReportPdfController = async (req, res) => {
  try {
    const reqQuery = req.query;
    const { fromDate, toDate } = reqQuery;
    const dateRange =
      fromDate && toDate
        ? fromDate === toDate
          ? `${fromDate}`
          : `${fromDate} - ${toDate}`
        : fromDate
          ? `${fromDate}`
          : toDate
            ? `${toDate}`
            : "Both dates are not available.";

    const data =
      await posRepsCommissionsServices.getAllRepsCommissionPayService({
        reqQuery,
      });

    posRepsCommissonPayPdfGenerateServices.generatePdf({
      data: data,
      res: res,
      dateRange: dateRange,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Failed to generate report -> generateRepsCommissionReportPdfController",
    });
  }
};

module.exports = {
  getAllRepsCommissionPayController,
  generateRepsCommissionReportPdfController,
};
