import API_ENDPOINT from "./httpInterceptor";
import {
  CREATE_DRIVER_OFFENSE,
  GET_PAST_OFFENSES_BY_DRIVER_LICENSE_NUMBER,
} from "./endpoints";

export const getPastOffensesByDriverLicenseNoApi = async (driverLicenseNo) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_PAST_OFFENSES_BY_DRIVER_LICENSE_NUMBER.replace(
        ":driverLicenseNo",
        driverLicenseNo
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDriverOffenseRecordApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(CREATE_DRIVER_OFFENSE, reqBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};
