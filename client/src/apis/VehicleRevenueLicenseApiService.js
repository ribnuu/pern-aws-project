import API_ENDPOINT from "./httpInterceptor";
import { VEHICLE_REVENUE_LICENSE_RECIEVE_BY_NIC } from "./endpoints";

export const recieveVehicleRevenueLicenseDataByNicApi = async (nicNumber) => {
  try {
    const response = await API_ENDPOINT.post(
      VEHICLE_REVENUE_LICENSE_RECIEVE_BY_NIC,
      {
        nic_number: nicNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
