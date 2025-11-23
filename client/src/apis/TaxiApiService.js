import {
  TAXI_KANGAROO_RECIEVE_VEHICLE_DETAILS_BY_VEHICLE_NUMBER,
  TAXI_TAXIYAK_RECIEVE_VEHICLE_DETAILS_BY_NIC_NUMBER,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const taxiyakReceiveAccountDetailsByVehicleNICNumber = async (
  vehicleNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      TAXI_TAXIYAK_RECIEVE_VEHICLE_DETAILS_BY_NIC_NUMBER,
      {
        vehicle_number: vehicleNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const taxiKangarooReceiveVehcileDetailsByVehcileNumber = async (
  vehicleNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      TAXI_KANGAROO_RECIEVE_VEHICLE_DETAILS_BY_VEHICLE_NUMBER,
      {
        vehicle_number: vehicleNumber,
      }
    );
  } catch (error) {
    throw error;
  }
};
