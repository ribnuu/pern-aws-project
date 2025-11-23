import { POS_ASY_GET_FIRST_BILL_FOR_EACH_INSTITUTE } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getFirstBilForAllInstitutesInTheCompanyApi = async () => {
  try {
    const response = await API_ENDPOINT.get(
      POS_ASY_GET_FIRST_BILL_FOR_EACH_INSTITUTE
    );
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
