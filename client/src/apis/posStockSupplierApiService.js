import API_ENDPOINT from "./httpInterceptor";
import {
  POS_STOCK_PO_CUSTOM_SUPPLIER_POST,
  POS_STOCK_PO_NUMBER_SEARCH,
  POS_STOCK_PO_SUPPLIER_GET,
  POS_STOCK_SUPPLIER_GET_BY_ID,
} from "./endpoints";

export const searchStockSupplierApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_STOCK_SUPPLIER_GET_BY_ID, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchPoNumberApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_STOCK_PO_NUMBER_SEARCH, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPoSupplierApi = async (poNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      `${POS_STOCK_PO_SUPPLIER_GET}${poNumber}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//create custom supplier in the expenses section
export const creataCustomSupplierApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_STOCK_PO_CUSTOM_SUPPLIER_POST,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
