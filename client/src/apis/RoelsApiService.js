import API_ENDPOINT from "./httpInterceptor";
import {
  CREATE_ROLE,
  GET_ALL_ROLES,
  GET_ALL_ROLES_BY_GROUP_ID,
} from "./endpoints";

export const getAllRolesApi = async () => {
  try {
    const response = await API_ENDPOINT.get(GET_ALL_ROLES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRolesByGroupIdApi = async (groupId) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_ALL_ROLES_BY_GROUP_ID.replace(":groupId", groupId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const crateRoleApi = async ({ formData }) => {
  try {
    const response = await API_ENDPOINT.post(CREATE_ROLE, { formData });
    return response.data;
  } catch (error) {
    throw error;
  }
};
