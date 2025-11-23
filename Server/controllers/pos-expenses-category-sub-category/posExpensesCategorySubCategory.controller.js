const posExpensesSubCategoryService = require("../../services/pos-expenses-category-sub-category/service");

const updateMultipleExpensesSubCategoriesController = async (req, res) => {
  const { items } = req.body;
  try {
    const data =
      await posExpensesSubCategoryService.updateMultipleExpensesSubCategoriesService(
        items
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to load GRN data by bill number" });
  }
};

const createExpensesCategoryController = async (req, res) => {
  const formData = req.body;

  try {
    const data =
      await posExpensesSubCategoryService.createExpensesCategoryService(
        formData
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create expenses category",
    });
  }
};

const searchExpensesCategoryController = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const data =
      await posExpensesSubCategoryService.searchExpensesCategoryService(
        searchTerm
      );
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search product from expenses header" });
  }
};

const createExpensesSubCategoryController = async (req, res) => {
  const formData = req.body;

  try {
    const data =
      await posExpensesSubCategoryService.createExpensesSubCategoryService(
        formData
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create expenses category",
    });
  }
};

const getAllSubCategoriesByCategoryCodeController = async (req, res) => {
  const { categoryCode } = req.body;

  try {
    const data =
      await posExpensesSubCategoryService.getAllSubCategoriesByCategoryCodeService(
        categoryCode
      );
    res.send({ success: true, data: data.rows });
  } catch (error) {
    res.status(500).json({
      error: "Faile to all sub categories by category code",
    });
  }
};

const searchExpensesSubCategoriesByCategoryCodeAndSearchTermController = async (
  req,
  res
) => {
  const { categoryCode, searchTerm } = req.body;

  try {
    const data =
      await posExpensesSubCategoryService.searchExpensesSubCategoriesByCategoryCodeAndSearchTermService(
        categoryCode,
        searchTerm
      );
    res.send({ success: true, data: data });
  } catch (error) {
    res.status(500).json({
      error: "Faile to all sub categories by category code and search term",
    });
  }
};

const getAllExpensesCategroiesAndSubCategoriesAsTreeViewController = async (
  req,
  res
) => {
  try {
    const data =
      await posExpensesSubCategoryService.getAllExpensesCategroiesAndSubCategoriesAsTreeViewService();
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "FAiled to get all expenses categories and sub categories",
    });
  }
};

module.exports = {
  updateMultipleExpensesSubCategoriesController,
  createExpensesCategoryController,
  searchExpensesCategoryController,
  createExpensesSubCategoryController,
  getAllSubCategoriesByCategoryCodeController,
  searchExpensesSubCategoriesByCategoryCodeAndSearchTermController,
  getAllExpensesCategroiesAndSubCategoriesAsTreeViewController,
};
