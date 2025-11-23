import {
  LICENSE_RECIEVE_BY_LICENSE_NUMBER,
  LICENSE_RECIEVE_BY_NIC,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const recieveLicenseDataByNicApi = async (nicNumber) => {
  try {
    const response = await API_ENDPOINT.post(LICENSE_RECIEVE_BY_NIC, {
      nic_number: nicNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recieveLicenseDataByLicenseNumber = async (licenseNumber) => {
  try {
    const response = await API_ENDPOINT.post(
      LICENSE_RECIEVE_BY_LICENSE_NUMBER,
      {
        license_number: licenseNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
