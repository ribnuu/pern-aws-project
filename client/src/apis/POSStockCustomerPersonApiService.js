import API_ENDPOINT from "./httpInterceptor";
import {
  POS_CREATE_STOCK_CUSTOMER_PERSON,
  POS_GET_STOCK_CUSTOMER_PERSON_BY_MOBILE_NUMBER,
  POS_STOCK_CUS_INS_GET_BY_INSTITUTION_ID,
} from "./endpoints";

export const posGetStockCustomerPersonDataByMobileNumberApi = async (
  mobileNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_STOCK_CUSTOMER_PERSON_BY_MOBILE_NUMBER,
      {
        mobileNumber: mobileNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const posCrateStockCustomerPErsonApi = async (formData) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_CREATE_STOCK_CUSTOMER_PERSON,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStockCustomerInstitutionByInsId = async (
  institutionId,
  includeAddresses
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_STOCK_CUS_INS_GET_BY_INSTITUTION_ID,
      { institutionId, includeAddresses }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
