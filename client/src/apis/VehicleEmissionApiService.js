import { VEHICLE_EMISSION_RECIEVE_BY_NIC } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchVehicleEmissionByNicApi = async () => {
  try {
    const response = await API_ENDPOINT.post(VEHICLE_EMISSION_RECIEVE_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
