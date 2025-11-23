import { Try } from "@mui/icons-material";
import {
  POS_EXPENSES_CREATE_MAIN_CAEGORY,
  POS_SEARCH_EXPENSES_CATEGORY,
  POS_CREATE_EXPENSES_SUB_CATEGORY,
  GET_All_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE,
  UPDATE_MULTIPLE_EXPENSES_SUB_CATEGORIES,
  SEARCH_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE_AND_SEARCH_TERM,
  POS_CREATE_EXPENSES_RECORD,
  POS_SEARCH_ALL_USRS_IN_THE_COMPANY_BY_ENTITY_TYPE,
  POS_EXPENSES_GET_EXPENSES_CATEGORY_SUB_CATEGORY_TREE_VIEW_DATA,
  POS_EXPENSES_GET_NOTE_BY_SEARCH,
  POS_EXPENSES_GET_MEASUREMENT_UNITS,
  POS_EXPENSES_GET_UNIT_AND_PRICE_BY_NOTE,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createPosExpensesMainCategoryApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_EXPENSES_CREATE_MAIN_CAEGORY,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchPosExpensesCategoryApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_EXPENSES_CATEGORY, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPosExpensesSubCategoryApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_CREATE_EXPENSES_SUB_CATEGORY,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllExpensesSubCategoriesByCategoryCodeApi = async (
  categoryCode
) => {
  try {
    const response = await API_ENDPOINT.post(
      GET_All_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE,
      { categoryCode }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMultipleExpensesSubCategoriesApi = async (items) => {
  try {
    const response = await API_ENDPOINT.post(
      UPDATE_MULTIPLE_EXPENSES_SUB_CATEGORIES,
      { items }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchexpensesSubCategoriesByCategoryCodeAndSearchTerm = async (
  categoryCode,
  searchTerm
) => {
  try {
    const response = await API_ENDPOINT.post(
      SEARCH_EXPENSES_SUB_CATEGORIES_BY_CATEGORY_CODE_AND_SEARCH_TERM,
      { categoryCode, searchTerm }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const creaseExpenseRecordApi = async (expenseHeader, expenseDetails) => {
  try {
    const response = await API_ENDPOINT.post(POS_CREATE_EXPENSES_RECORD, {
      expenseHeader,
      expenseDetails,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchExpensesNote = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_EXPENSES_GET_NOTE_BY_SEARCH, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchExpensesMeasurementUnits = async () => {
  try {
    const response = await API_ENDPOINT.get(POS_EXPENSES_GET_MEASUREMENT_UNITS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUnitAndPriceByNote = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${POS_EXPENSES_GET_UNIT_AND_PRICE_BY_NOTE}/${encodeURIComponent(
        searchTerm
      )}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsersInThePOSCompanyByEntityTypeApi = async (
  searchTerm,
  searchIn,
  institutionId,
  loadAll = false
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_SEARCH_ALL_USRS_IN_THE_COMPANY_BY_ENTITY_TYPE,
      {
        searchTerm,
        searchIn,
        institutionId,
        loadAll,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllExpensesCategroiesAndSubCategoriesAsTreeViewDataApi =
  async () => {
    try {
      // Write the api
      const response = await API_ENDPOINT.get(
        POS_EXPENSES_GET_EXPENSES_CATEGORY_SUB_CATEGORY_TREE_VIEW_DATA
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
