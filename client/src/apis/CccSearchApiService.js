import API_ENDPOINT from "./httpInterceptor";
import { CCC_SEARCH_USER_BY_GROUP_ID_ROLE_ID_AND_SEARCH_TERM } from "./endpoints";

export const searchUserInCccByUserIdGroupIdAndSearchTerm = async (
  groupId,
  roleId,
  searchTerm
) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_SEARCH_USER_BY_GROUP_ID_ROLE_ID_AND_SEARCH_TERM,
      {
        groupId,
        roleId,
        searchTerm,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
