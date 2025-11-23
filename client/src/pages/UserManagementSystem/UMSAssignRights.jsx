import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllGroupsApi,
  getAllRolesApi,
  getButtonsApi,
  getComponentsApi,
  getSubComponentsApi,
  getUsersApi,
} from "../../apis/RightsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSAssignRights = () => {
  // Handle groups and filter groups
  const [groupsList, setGroupsList] = useState([]);
  const [unchangedGroupsList, setUnchangedGroupsList] = useState([]);
  const [groupQuery, setGroupQuery] = useState("");

  // Components

  const [userGroupId, setUserGroupId] = useState([]);

  //Handle group users and filter group users
  const [groupUserQuery, setGroupUserQuery] = useState("");

  //Handle all Users and filter all users
  const [users, setUsers] = useState([]);
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsersQuery, setAllUsersQuery] = useState([]);

  //Group To Highlight
  const [userGroupToHighlight, setUserGroupToHighlight] = useState("");

  //Role To Highlight
  const [UserRoleToHighlight, setUserRoleToHighlight] = useState("");

  //User To Highlight
  const [UserToHighlight, setUserToHighlight] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  const [nullGroupUser, setNullGroupUser] = useState([]);

  const [selectGroupNull, setSelectGroupNull] = useState(false);

  // Selection
  const [Selection, setSelection] = useState("Users");

  //User

  // Groups
  const [Groups, setGroups] = useState([]);
  const [UnchangedGroups, setUnchangedGroups] = useState([]);

  //Roles
  const [Roles, setRoles] = useState([]);
  const [UnchangedRoles, setUnchangedRoles] = useState([]);

  // Sub Components

  const [SubComponents, setSubComponents] = useState([]);
  const [UnchangedSubComponents, setUnchangedSubComponents] = useState([]);
  // This needs to be changed to an array
  const [SubComponentArray, setSubComponentArray] = useState("");

  // Components
  const [Components, setComponents] = useState([]);
  const [UnchangedComponents, setUnchangedComponents] = useState([]);
  // This needs to be changed to an array
  const [ComponentArray, setComponentArray] = useState("");

  //Buttons
  const [Buttons, setButtons] = useState([]);
  const [UnchangedButtons, setUnchangedButtons] = useState([]);
  const [ButtonArray, setButtonArray] = useState([]);

  // Select the user group

  const handleGroupSearch = (event) => {
    const getGroupSearch = event.target.value;
    if (getGroupSearch.length > 0) {
      const searchData = unchangedGroupsList.filter((item) =>
        item.user_group_name.toLowerCase().includes(getGroupSearch)
      );
      setGroupsList(searchData);
    } else {
      setGroupsList(unchangedGroupsList);
    }
    setGroupQuery(getGroupSearch);
  };

  const handleAllUsersSearch = (event) => {
    const getAllUsersSearch = event.target.value;
    if (getAllUsersSearch.length > 0) {
      const searchData = unChangedUsers.filter((item) =>
        item.username.toLowerCase().includes(getAllUsersSearch)
      );
      setAllUsers(searchData);
    } else {
      setAllUsers(unChangedUsers);
    }
    setAllUsersQuery(getAllUsersSearch);
  };

  const handleGroupUserSearch = (event) => {
    const getGroupUserSearch = event.target.value;
    if (getGroupUserSearch.length > 0) {
      const searchData = unChangedUsers.filter((item) =>
        item.username.toLowerCase().includes(getGroupUserSearch)
      );
      setUsers(searchData);
    } else {
      setUsers(unChangedUsers);
    }
    setGroupUserQuery(getGroupUserSearch);
  };

  const handleUserAddToGroup = (user_id) => {
    if (userGroupId.includes(user_id)) {
      setUserGroupId((userGroupId) =>
        userGroupId.filter((id) => id !== user_id)
      );
    } else {
      setUserGroupId((userGroupId) => [...userGroupId, user_id]);
    }
  };

  const handleUserRemoveFromGroup = (user_id) => {
    if (userGroupId.includes(user_id)) {
      setUserGroupId(userGroupId.filter((item) => item !== user_id));
      if (!nullGroupUser.includes(user_id)) {
        setNullGroupUser((nullGroupUser) => [...nullGroupUser, user_id]);
      } else {
        setNullGroupUser((nullGroupUser) =>
          nullGroupUser.filter((id) => id !== user_id)
        );
      }
    }
  };

  const handleAllUsers = (user_id) => {
    if (!userGroupId.includes(user_id)) {
      handleUserAddToGroup(user_id);
    } else {
      handleUserRemoveFromGroup(user_id);
    }
  };

  const updateUserGroupToDatabase = async (user_group_id, users) => {
    try {
      const userGroupUpdateResponse = await axios.post(
        `http://${server_port}:4000/api/user/updateUserGroupByUserId`,
        {
          user_group_id: user_group_id,
          user_id: users,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleComponentsArray = async (component_id) => {
    if (ComponentArray.includes(component_id)) {
      setComponentArray(ComponentArray.filter((item) => item !== component_id));
    } else {
      setComponentArray((ComponentArray) => [...ComponentArray, component_id]);
    }
  };

  const handleSubComponentArray = async (sub_component_id) => {
    if (SubComponentArray.includes(sub_component_id)) {
      setSubComponentArray(
        SubComponentArray.filter((item) => item !== sub_component_id)
      );
    } else {
      setSubComponentArray((SubComponentArray) => [
        ...SubComponentArray,
        sub_component_id,
      ]);
    }
  };

  const handleButtonsArray = async (button_id) => {
    if (ButtonArray.includes(button_id)) {
      setButtonArray(ButtonArray.filter((item) => item !== button_id));
    } else {
      setButtonArray((ButtonArray) => [...ButtonArray, button_id]);
    }
  };

  const handleUserGroup = (group_id) => {
    setUserGroupToHighlight(group_id);
    setUserRoleToHighlight("");
    setUserRoleToHighlight("");
  };

  const handleUser = (user_id) => {
    setUserRoleToHighlight(user_id);
    setUserRoleToHighlight("");
    setUserGroupToHighlight("");
  };

  const updateUserToNullToDatabase = async (users) => {
    try {
      const updateUserGroupByUserIdToNull = await axios.post(
        `http://${server_port}:4000/api/user/updateUserGroupByUserIdToNull`,
        {
          user_id: users,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async () => {
    try {
      const RolesResponse = await getAllRolesApi();
      setRoles(RolesResponse.data.rows);
      setUnchangedRoles(RolesResponse.data.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const getComponents = async () => {
    try {
      const ComponentResponse = await getComponentsApi();
      setComponents(ComponentResponse.rows);
      setUnchangedComponents(ComponentResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubComponents = async () => {
    try {
      const subComponentResponse = await getSubComponentsApi();
      setSubComponents(subComponentResponse.rows);
      setUnchangedSubComponents(subComponentResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const getButtons = async () => {
    try {
      const buttonResponse = await getButtonsApi();
      setButtons(buttonResponse.rows);
      setUnchangedButtons(buttonResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const getGroups = async () => {
    try {
      const groupResponse = await await getAllGroupsApi();
      // setTestOne(GroupsResponse);
      if (groupResponse.data.rowCount > 0) {
        setUnchangedGroupsList(groupResponse.data.rows);
        setGroupsList(groupResponse.data.rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const userResponse = await getUsersApi();
      // setTestTwo(userResponse);

      if (userResponse.rowCount > 0) {
        userResponse.rows.forEach((element) => {
          if (userGroupToHighlight == element.user_group) {
            handleAllUsers(element.user_id);
          }
        });
        setAllUsers(userResponse.rows);
        setUsers(userResponse.rows);
        setUnchangedUsers(userResponse.rows);
      } else {
        setUserGroupId([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectGroupNull(false);
    setUserGroupId([]);
    setUserGroupToHighlight("");
    setComponentArray("");
    setSubComponentArray("");
    setButtonArray("");
    if (userGroupToHighlight == "") {
      setSelectGroupNull(true);
    } else {
      try {
        console.log(ButtonArray);
        console.log(SubComponentArray);
        console.log(ComponentArray);

        // const r2 = await updateUserToNullToDatabase(nullGroupUser);
        // const r1 = await updateUserGroupToDatabase(
        //   userGroupToHighlight,
        //   userGroupId
        // );
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setSelectGroupNull(false);
    const fetchData = async () => {
      setUserGroupId([]);
      getGroups();
      getUsers();
      getRoles();
      getButtons();
      getComponents();
      getSubComponents();
    };
    fetchData();
    return () => {};
  }, [userGroupToHighlight]);

  return (
    <section className="bg-gray-800 p-4 rounded-lg py-4">
      {selectGroupNull && (
        <div className="w-1/2">
          <div className="flex justify-center my-2 mb-4">
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Please select a group</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 gap-y-1">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p:0 dark:bg-gray-800 dark:border-white text-center grid grid-cols-3 justify-around items-center">
          <div
            className="bg-blue-600 text-center rounded-lg my-1 ml-1 hover:bg-blue-900 "
            onClick={() => setSelection("Groups")}
          >
            Group
          </div>
          <div
            className="bg-blue-600 text-center rounded-lg my-1 mx-1 hover:bg-blue-900"
            onClick={() => setSelection("Roles")}
          >
            Roles
          </div>
          <div
            className="bg-blue-600 text-center rounded-md my-1 mr-1 hover:bg-blue-900"
            onClick={() => setSelection("Users")}
          >
            Users
          </div>
        </div>
        <div className="bg-white rounded-lg shadow md:mt-0 w-full xl:p:0 dark:bg-zinc-300 text-center text-black my-1">
          <p className="mt-1">PAGES</p>
        </div>
        <div className="bg-white rounded-lg shadow md:mt-0 w-full xl:p:0 dark:bg-zinc-300 text-center text-black my-1">
          <p className="mt-1">SUB PAGES</p>
        </div>
        <div className="bg-white rounded-lg shadow md:mt-0 w-full xl:p:0 dark:bg-zinc-300 text-center text-black my-1">
          <p className="mt-1">BUTTONS</p>
        </div>

        {/* Group */}

        {Selection && Selection == "Groups" && (
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
            <div className="items-center mx-2 mt-2">
              <input
                type="search"
                name="groupSearch"
                value={groupQuery}
                onChange={(e) => {}}
                placeholder="Search Group ..."
                className="bg-white text-black rounded-md py-1 px-2 w-full"
              />
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="grid grid-cols-1">
                {groupsList && (
                  <div>
                    {groupsList.map((data, key) => {
                      let highlight = "";
                      if (userGroupToHighlight == data.user_group_id) {
                        highlight = "text-green-500";
                      } else {
                        highlight = "";
                      }
                      return (
                        <div key={key}>
                          <div
                            onClick={() =>
                              setUserGroupToHighlight(data.user_group_id)
                            }
                            className={`${highlight}`}
                          >
                            {data.user_group_name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Roles */}
        {Selection && Selection == "Roles" && (
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
            <div className="items-center mx-2 mt-2">
              <input
                type="search"
                name="groupSearch"
                value={groupQuery}
                onChange={(e) => {}}
                placeholder="Search Roles ..."
                className="bg-white text-black rounded-md py-1 px-2 w-full"
              />
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="grid grid-cols-1">
                {Roles && (
                  <div>
                    {Roles.map((data, key) => {
                      let highlight = "";
                      if (UserRoleToHighlight == data.user_role_id) {
                        highlight = "text-green-500";
                      } else {
                        highlight = "";
                      }
                      return (
                        <div key={key}>
                          <div
                            onClick={() =>
                              setUserRoleToHighlight(data.user_role_id)
                            }
                            className={`${highlight}`}
                          >
                            {data.user_role_name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* User */}
        {Selection && Selection == "Users" && (
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
            <div className="items-center mx-2 mt-2">
              <input
                type="search"
                name="groupSearch"
                value={groupQuery}
                onChange={(e) => {}}
                placeholder="Search Users ..."
                className="bg-white text-black rounded-md py-1 px-2 w-full"
              />
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="grid grid-cols-1">
                {users && (
                  <div>
                    {users.map((data, key) => {
                      let highlight = "";
                      if (UserToHighlight == data.user_id) {
                        highlight = "text-green-500";
                      } else {
                        highlight = "";
                      }
                      return (
                        <div key={key}>
                          <div
                            onClick={() => setUserToHighlight(data.user_id)}
                            className={`${highlight}`}
                          >
                            {data.username}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Components */}
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="allUsers"
              value={allUsersQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleAllUsersSearch(e)}
              placeholder="Search Components ..."
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {userGroupToHighlight && (
                <div className="">
                  {Components && (
                    <div className="w-full">
                      {Components.map((data, key) => {
                        const highlight = ComponentArray.includes(data.pages_id)
                          ? "text-green-500"
                          : "";

                        return (
                          <div
                            key={key}
                            onClick={() => {
                              handleComponentsArray(data.pages_id);
                            }}
                            className={highlight}
                          >
                            {data.component_name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub - Components */}
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="allUsers"
              value={allUsersQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleAllUsersSearch(e)}
              placeholder="Search Sub Components ..."
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {ComponentArray && (
                <div className="">
                  {SubComponents && (
                    <div className="w-full">
                      {SubComponents.map((data, key) => {
                        const highlight = SubComponentArray.includes(
                          data.pages_id
                        )
                          ? "text-green-500"
                          : "";
                        return (
                          <div
                            key={key}
                            className={`${highlight}`}
                            onClick={() => {
                              handleSubComponentArray(data.pages_id);
                            }}
                          >
                            {data.component_name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="groupSearch"
              value={groupQuery}
              onChange={(e) => handleGroupSearch(e)}
              placeholder="Search Group ..."
              className="bg-white text-black rounded-md py-1 px-2 w-full"
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {SubComponentArray && (
                <div className="">
                  {ButtonArray && (
                    <div className="w-full">
                      {Buttons.map((data, key) => {
                        const highlight = ButtonArray.includes(
                          data.ccc_master_buttons_id
                        )
                          ? "text-green-500"
                          : "";

                        return (
                          <div
                            key={key}
                            className={`${highlight}`}
                            onClick={() => {
                              handleButtonsArray(data.ccc_master_buttons_id);
                            }}
                          >
                            {data.button_display_name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full justify-center btn bg-blue-600 mt-4"
        >
          Update
        </button>
      </form>
    </section>
  );
};

export default UMSAssignRights;
