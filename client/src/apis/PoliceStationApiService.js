import {
  CCC_POLICE_STATION_ASSIGN_POLICE_OFFICER,
  CCC_POLICE_STATION_SEARCH,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";
import qs from "qs"; // Optional: install qs for query string manipulation

export const searchPoliceStationApi = async (filters = {}) => {
  try {
    const queryString = qs.stringify(filters); // Use qs to stringify the filters object
    // Make the API call with the constructed URL
    const response = await API_ENDPOINT.get(
      `${CCC_POLICE_STATION_SEARCH}?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const assignPoliceOffcerAPoliceStationApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_POLICE_STATION_ASSIGN_POLICE_OFFICER,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
