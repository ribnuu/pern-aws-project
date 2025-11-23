import API_ENDPOINT from "./httpInterceptor";
import {
  ADD_AFFILIATIONS_FOR_USERS,
  GET_ALL_USER_AFFILIATIONS_BY_GROUP_AND_ROLE_ID,
} from "./endpoints";

export const getAllUserAffilaitionsByGroupAndRoleIdApi = async (
  groupId,
  roleId
) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_ALL_USER_AFFILIATIONS_BY_GROUP_AND_ROLE_ID.replace(
        ":groupId",
        groupId
      ).replace(":roleId", roleId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAffilaitionsForUsersApi = async (
  users,
  groupId,
  roleId,
  userAffiliationIdsToRemove
) => {
  try {
    const response = await API_ENDPOINT.post(ADD_AFFILIATIONS_FOR_USERS, {
      users,
      groupId,
      roleId,
      userAffiliationIdsToRemove,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
