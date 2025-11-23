import { PAYMENT_GATEWAY_HNB_CREATE_SIGNATURE } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createSignatureForHNBPayment = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(
      PAYMENT_GATEWAY_HNB_CREATE_SIGNATURE,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
