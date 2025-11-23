import { NIC_RECEIVE_BY_VEHICLE_NUMBER } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const receiveNicByVehcileNumber = async (vehicleNumber) => {
  try {
    const response = await API_ENDPOINT.post(NIC_RECEIVE_BY_VEHICLE_NUMBER, {
      vehicle_number: vehicleNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
