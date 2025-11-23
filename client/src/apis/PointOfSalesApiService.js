import API_ENDPOINT from "./httpInterceptor";
import {
  CREATE_GRN_RECORD,
  GET_BILL_BY_BILL_NUMBER,
  GET_GRN_DATA_BY_BILL_NUMBER,
  POS_CREATE_RETURN_STOCK_BILL,
  POS_CREATE_STOCK_BILL,
  POS_CREATE_STOCK_CUSTOMER_ORDER,
  POS_GENERATE_PDF_BY_BILL_NUMBER,
  POS_GET_ALL_PRODUCTS_BY_COMPANY_ID,
  POS_GET_ALL_PRODUCTS_BY_COMPANY_ID_FROM_STOCK_ITEM_HEADER,
  POS_GET_STOCK_BILL_BY_BILL_NUMBER,
  POS_GET_STOCK_CUSTOMER_INSTITUTION_DATA_BY_STOCK_CUSTOMER_PERSON_MOBILE_NUMBER,
  POS_GET_STOCK_CUSTOMER_ORDER,
  POS_GET_STOCK_CUSTOMER_ORDER_BY_ORDER_NUMBER,
  POS_SEARCH_STOCK_BILL_HEADER,
  SEARCH_PRODUCT_FROM_STOCK_ITEM_HEADER,
  UPDATE_STOCK_CUSTOMER_ORDER_HEADER,
} from "./endpoints";

export const getStockCustomerInstitutionDataByMobileNumber = async (
  mobileNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_STOCK_CUSTOMER_INSTITUTION_DATA_BY_STOCK_CUSTOMER_PERSON_MOBILE_NUMBER,
      { mobileNumber }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createStockBillDetailApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(POS_CREATE_STOCK_BILL, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createReturnBillDataApi = async (data) => {
  try {
    const responce = await API_ENDPOINT.post(
      POS_CREATE_RETURN_STOCK_BILL,
      data
    );
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createStockCustomerOrderDetailApi = async (data) => {
  try {
    const responce = await API_ENDPOINT.post(
      POS_CREATE_STOCK_CUSTOMER_ORDER,
      data
    );
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStockCustomerOrderDetailApi = async () => {
  try {
    const responce = await API_ENDPOINT.get(POS_GET_STOCK_CUSTOMER_ORDER);
    return responce.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBillByBilNumberApi = async (billNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_BILL_BY_BILL_NUMBER.replace(":billNumber", billNumber)
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGRNDataByBillNumberApi = async (billNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_GRN_DATA_BY_BILL_NUMBER.replace(":billNumber", billNumber)
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsByCompanyId = async (companyId) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_ALL_PRODUCTS_BY_COMPANY_ID.replace(":companyId", companyId)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//fetch stock bill detail by bill number
export const getStockBillDetailByBillNumber = async (billNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_STOCK_BILL_BY_BILL_NUMBER.replace(":billNumber", billNumber)
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//fetch stock customer order by orderNumber
export const getStockCustomerOrderDetailByOrderNumber = async (orderNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_STOCK_CUSTOMER_ORDER_BY_ORDER_NUMBER.replace(
        ":orderNumber",
        orderNumber
      )
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllProductsByCompanyIdFromStockItemHeaderApi = async (
  companyId
) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_ALL_PRODUCTS_BY_COMPANY_ID_FROM_STOCK_ITEM_HEADER.replace(
        ":companyId",
        companyId
      )
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createGRNRecordAPi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(CREATE_GRN_RECORD, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchProductsFromStockItemHeaderApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(
      SEARCH_PRODUCT_FROM_STOCK_ITEM_HEADER,
      { searchTerm }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchStockBillHeaderApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_SEARCH_STOCK_BILL_HEADER, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateBillPdfApi = async (billNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GENERATE_PDF_BY_BILL_NUMBER.replace(":billNumber", billNumber),
      {
        responseType: "blob", // Important for handling binary data
      }
    );

    // Create a new Blob object using the response data
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${billNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild();
  } catch (error) {
    console.error("Error downloading the PDF:", error);
    throw error;
  }
};

export const updateStockCustomerOrderHeader = async (
  orderNumber,
  orderBilled
) => {
  try {
    const response = await API_ENDPOINT.put(
      `${UPDATE_STOCK_CUSTOMER_ORDER_HEADER}/${orderNumber}`,
      { orderBilled }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating customer order header", error);
    throw error;
  }
};
