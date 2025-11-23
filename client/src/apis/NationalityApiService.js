import { COUNTRIES_NATIONALITY } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const fetchCountryNationality = async () => {
  try {
    const responce = await API_ENDPOINT.get(`${COUNTRIES_NATIONALITY}`);
    return responce.data;
  } catch (error) {
    throw error;
  }
};
