import { POS_GET_PROFIT_AND_LOSS_DATA, POS_GET_PROFIT_AND_LOSS_UPDATE_DATA } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getProfitAndLossDataApi = async () => {
  try {
    const response = await API_ENDPOINT.get(POS_GET_PROFIT_AND_LOSS_DATA);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfitAndLossUpdateDataApi = async () => {
  try {
    const response = await API_ENDPOINT.get(POS_GET_PROFIT_AND_LOSS_UPDATE_DATA);
    return response.data;
  } catch (error) {
    throw error;
  }
};
