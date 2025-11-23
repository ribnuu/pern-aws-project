import { CCC_TRAFFIC_OFFENSE_REPORT_GET_LICENSE_IN_HAND } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getLicenseInHandApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_TRAFFIC_OFFENSE_REPORT_GET_LICENSE_IN_HAND,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
