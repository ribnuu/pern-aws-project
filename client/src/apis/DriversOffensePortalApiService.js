import {
  DOP_GET_DRIVER_OFFENSE_BY_REFERENCE_NUMBER,
  DOP_GET_FINES_ON_MY_DUTY,
  DOP_GET_FINES_ON_MY_NUMBER,
  DOP_GET_PAID_FINES_ON_MY_NUMBER,
  DOP_UPDATE_DRIVER_OFFENSE_MOBILE_NUMBER_BY_ID,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getFinesOnMyDuty = async (fromDate, toDate) => {
  try {
    const userId = localStorage.getItem("user_id");

    const response = await API_ENDPOINT.post(
      DOP_GET_FINES_ON_MY_DUTY.replace(":userId", userId),
      {
        fromDate,
        toDate,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDriverOffenseRecordMobileNumberById = async (
  id,
  mobileNumber
) => {
  try {
    const response = await API_ENDPOINT.put(
      DOP_UPDATE_DRIVER_OFFENSE_MOBILE_NUMBER_BY_ID.replace(":id", id),
      {
        mobileNumber: mobileNumber,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDriverOffenseByReferenceNumberApi = async (referenceNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      DOP_GET_DRIVER_OFFENSE_BY_REFERENCE_NUMBER.replace(
        ":referenceNumber",
        referenceNumber
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFinesOnMyNumber = async () => {
  try {
    const response = await API_ENDPOINT.get(DOP_GET_FINES_ON_MY_NUMBER);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaidFinesOnMyNumberApi = async () => {
  try {
    const response = await API_ENDPOINT.get(DOP_GET_PAID_FINES_ON_MY_NUMBER);
    return response.data;
  } catch (error) {
    throw error;
  }
};
