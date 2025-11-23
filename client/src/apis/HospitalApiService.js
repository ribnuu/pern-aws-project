import API_ENDPOINT from "./httpInterceptor";
import { HOSPITAL_RECIEVE_BY_NIC } from "./endpoints";

export const fetchHospitalByNicApi = async () => {
  try {
    const response = await API_ENDPOINT.post(HOSPITAL_RECIEVE_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
