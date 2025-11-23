import { GET_ALL_MASTER_OFFENSES } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getAllMasterOffensesApi = async () => {
  try {
    const response = await API_ENDPOINT.get(GET_ALL_MASTER_OFFENSES);

    return response.data;
  } catch (error) {
    throw error;
  }
};
