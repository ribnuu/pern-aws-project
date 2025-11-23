import {
  BIRTH_RECIEVE_MARRIAGE_CERTIFICATE_BY_NIC,
  BIRTH_RECIEVE_PARENTS_BY_NIC,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchMarriageCertificateByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      BIRTH_RECIEVE_MARRIAGE_CERTIFICATE_BY_NIC,
      {
        nic_number: nic_number,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBirthParentsByNic = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(BIRTH_RECIEVE_PARENTS_BY_NIC, {
      nic_number: nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
