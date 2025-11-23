const express = require("express");
const pointOfSalesController = require("../../controllers/pointOfSales/pointOfSales.controller");
const router = express.Router();

// ------------------- GET Endpoints ------------------- //

// GET endpoint to fetch a bill by its bill number
router.get(
  "/api/point-of-sales/bill/:billNumber",
  pointOfSalesController.getBillByBillNumberController
);

// GET endpoint to fetch all items by company ID
router.get(
  "/api/point-of-sales/items/:companyId",
  pointOfSalesController.getAllItemsByCompanyIdController
);

// GET endpoint to fetch all items by company ID from stock item header
router.get(
  "/api/point-of-sales/items-from-stock-item-header/:companyId",
  pointOfSalesController.getAllItemsByCompanyIdFromStockItemsHeaderController
);

// GET endpoint to fetch GRN data by bill number
router.get(
  "/api/point-of-sales/grn/:billNumber",
  pointOfSalesController.getGRNDataByBillNumber
);

//Get endpoint to fetch all stock bill details by bill number
router.get(
  "/api/point-of-sale/stock-bill-detail/:billNumber",
  pointOfSalesController.getStockBillDetailByBillNumber
);

//Get endpoint to fetch customer orders
router.get(
  "/api/point-of-sale/stock-customer-order",
  pointOfSalesController.getStockCustomerOrdersDetails
);

//Get endpoint to fetch customer order by orderNumber
router.get(
  "/api/point-of-sale/stock-customer-order/:orderNumber",
  pointOfSalesController.getStockCustomerOrdersDetailsByOrderNumber
);

// ------------------- POST Endpoints ------------------- //

// POST endpoint to create a stock bill detail
router.post(
  "/api/point-of-sales/stock-bill-detail",
  pointOfSalesController.createStockBillDetailController
);

//post endpoint to create a stock return bill detail
router.post(
  "/api/point-of-sales/stock-return-bill-detail",
  pointOfSalesController.createStockReturnBillDetailController
);

//POST endpoint to create a customer order details
router.post(
  "/api/point-of-sales/stock-customer-order-details",
  pointOfSalesController.createStockCustomerOrderController
);

// POST endpoint to create a stock GRN record
router.post(
  "/api/point-of-sales/grn",
  pointOfSalesController.createStockGRNRecordController
);

// POST endpoint to search product stock balance updates
router.post(
  "/api/point-of-sales/search-product-stock-item-header",
  pointOfSalesController.searchProductsFromStockItemHeaderController
);

// POST endpoint to get the stock customer institution data by customer person mobile number
router.post(
  "/api/point-of-sales/stock-customer-institution-data-by-stock-customer-person-mobile-number",
  pointOfSalesController.getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberController
);

// POST endpoint to search stock bill header
router.post(
  "/api/point-of-sales/stock-bill-header/search",
  pointOfSalesController.searchStockBillHeaderController
);

// POST endpoint to search customer insitution
router.post(
  "/api/point-of-sales/stock-customer-institution/search",
  pointOfSalesController.searchStockCustomerInstitutionController
);

// router.post(
//   "/api/point-of-sales/pending-bill-headers/by-customer-institution-id",
//   pointOfSalesController.getAllPendingBillHeadersByStockCustomerInstitutionIdController
// );

//PUT endpoint to update customer order header
router.put(
  "/api/point-of-sale/stock-customer-order/:orderNumber",
  pointOfSalesController.updateCustomerOrderHeaderController
);

module.exports = router;
