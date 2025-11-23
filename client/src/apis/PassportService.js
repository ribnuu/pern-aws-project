import {
  PASSPORT_GET_ALL_PASSPORT_ALTERATIONS_BY_PASSPORT_NUMBER,
  PASSPORT_GET_ALL_PASSPORT_REASONS_BY_PASSPORT_NUMBER,
  PASSPORT_GET_PASSPORT_DATA_BY_PASSPORT_NUMBER,
  PASSPORT_RECIEVE_MISING_PASSPORT_DATA_BY_REPORTED_BY,
  PASSPORT_RECIEVE_PASSPORT_MISSING_DATA_BY_PASSPORT_NUMBER,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const recievePassportDataByPassportNumberApi = async (
  passport_number
) => {
  try {
    const response = await API_ENDPOINT.post(
      PASSPORT_GET_PASSPORT_DATA_BY_PASSPORT_NUMBER,
      { passport_number }
    );
    return response.data;
  } catch (error) {}
};

export const recieveAllPassportAlterationsByPassportNumber = async (
  passport_number
) => {
  try {
    const response = await API_ENDPOINT.post(
      PASSPORT_GET_ALL_PASSPORT_ALTERATIONS_BY_PASSPORT_NUMBER,
      { passport_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recieveAllPAssportReasonsByPassportNumber = async (
  passport_number
) => {
  try {
    const response = await API_ENDPOINT.post(
      PASSPORT_GET_ALL_PASSPORT_REASONS_BY_PASSPORT_NUMBER,
      { passport_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recievePassportMissingDataByPassportNumberApi = async (
  passport_number
) => {
  try {
    const response = await API_ENDPOINT.post(
      PASSPORT_RECIEVE_PASSPORT_MISSING_DATA_BY_PASSPORT_NUMBER,
      { passport_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recievePassportMissingDataByReportedByApi = async (nic_number) => {
  try {
    const response = await API_ENDPOINT.post(
      PASSPORT_RECIEVE_MISING_PASSPORT_DATA_BY_REPORTED_BY,
      { nic_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
