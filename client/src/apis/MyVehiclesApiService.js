import { GET_VEHICLES_BY_NIC } from "./endpoints";

export const getVehiclesByNicNumberApi = async ({ nic_number }) => {
  try {
    const response = await API_ENDPOINT.post(GET_VEHICLES_BY_NIC, {
      nic_number,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
