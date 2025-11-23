import { GET_MY_DEVICES_BY_NIC } from "./endpoints";

export const getMyDevicesByNICApi = async ({ nic_number }) => {
  try {
    const response = await API_ENDPOINT.post(GET_MY_DEVICES_BY_NIC, {
      nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
