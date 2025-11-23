import { ORDINARY_LEVEL_RECIEVE_BY_NIC } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchOrdinaryLevelBYNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(ORDINARY_LEVEL_RECIEVE_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
