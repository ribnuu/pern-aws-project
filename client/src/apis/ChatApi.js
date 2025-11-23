import API_ENDPOINT from "./httpInterceptor";
import { CHAT_ADD_MESSAGE, CHAT_GET_SINGLE_CHAT_BY_CHAT_ID } from "./endpoints";

export const chatAddMessageApi = async (formData) => {
  try {
    const response = await API_ENDPOINT.post(CHAT_ADD_MESSAGE, { formData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const chatGetSingleChatApi = async (chatId) => {
  try {
    const response = await API_ENDPOINT.get(
      CHAT_GET_SINGLE_CHAT_BY_CHAT_ID.replace(":chatId", chatId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
