import {
  COMPLAINT_RECIEVE_MISSING_LICENSE_BY_NIC,
  COMPLAINT_RECIEVE_MISING_PASSPORT_BY_NIC,
  COMPLAINT_RECIEVE_DEVICES_BY_NIC,
  COMPLAINT_RECIEVE_ASSAULTER_BY_NIC,
  COMPLAINT_RECIEVE_ASSAULT_BY_NIC,
  COMPLAINT_RECIEVE_MISSING_NIC_BY_NIC,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchComplaintMissingLicenseByNicApi = async (nic_Number) => {
  try {
    const response = await API_ENDPOINT.post(
      COMPLAINT_RECIEVE_MISSING_LICENSE_BY_NIC,
      {
        nic_Number,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComplaintMissingPersonByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      COMPLAINT_RECIEVE_MISING_PASSPORT_BY_NIC,
      {
        nic_number: nic_number,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComplaintDevicesByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(COMPLAINT_RECIEVE_DEVICES_BY_NIC, {
      nic_number: nic_number,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComplaintAssaulterByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      COMPLAINT_RECIEVE_ASSAULTER_BY_NIC,
      {
        nic_number: nic_number,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComplaintAssaultByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(COMPLAINT_RECIEVE_ASSAULT_BY_NIC, {
      nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchComplaintMissingNicByNicApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      COMPLAINT_RECIEVE_MISSING_NIC_BY_NIC,
      { nic_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
