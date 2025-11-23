import API_ENDPOINT from "./httpInterceptor";
import {
  CCC_HOTEL_GATEWAY_SYSTEM_CREATE_HOTEL,
  CCC_HOTEL_GATEWAY_SYSTEM_FETCH_ALL_HOTELS,
  CCC_HOTEL_GATEWAY_SYSTEM_FETCH_HOTEL_BY_ID,
  CCC_HOTEL_GATEWAY_SYSTEM_UPDATE_HOTEL_BY_ID,
} from "./endpoints";

export const createHotelApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_HOTEL_GATEWAY_SYSTEM_CREATE_HOTEL,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHotelsApi = async (attributes = null) => {
  try {
    // Construct query parameters
    const queryParams = attributes ? `?attributes=${attributes.join(",")}` : "";

    // Make the API request with optional query parameters
    const response = await API_ENDPOINT.get(
      `${CCC_HOTEL_GATEWAY_SYSTEM_FETCH_ALL_HOTELS}${queryParams}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelByIdApi = async (id) => {
  try {
    const response = await API_ENDPOINT.get(
      CCC_HOTEL_GATEWAY_SYSTEM_FETCH_HOTEL_BY_ID.replace(":id", id)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHotelByIdAPi = async (id, reqBody) => {
  try {
    const response = await API_ENDPOINT.put(
      CCC_HOTEL_GATEWAY_SYSTEM_UPDATE_HOTEL_BY_ID.replace(":id", id),
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
