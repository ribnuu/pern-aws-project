import API_ENDPOINT from "./httpInterceptor";
import { CCC_POLICE_TRAFFIC_OFFENSE_INSIGHTS_GET_LICENSE_IN_HAND_BY_FILTERS } from "./endpoints";
import QueryString from "qs";

export const getLicenseInHandInsightsDataByFiltersApi = async (
  filters = {}
) => {
  try {
    const queryString = QueryString.stringify(filters); // Use qs to stringify the filters object
    // Make the API call with the constructed URL
    const response = await API_ENDPOINT.get(
      `${CCC_POLICE_TRAFFIC_OFFENSE_INSIGHTS_GET_LICENSE_IN_HAND_BY_FILTERS}?${queryString}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
