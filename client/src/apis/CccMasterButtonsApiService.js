import { CCC_MASTER_BUTTONS_CREATE_BUTTON } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createButtonApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_MASTER_BUTTONS_CREATE_BUTTON,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
