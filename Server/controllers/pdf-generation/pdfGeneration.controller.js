const pdfGenerationService = require("../../services/pdf-generation/service");

const generateBillPdfByBillNumberController = async (req, res) => {
  const { billNumber } = req.params;

  pdfGenerationService.generateBillPdfByBillNumberService(res, billNumber);
};

module.exports = {
  generateBillPdfByBillNumberController,
};
