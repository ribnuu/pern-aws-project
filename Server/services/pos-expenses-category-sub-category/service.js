const expensesCategorySubCategoryQueries = require("./queries");

const updateMultipleExpensesSubCategoriesService = async (items) => {
  try {
    const data =
      await expensesCategorySubCategoryQueries.updateMultipleExpensesSubCategoriesQuery(
        items
      );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createExpensesCategoryService = async (data) => {
  const { category } = data;
  try {
    const data =
      await expensesCategorySubCategoryQueries.createExpensesCategoryQuery({
        category: category,
      });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchExpensesCategoryService = async (searchString) => {
  try {
    const data =
      await expensesCategorySubCategoryQueries.searchExpensesCategoryQuery(
        searchString
      );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createExpensesSubCategoryService = async (data) => {
  const { subCategory, categoryId } = data;
  try {
    const data =
      await expensesCategorySubCategoryQueries.createExpensesSubCategoryQuery({
        subCategory,
        categoryId,
      });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllSubCategoriesByCategoryCodeService = async (categoryCode) => {
  try {
    const data =
      await expensesCategorySubCategoryQueries.getAllSubCategoriesByCategoryCodeQuery(
        categoryCode
      );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchExpensesSubCategoriesByCategoryCodeAndSearchTermService = async (
  categoryCode,
  searchTerm
) => {
  try {
    const data =
      await expensesCategorySubCategoryQueries.searchExpensesSubCategoriesByCategoryCodeAndSearchTermQuery(
        categoryCode,
        searchTerm
      );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllExpensesCategroiesAndSubCategoriesAsTreeViewService = async () => {
  try {
    const data =
      await expensesCategorySubCategoryQueries.getAllExpensesCategroiesAndSubCategoriesAsTreeViewQuery();
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateMultipleExpensesSubCategoriesService,
  createExpensesCategoryService,
  searchExpensesCategoryService,
  createExpensesSubCategoryService,
  getAllSubCategoriesByCategoryCodeService,
  searchExpensesSubCategoriesByCategoryCodeAndSearchTermService,
  getAllExpensesCategroiesAndSubCategoriesAsTreeViewService,
};
