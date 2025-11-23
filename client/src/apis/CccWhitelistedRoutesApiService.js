import {
  CCC_WHITELISTED_ROUTES_GET_ALL,
  CCC_WHITELISTED_ROUTES_INSERT_RECORD,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createWhiteListedRoutesRecordApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_WHITELISTED_ROUTES_INSERT_RECORD,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllWhiteListedRoutesRecordsApi = async () => {
  try {
    const response = await API_ENDPOINT.get(CCC_WHITELISTED_ROUTES_GET_ALL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
