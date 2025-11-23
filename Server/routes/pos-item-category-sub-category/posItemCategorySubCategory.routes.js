const express = require("express");
const posItemCategorySubCategoryController = require("../../controllers/pos-item-category-sub-category/posItemCategorySubCategory.controller");
const router = express.Router();

// POST endpoint to create new category
router.post(
  "/api/point-of-sales/item-category-sub-category/category",
  posItemCategorySubCategoryController.createItemCategoryController
);

// POST endpoint to search product stock balance updates
router.post(
  "/api/point-of-sales/item-category-sub-category/category/search",
  posItemCategorySubCategoryController.searchItemCategoryController
);

//POST endpoit to search stock sub categorties
router.post(
  "/api/point-of-sales/item-sub-category/subcategory/search",
  posItemCategorySubCategoryController.searchSubCategoryController
);

//post endpoint to search item supplier
router.post(
  "/api/point-of-sales/item-supplier/supplier/search",
  posItemCategorySubCategoryController.searchItemSupplierController
);

// POST endpoint to create new category
router.post(
  "/api/point-of-sales/item-category-sub-category/sub-category",
  posItemCategorySubCategoryController.createItemSubCategoryController
);

router.post(
  "/api/point-of-sales/item-category-sub-category/multilple-update",
  posItemCategorySubCategoryController.updateMultipleStockItemSubCategoriesController
);

// POST endpoint to get all sub categories by category code
router.post(
  "/api/point-of-sales/item-category-sub-category/all",
  posItemCategorySubCategoryController.getAllSubCategoriesByCategoryCodeController
);

module.exports = router;
