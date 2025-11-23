import API_ENDPOINT from "./httpInterceptor";
import {
  VEHICLE_INSURANCE_PEOPLES_RECIEVE_BY_NIC,
  VEHICLE_INSURANCE_LOLC_RECIEVE_BY_NIC,
} from "./endpoints";

export const fetchPeoplesVehicleInsuranceApi = async () => {
  try {
    const response = await API_ENDPOINT.post(
      VEHICLE_INSURANCE_PEOPLES_RECIEVE_BY_NIC,
      {
        nic_number: nic_number,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLolcVehicleInsuranceApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      VEHICLE_INSURANCE_LOLC_RECIEVE_BY_NIC,
      {
        nic_number: nic_number,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
