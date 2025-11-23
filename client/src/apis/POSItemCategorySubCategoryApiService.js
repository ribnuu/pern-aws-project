import {
  GET_All_SUB_CATEGORIES_BY_CATEGORY_CODE,
  POS_CREATE_MAIN_CATEGORY,
  POS_CREATE_SUB_CATEGORY,
  POS_SEARCH_ITEM_CATEGORY,
  POS_SEARCH_SUB_ITEM_CATEGORY,
  POS_SEARCH_ITEM_SUPPLIER,
  UPDATE_MULTIPLE_STOCK_ITEM_SUB_CATEGORIES,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createPosMainCategoryApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(POS_CREATE_MAIN_CATEGORY, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchPosItemCategoryApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_ITEM_CATEGORY, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//searach sub category api
export const searchPosSubItemCategoryApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_SUB_ITEM_CATEGORY, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//search item supplier api
export const searchPosItemSupplierApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_ITEM_SUPPLIER, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPosSubCategoryApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(POS_CREATE_SUB_CATEGORY, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllSubCategoriesByCategoryCode = async (categoryCode) => {
  try {
    const response = await API_ENDPOINT.post(
      GET_All_SUB_CATEGORIES_BY_CATEGORY_CODE,
      { categoryCode }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMultipleStockItemSubCategoriesApi = async (items) => {
  try {
    const response = await API_ENDPOINT.post(
      UPDATE_MULTIPLE_STOCK_ITEM_SUB_CATEGORIES,
      { items }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
