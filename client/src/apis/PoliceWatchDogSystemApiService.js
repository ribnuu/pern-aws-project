import API_ENDPOINT from "./httpInterceptor";
import {
  PWDS_RECIEVE_MISSING_VEHICLE_LIST_BY_NIC,
  PWDS_RECIEVE_MISSING_PET_LIST_BY_NIC,
  PWDS_RECIEVE_DEVICES_LIST_BY_NIC,
} from "./endpoints";

export const fetchMissingVehicleListByNicApi = async () => {
  try {
    const response = await API_ENDPOINT.post(
      PWDS_RECIEVE_MISSING_VEHICLE_LIST_BY_NIC,
      {
        nic_number: nic_number,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMissingPetListByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      PWDS_RECIEVE_MISSING_PET_LIST_BY_NIC,
      {
        nic_number: nic_number,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recieveDevicesListByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(PWDS_RECIEVE_DEVICES_LIST_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
