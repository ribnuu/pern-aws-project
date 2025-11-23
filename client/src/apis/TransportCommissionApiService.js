import {
  TRANSPORT_COMMISSION_RECIEVE_BY_VEHICLE_NUMBER,
  TRANSPORT_COMMISSION_RECIEVE_BY_NIC,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const receieveByVehicleNumberTransportCommissionApi = async (
  vehicleNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      TRANSPORT_COMMISSION_RECIEVE_BY_VEHICLE_NUMBER,
      {
        vehicle_number: vehicleNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const receieveByNICTransportCommissionApi = async (nicNumber) => {
  try {
    const response = await API_ENDPOINT.post(
      TRANSPORT_COMMISSION_RECIEVE_BY_NIC,
      {
        nic_number: nicNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
