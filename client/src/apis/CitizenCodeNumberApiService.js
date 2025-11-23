import API_ENDPOINT from "./httpInterceptor";
import { CITIZEN_CODE_NUMBER_RECIEVE_BY_CODE_NUMBER } from "./endpoints";

export const fetchCitizenCodeNumberByNicApi = async (citizen_code_number) => {
  try {
    const response = await API_ENDPOINT.post(
      CITIZEN_CODE_NUMBER_RECIEVE_BY_CODE_NUMBER,
      { citizen_code_number: citizen_code_number }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
