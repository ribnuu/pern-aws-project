const posExpensesServices = require("../../services/pos-expenses/service");

const createExpenseRecordController = async (req, res) => {
  try {
    const { expenseHeader, expenseDetails } = req.body;

    const userId = req.headers.user_id;

    // ✅ Validate required request body fields and user ID:
    if (!userId) {
      return res.status(400).json({ error: "Missing user_id in headers" });
    }

    // Ensure 'user_id' is present in headers and both 'expenseHeader' and a non-empty array of 'expenseDetails'
    // are provided in the request body. Return a 400 Bad Request response if any required data is missing or invalid.

    if (
      !expenseDetails ||
      !expenseHeader ||
      !Array.isArray(expenseDetails) ||
      expenseDetails.length === 0
    ) {
      return res.status(400).json({
        error:
          "Invalid request: expenseHeader and non-empty expenseDetails are required",
      });
    }

    const data = await posExpensesServices.createExpenseRecordService({
      expenseHeader: expenseHeader,
      expenseDetails: expenseDetails,
      created_by: userId,
    });

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create expense record",
    });
    console.error("Create Expense Error:", error);
  }
};

const getExpenseByNumberController = async (req, res) => {
  const { expenseNumber } = req.params;
  try {
    const result =
      await posExpensesServices.getExpenseByNumberService(expenseNumber);
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "Expense not found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching expense by number:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const searchExpensesNoteController = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const data = await posExpensesServices.searchExpensesNoteService({
      searchTerm,
    });
    res.json({ success: true, data });
  } catch (error) {
    console.error("searchExpensesNoteController error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch expenses note" });
  }
};

const searchUsersInThePOSCompanyByEntityTypeController = async (req, res) => {
  const { searchTerm, searchIn, institutionId, loadAll } = req.body;

  try {
    const data =
      await posExpensesServices.searchUsersInThePOSCompanyByEntityTypeService({
        searchTerm: searchTerm,
        soruce: searchIn,
        institutionId: institutionId,
        loadAll: loadAll,
      });
    res.send({ success: true, data: data });
  } catch (error) {
    res.status(500).json({
      error: "Faile to all sub categories by category code and search term",
    });
  }
};

const getAllExpensesInPOSCompanyController = async (req, res) => {
  try {
    const reqQuery = req.query;
    const data =
      await posExpensesServices.getAllExpensesInPOSCompanyService(reqQuery);
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expense records",
    });
  }
};

const getExpensesDetailsByExpensesHeaderIdController = async (req, res) => {
  try {
    const { headerId } = req.params;
    const { includeModels } = req.query;

    const data =
      await posExpensesServices.getExpensesDetailsByExpensesHeaderIdService({
        headerId,
        includeModels,
      });
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get expenses details by id",
    });
  }
};

//Fetch all expenses measurement units
const getExpensesMeasurementUnitsController = async (req, res) => {
  try {
    const response =
      await posExpensesServices.getExpensesMeasurementUnitsService();

    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses units" });
    console.error("Fetch units error:", error);
  }
};

//Fetch price & units from expenses details by note
const getExpensesPriceAndUnitsByNoteController = async (req, res) => {
  const { searchTerm } = req.params;

  try {
    const response =
      await posExpensesServices.getExpensesPriceAndUnitsByNoteService(
        searchTerm
      );

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "No record found for this note" });
    }

    res.send({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch unit & price by note" });
    console.error("Failed to fetch price and units :", error);
  }
};

module.exports = {
  createExpenseRecordController,
  getExpenseByNumberController,
  searchUsersInThePOSCompanyByEntityTypeController,
  getAllExpensesInPOSCompanyController,
  getExpensesDetailsByExpensesHeaderIdController,
  searchExpensesNoteController,
  getExpensesMeasurementUnitsController,
  getExpensesPriceAndUnitsByNoteController,
};
