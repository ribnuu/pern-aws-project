import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllRolesByGroupIdApi } from "../../../apis/RoelsApiService";
import LISpinnerWithText from "../../../components/LoadingIndicators/LISpinnerWithText";
import { getAllGroupsApi, getUsersApi } from "../../../apis/RightsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSAssignGroup = () => {
  // Handle groups and filter groups
  const [groupsList, setGroupsList] = useState([]);
  const [unchangedGroupsList, setUnchangedGroupsList] = useState([]);
  const [groupQuery, setGroupQuery] = useState("");

  //
  const [rolesList, setRolesList] = useState([]);
  const [userRoleToHighlight, setUserRoleToHighlight] = useState("");
  const [unchangedRolesList, setUnchangedRolesList] = useState([]);
  const [roleQuery, setRoleQuery] = useState("");
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  const [userGroupId, setUserGroupId] = useState([]);

  //Handle group users and filter group users
  const [groupUserQuery, setGroupUserQuery] = useState("");

  //Handle all Users and filter all users
  const [users, setUsers] = useState([]);
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsersQuery, setAllUsersQuery] = useState([]);

  const [userGroupToHighlight, setUserGroupToHighlight] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  const [nullGroupUser, setNullGroupUser] = useState([]);

  const [selectGroupNull, setSelectGroupNull] = useState(false);

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

  const handleRoleSearch = (event) => {
    const getRoleSearch = event.target.value;
    if (getRoleSearch.length > 0) {
      const searchData = unchangedRolesList.filter((item) =>
        item.user_role_name.toLowerCase().includes(getRoleSearch)
      );
      setRolesList(searchData);
    } else {
      setRolesList(unchangedRolesList);
    }
    setRoleQuery(getRoleSearch);
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

  const handleUserGroup = (group_id) => {
    setUserGroupToHighlight(group_id);
  };

  const handleUserRole = (user_role) => {
    setUserRoleToHighlight(user_role);
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
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserToNullToDatabase = async (users) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const getGroups = async () => {
    try {
      const groupResponse = await getAllGroupsApi();
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

      if (userResponse.rowCount > 0) {
        userResponse.rows.forEach((element) => {
          if (userGroupToHighlight == element.user_group) {
            // console.log(element.username);
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
    if (userGroupToHighlight == "") {
      setSelectGroupNull(true);
    } else {
      try {
        setUserGroupId([]);
        setUserGroupToHighlight("");

        // A bug. This nullGroupUser Array id needs to be removed if he moves to the groupUser Array
        // // Needs to be tested
        //On this page the UMSAssignGroup was copied. So not sure if the bug persists
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
    };
    fetchData();
    return () => {};
  }, [userGroupToHighlight]);

  useEffect(() => {
    const fetchRolesByGroupId = async () => {
      if (userGroupToHighlight && userGroupToHighlight !== "") {
        setIsLoadingRoles(true);
        try {
          const response = await getAllRolesByGroupIdApi(
            parseInt(userGroupToHighlight)
          );
          if (response && response.data) {
            setRolesList(response.data);
            setUnchangedRolesList(response.data);
          }
          setIsLoadingRoles(false);
        } catch (error) {
          console.error("Error fetching roles:", error);
          setIsLoadingRoles(false);
        } finally {
          setIsLoadingRoles(false);
        }
      }
    };

    fetchRolesByGroupId();

    return () => {};
  }, [userGroupToHighlight]);

  return (
    <section className="mx-5 mt-8 bg-gray-800 p-4 rounded-lg py-4">
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

      <div className="grid grid-cols-4 gap-4">
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
                        <button
                          onClick={() => handleUserGroup(data.user_group_id)}
                          className={highlight}
                        >
                          {data.user_group_name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="roleSearch"
              value={roleQuery}
              onChange={(e) => handleRoleSearch(e)}
              placeholder="Search Role ..."
              className="bg-white text-black rounded-md py-1 px-2 w-full"
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {isLoadingRoles && <LISpinnerWithText />}
            <div className="grid grid-cols-1">
              {rolesList && (
                <div>
                  {rolesList.map((item, key) => {
                    let highlight = "";
                    if (userRoleToHighlight == item.user_role_id) {
                      highlight = "text-green-500";
                    } else {
                      highlight = "";
                    }
                    return (
                      <div key={key}>
                        <button
                          onClick={() => handleUserRole(item.user_role_id)}
                          className={highlight}
                        >
                          {item.user_role_name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Added users section */}
        <div className="bg-gray-100 rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="groupUsers"
              value={groupUserQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleGroupUserSearch(e)}
              placeholder="Search Users ..."
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {userGroupToHighlight && (
                <div>
                  {users && (
                    <div>
                      {users.map((data, key) => {
                        const filteredData = userGroupId.filter(
                          (data2) => data2 === data.user_id
                        );
                        if (filteredData.length > 0) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleUserRemoveFromGroup(data.user_id)
                              }
                            >
                              {data.username}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="allUsers"
              value={allUsersQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleAllUsersSearch(e)}
              placeholder="Search Users ..."
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {userGroupToHighlight && (
                <div className="">
                  {allUsers && (
                    <div className="w-full">
                      {allUsers.map((data, key) => {
                        const isUserPresent = userGroupId.some(
                          (data2) => data2 === data.user_id
                        );

                        if (!isUserPresent) {
                          return (
                            <div
                              key={key}
                              onClick={() => handleUserAddToGroup(data.user_id)}
                              onLoad={() => handleAllUsers(data.user_id)}
                            >
                              {data.username}
                            </div>
                          );
                        }

                        return null;
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

export default UMSAssignGroup;
