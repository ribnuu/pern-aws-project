const express = require("express");
const posExpensesSubCategoryController = require("../../controllers/pos-expenses-category-sub-category/posExpensesCategorySubCategory.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/expenses-category-sub-category/multilple-update",
  posExpensesSubCategoryController.updateMultipleExpensesSubCategoriesController
);

// POST endpoint to create new category
router.post(
  "/api/point-of-sales/expenses-category-sub-category/category",
  posExpensesSubCategoryController.createExpensesCategoryController
);

// POST endpoint to search product stock balance updates
router.post(
  "/api/point-of-sales/expenses-category-sub-category/category/search",
  posExpensesSubCategoryController.searchExpensesCategoryController
);

// POST endpoint to create new category
router.post(
  "/api/point-of-sales/expenses-category-sub-category/sub-category",
  posExpensesSubCategoryController.createExpensesSubCategoryController
);

// POST endpoint to get all sub categories by category code
router.post(
  "/api/point-of-sales/expenses-category-sub-category/all",
  posExpensesSubCategoryController.getAllSubCategoriesByCategoryCodeController
);

router.post(
  "/api/point-of-sales/expenses/subcategories/search/by-category-code",
  posExpensesSubCategoryController.searchExpensesSubCategoriesByCategoryCodeAndSearchTermController
);

router.get(
  "/api/point-of-sales/expenses-category-sub-category/tree-view",
  posExpensesSubCategoryController.getAllExpensesCategroiesAndSubCategoriesAsTreeViewController
);

module.exports = router;
