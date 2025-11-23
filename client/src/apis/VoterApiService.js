import API_ENDPOINT from "./httpInterceptor";
import { GET_VOTER_BY_NIC } from "./endpoints";

export const getVoterByNicApi = async ({ nic_number }) => {
  try {
    const response = await API_ENDPOINT.post(GET_VOTER_BY_NIC, { nic_number });
    return response.data;
  } catch {
    throw error;
  }
};
