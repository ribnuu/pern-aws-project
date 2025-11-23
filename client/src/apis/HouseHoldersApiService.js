import API_ENDPOINT from "./httpInterceptor";
import {
  HOUSE_HOLDERS_CREATE_FULL_HOUSE_HOLDER_PROCESS,
  HOUSE_HOLDERS_FETCH_ALL_HOUSE_HOLDERS,
  HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID,
  HOUSE_HOLDERS_UPDATE_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID,
  HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA,
  HOUSE_HOLDER_CONFIRM,
} from "./endpoints";

export const createFullHouseHolderProcessApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      HOUSE_HOLDERS_CREATE_FULL_HOUSE_HOLDER_PROCESS,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHouseHoldersApi = async (attributes = null) => {
  try {
    // Construct query parameters
    const queryParams = attributes ? `?attributes=${attributes.join(",")}` : "";

    // Make the API request with optional query parameters
    const response = await API_ENDPOINT.get(
      `${HOUSE_HOLDERS_FETCH_ALL_HOUSE_HOLDERS}${queryParams}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHouseHoldersDataByHouseHolderIdApi = async (id) => {
  try {
    const response = await API_ENDPOINT.get(
      HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID.replace(
        ":id",
        id
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHouseHoldersDataApi = async () => {
  try {
    const response = await API_ENDPOINT.get(
      HOUSE_HOLDERS_FETCH_HOUSE_HOLDERS_DATA
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Api for houseHolder confirmation
export const updateHouseHolderConfirmDataApi = async (id, reqBody) => {
  try {
    const url = HOUSE_HOLDER_CONFIRM.replace(":id", id);
    const response = await API_ENDPOINT.put(url, reqBody, {
      headers: {},
    });

    return response.data;
  } catch (error) {
    console.error("Error updating householder confirmation:", error);
    throw error.response?.data || error.message;
  }
};

export const updateHouseHoldersDataByHouseHolderIdApi = async (id, reqBody) => {
  try {
    const response = await API_ENDPOINT.put(
      HOUSE_HOLDERS_UPDATE_HOUSE_HOLDERS_DATA_BY_HOUSE_HOLDER_ID.replace(
        ":id",
        id
      ),
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
