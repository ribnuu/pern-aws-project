const posTransactionServices = require("../../services/pos-transactions/service");

// Controller function to handle the request for retrieving transactions by date and other filters
const getAllTransactionsByDateAndOtherFiltersController = async (req, res) => {
  const { filters } = req.body; // Extract filters from the request body
  const institutionIdsList = req.institution_ids; // Extract institution IDs from the request object

  try {
    // Call the service function to fetch data based on the filters and institution IDs
    const data =
      await posTransactionServices.getAllTransactionsByDateAndOtherFiltersService(
        {
          filters,
          institutionIds: institutionIdsList,
        }
      );

    // Send the fetched data as a successful response
    res.send({ success: true, data: data.rows });
  } catch (error) {
    // Handle any errors by sending a 500 status with an error message
    res.status(500).json({
      error: "Failed to getAllTransactionsByDateAndOtherFiltersController",
    });
  }
};

const getAllPaidBillsInTheCompanyController = async (req, res) => {
  const { filters } = req.body; // Extract filters from the request body
  const institutionIdsList = req.institution_ids; // Extract institution IDs from the request object
  const stockCustomerPersonId = req.stock_customer_person_id;

  try {
    // Call the service function to fetch data based on the filters and institution IDs
    const data =
      await posTransactionServices.getAllPaidBillsInTheCompanyService({
        filters,
        institutionIds: institutionIdsList,
        stockCustomerPersonId,
      });

    // Send the fetched data as a successful response
    res.send({ success: true, data: data });
  } catch (error) {
    // Handle any errors by sending a 500 status with an error message
    res.status(500).json({
      error: "Failed to getAllPaidBillsInTheCompanyController",
    });
  }
};

const createRepsPaidComissionItemWiseController = async (req, res) => {
  const { bill, billDetail } = req.body;
  const stockCustomerPersonId = req.stock_customer_person_id;
  try {
    const newRecord =
      await posTransactionServices.createRepsPaidComissionItemWiseService({
        bill,
        billDetail,
        currentLoggedInUserIdInPOSDB: stockCustomerPersonId,
      });
    res.send({ success: true, data: newRecord });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create reps paid commission record",
    });
  }
};

const getAllBillingInformationAndRepsStockDispatchDataByFiltersController =
  async (req, res) => {
    const { fromDate, toDate } = req.body;
    const institutionIds = req.institution_ids;
    const stockCustomerPersonId = req.stock_customer_person_id;
    try {
      const data =
        await posTransactionServices.getAllBillingInformationAndRepsStockDispatchDataByFiltersService(
          {
            fromDate,
            toDate,
            institutionIds,
            stockCustomerPersonId,
          }
        );
      res.send({ success: true, data });
    } catch (error) {
      res.status(500).json({
        error: "Failed to create reps paid commission record",
      });
    }
  };

const getAllPaymentsReceivedByFiltersController = async (req, res) => {
  try {
    const { filters } = req.body; // Extract filters from the request body
    const institutionIdsList = req.institution_ids; // Extract institution IDs from the request object
    const data =
      await posTransactionServices.getAllPaymentsReceivedByFiltersService(
        filters,
        institutionIdsList
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to gte all payments received by filters",
    });
  }
};
module.exports = {
  getAllTransactionsByDateAndOtherFiltersController,
  getAllPaidBillsInTheCompanyController,
  createRepsPaidComissionItemWiseController,
  getAllBillingInformationAndRepsStockDispatchDataByFiltersController,
  getAllPaymentsReceivedByFiltersController,
};
