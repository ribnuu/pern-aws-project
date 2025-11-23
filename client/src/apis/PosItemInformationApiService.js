import { POS_CREATE_ITEM_INFORMATION } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createItemInformationApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(POS_CREATE_ITEM_INFORMATION, data);
    return response;
  } catch (error) {
    throw error;
  }
};
