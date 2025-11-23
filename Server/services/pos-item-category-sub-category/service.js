const itemCategorySubCategoryQueries = require("./queries");

const updateMultipleStockItemSubCategoriesService = async (items) => {
  try {
    const data =
      await itemCategorySubCategoryQueries.updateMultipleStockItemSubCategoriesQuery(
        items
      );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createItemCategoryService = async (data) => {
  const { category } = data;
  try {
    const data = await itemCategorySubCategoryQueries.createItemCategoryQuery({
      category: category,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const searchItemCategoryService = async (searchString) => {
  try {
    const data =
      await itemCategorySubCategoryQueries.searchItemCategoryQuery(
        searchString
      );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//create service for search sub categories
const searchItemSubCategoryService = async (searchTerm) => {
  try {
    const data =
      await itemCategorySubCategoryQueries.searchItemSubCategoryQuery(
        searchTerm
      );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// create service for search item supplier
const searchItemSupplierService = async (searchTerm) => {
  try {
    const data =
      await itemCategorySubCategoryQueries.searchItemSupplieryQuery(searchTerm);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const createItemSubCategoryService = async (data) => {
  const { subCategory, categoryId } = data;
  try {
    const data = await itemCategorySubCategoryQueries.createSubCategoryQuery({
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
      await itemCategorySubCategoryQueries.getAllSubCategoriesByCategoryCodeQuery(
        categoryCode
      );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  updateMultipleStockItemSubCategoriesService,
  createItemCategoryService,
  searchItemCategoryService,
  searchItemSubCategoryService,
  searchItemSupplierService,
  createItemSubCategoryService,
  getAllSubCategoriesByCategoryCodeService,
};
