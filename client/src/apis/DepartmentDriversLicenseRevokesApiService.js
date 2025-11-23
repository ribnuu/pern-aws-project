import {
  DEPARTMENT_DRIVERS_LICENSE_REVOKES_CREATE,
  DEPARTMENT_DRIVERS_LICENSE_REVOKES_GET_BY_LICENSE_NUMBER,
  DEPARTMENT_DRIVERS_LICENSE_GET_REVOKE_STATUS,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createDepartmentDriversLicenseRevokesApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      DEPARTMENT_DRIVERS_LICENSE_REVOKES_CREATE,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentDriversLicenseRevokesByLicenseNumberApi = async (
  licenseNumber
) => {
  try {
    const response = await API_ENDPOINT.get(
      DEPARTMENT_DRIVERS_LICENSE_REVOKES_GET_BY_LICENSE_NUMBER.replace(
        ":licenseNumber",
        licenseNumber
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartmentDriversLicenseRevokeStatusByLicenseNumberApi = async (
  licenseNumber
) => {
  try {
    const response = await API_ENDPOINT.get(
      DEPARTMENT_DRIVERS_LICENSE_GET_REVOKE_STATUS.replace(
        ":licenseNumber",
        licenseNumber
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
