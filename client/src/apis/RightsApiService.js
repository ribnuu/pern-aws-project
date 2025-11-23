import API_ENDPOINT from "./httpInterceptor";
import {
  ASSIGN_GROUP_RIGHTS,
  ASSIGN_ROLE_RIGHTS,
  ASSIGN_USER_RIGHTS,
  GET_BUTTONS,
  GET_COMPONENTS,
  GET_GROUPS,
  GET_ROLES,
  GET_SUB_COMPONENTS,
  GET_USER_BUTTON_RIGHTS_BY_GROUP_ID,
  GET_USER_BUTTON_RIGHTS_BY_ROLE_ID,
  GET_USER_BUTTONS_RIGHTS_BY_USER_ID,
  GET_USER_BUTTONS_RIGHTS_BY_USER_ID_AND_COMPONENTS_ID,
  GET_USERS,
  REVOKE_USER_BUTTONS_RIGHTS_BY_USER_ID,
  RIGHTS_GET_BUTTONS_BY_USER_AND_BUTTON_ID,
  RIGHTS_GET_BUTTONS_BY_USER_AND_PAGE_ID,
  RIGHTS_GET_LANDING_PAGE_BUTTONS_BY_USER_ID,
} from "./endpoints";

export const getComponentsApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_COMPONENTS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubComponentsApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_SUB_COMPONENTS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getButtonsApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_BUTTONS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserButtonsRightsByUserIdApi = async (user_id) => {
  try {
    const response = await API_ENDPOINT.post(
      GET_USER_BUTTONS_RIGHTS_BY_USER_ID,
      {
        user_id,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserButtonRightsByGroupIdApi = async (groupId) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_USER_BUTTON_RIGHTS_BY_GROUP_ID.replace(":groupId", groupId)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserButtonRightsByRoleIdApi = async (roleId) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_USER_BUTTON_RIGHTS_BY_ROLE_ID.replace(":roleId", roleId)
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllGroupsApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_GROUPS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRolesApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_ROLES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignGroupRightsApi = async ({
  user_group_id,
  buttonToSend,
  subComponentToSend,
  componentsToSend,
}) => {
  try {
    const response = await API_ENDPOINT.post(ASSIGN_GROUP_RIGHTS, {
      user_group_id: user_group_id,
      button: buttonToSend,
      subComponents: subComponentToSend,
      components: componentsToSend,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignRoleRightsApi = async ({
  user_role_id,
  button,
  subComponents,
  components,
}) => {
  try {
    const response = await API_ENDPOINT.post(ASSIGN_ROLE_RIGHTS, {
      user_role_id: user_role_id,
      button: button,
      subComponents: subComponents,
      components: components,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignUserRightsApi = async ({
  user_id,
  button,
  subComponents,
  components,
}) => {
  try {
    const response = await API_ENDPOINT.post(ASSIGN_USER_RIGHTS, {
      user_id,
      button,
      subComponents,
      components,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revokeUserButtonsRightsByUserIdApi = async ({
  user_id,
  revokeButtonsList,
}) => {
  try {
    const response = await API_ENDPOINT.post(
      REVOKE_USER_BUTTONS_RIGHTS_BY_USER_ID,
      {
        user_id,
        RevokeButtonsList: revokeButtonsList,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersApi = async () => {
  try {
    const response = await API_ENDPOINT.post(GET_USERS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserButtonsRightsByUserIdAndComponentsIdApi = async ({
  user_id,
  component_id,
}) => {
  try {
    const response = await API_ENDPOINT.post(
      GET_USER_BUTTONS_RIGHTS_BY_USER_ID_AND_COMPONENTS_ID,
      {
        user_id,
        component_id,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLandingPageButtonsByUserId = async (userId) => {
  try {
    const response = await API_ENDPOINT.post(
      RIGHTS_GET_LANDING_PAGE_BUTTONS_BY_USER_ID,
      { userId }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getButtonsByPageAndUserIdApi = async (userId, pageId) => {
  try {
    const response = await API_ENDPOINT.post(
      RIGHTS_GET_BUTTONS_BY_USER_AND_PAGE_ID,
      { userId, pageId }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getButtonsByUserAndButtonIdApi = async (userId, buttonId) => {
  try {
    const response = await API_ENDPOINT.post(
      RIGHTS_GET_BUTTONS_BY_USER_AND_BUTTON_ID,
      { userId, buttonId }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
