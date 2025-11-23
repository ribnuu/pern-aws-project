import API_ENDPOINT from "./httpInterceptor";
import {
  DEPARTMENT_DRIVER_OFFENSE_POINTS_GET_BY_LICENSE_NUMBER,
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

export const getDepartmentDriverOffensePointsByLicenseNumberApi = async (
  licenseNumber
) => {
  try {
    const response = await API_ENDPOINT.get(
      DEPARTMENT_DRIVER_OFFENSE_POINTS_GET_BY_LICENSE_NUMBER.replace(
        ":licenseNumber",
        licenseNumber
      )
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
