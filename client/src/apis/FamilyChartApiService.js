import { FAMILY_CHART_RECIEVE_BY_NIC } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchFamilyChartByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(FAMILY_CHART_RECIEVE_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
