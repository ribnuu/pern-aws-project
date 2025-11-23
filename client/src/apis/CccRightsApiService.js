import {
  CCC_RIGHTS_GENERATE_TREE_VIEW_FOR_ALL_PAGES_BY_GROUP_OR_ROLE_ID,
  CCC_RIGHTS_UPDATE_TREE_VIEW_DATA,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getRightsTreeViewData = async ({
  groupId = null,
  roleId = null,
}) => {
  try {
    const response = await API_ENDPOINT.post(
      CCC_RIGHTS_GENERATE_TREE_VIEW_FOR_ALL_PAGES_BY_GROUP_OR_ROLE_ID,
      {
        groupId,
        roleId,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRightsTreeViewData = async ({
  groupId = null,
  roleId = null,
  data,
}) => {
  try {
    const response = await API_ENDPOINT.post(CCC_RIGHTS_UPDATE_TREE_VIEW_DATA, {
      groupId,
      roleId,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
