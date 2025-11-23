import React, { useEffect, useState } from "react";
import { getAllRolesByGroupIdApi } from "../../../apis/RoelsApiService";
import LISpinnerWithText from "../../../components/LoadingIndicators/LISpinnerWithText";
import { getAllGroupsApi } from "../../../apis/GroupApiService";
import toast from "react-hot-toast";
import {
  addAffilaitionsForUsersApi,
  getAllUserAffilaitionsByGroupAndRoleIdApi,
} from "../../../apis/UserAffiliationsApi";
import {
  getNUsersByCreatedAtDateApi,
  searchUsersApi,
} from "../../../apis/UserApiService";
import _ from "lodash";

const UMSAssignGroup = () => {
  // Handle groups and filter groups
  const [groupsList, setGroupsList] = useState([]);
  const [unchangedGroupsList, setUnchangedGroupsList] = useState([]);
  const [groupQuery, setGroupQuery] = useState("");
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

  //
  const [rolesList, setRolesList] = useState([]);
  const [userRoleToHighlight, setUserRoleToHighlight] = useState("");
  const [unchangedRolesList, setUnchangedRolesList] = useState([]);
  const [roleQuery, setRoleQuery] = useState("");
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);

  const [userAffiliationIdsToRemove, setUserAffiliationIdsToRemove] = useState(
    []
  );

  // State to store the users who are already in the selected group and role
  const [allowedUsersForGroupAndRole, setAllowedUsersForGroupAndRole] =
    useState([]);
  const [unChangedAllowedUsers, setUnChangedAllowedUsers] = useState([]);

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  //Handle group users and filter group users
  const [groupUserQuery, setGroupUserQuery] = useState("");

  //Handle all Users and filter all users
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsersQuery, setAllUsersQuery] = useState([]);

  const [userGroupToHighlight, setUserGroupToHighlight] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  const [nullGroupUser, setNullGroupUser] = useState([]);

  // ! For debounce and throttle search
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const removeItemsFromAllowedUsersForGroupAndRole = (userIdToRemove) => {
    const updatedRecords = allowedUsersForGroupAndRole.filter(
      (user) => user.user_id !== userIdToRemove
    );
    setAllowedUsersForGroupAndRole(updatedRecords);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchUsersApi(searchTerm);
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      debouncedSearch(searchTerm.trim());
    }
  }, [searchTerm, debouncedSearch]);

  // ! End of debounce and throttle search

  const addItemsForAllowedUsersForGroupAndRole = (toAddUSer) => {
    const userId = toAddUSer.user_id;
    const userExists = allowedUsersForGroupAndRole.some(
      (user) => user.user_id === toAddUSer.user_id
    );
    if (!userExists) {
      const updatedRecords = [...allowedUsersForGroupAndRole, toAddUSer];
      setAllowedUsersForGroupAndRole(updatedRecords);
    } else {
      setAllowedUsersForGroupAndRole((allowedUsersForGroupAndRole) =>
        allowedUsersForGroupAndRole.filter((id) => id !== toAddUSer.user_id)
      );
    }
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds((selectedUserIds) =>
        selectedUserIds.filter((id) => id !== userId)
      );
    } else {
      setSelectedUserIds((selectedUserIds) => [...selectedUserIds, userId]);
    }
  };

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
    const getAllUsersSearch = event.target.value.toLowerCase(); // Ensure search is case insensitive
    if (getAllUsersSearch.length > 0) {
      const searchData = unChangedUsers.filter(
        (item) =>
          (item.username &&
            item.username.toLowerCase().includes(getAllUsersSearch)) ||
          (item.mobile_number &&
            item.mobile_number.includes(getAllUsersSearch)) ||
          (item.nic_number && item.nic_number.includes(getAllUsersSearch))
      );
      setAllUsers(searchData);
      if (searchData.length <= 0) {
        setSearchTerm(getAllUsersSearch);
      }
    } else {
      setAllUsers(unChangedUsers);
    }
    setAllUsersQuery(getAllUsersSearch);
  };

  const handleGroupUserSearch = (event) => {
    const getGroupUserSearch = event.target.value;
    if (getGroupUserSearch.length > 0) {
      const searchData = allowedUsersForGroupAndRole.filter(
        (item) =>
          (item.username &&
            item.username.toLowerCase().includes(getGroupUserSearch)) ||
          (item.mobile_number &&
            item.mobile_number.includes(getGroupUserSearch)) ||
          (item.nic_number && item.nic_number.includes(getGroupUserSearch))
      );
      setAllowedUsersForGroupAndRole(searchData);
    } else {
      setAllowedUsersForGroupAndRole(unChangedAllowedUsers);
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
    if (selectedUserIds.includes(user_id)) {
      setSelectedUserIds((selectedUserIds) =>
        selectedUserIds.filter((id) => id !== user_id)
      );
    } else {
      setSelectedUserIds((selectedUserIds) => [...selectedUserIds, user_id]);
    }
  };

  const handleUserRemoveFromGroup = (user_id) => {
    if (selectedUserIds.includes(user_id)) {
      setSelectedUserIds(selectedUserIds.filter((item) => item !== user_id));
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
    if (!selectedUserIds.includes(user_id)) {
      handleUserAddToGroup(user_id);
    } else {
      handleUserRemoveFromGroup(user_id);
    }
  };

  const getUsers = async () => {
    try {
      const userResponse = await getNUsersByCreatedAtDateApi(5);

      if (userResponse.data && userResponse.data.length > 0) {
        userResponse.data.forEach((element) => {
          if (userGroupToHighlight == element.user_group) {
            handleAllUsers(element.user_id);
          }
        });
        setAllUsers(userResponse.data);
        setUnchangedUsers(userResponse.data);
      } else {
        setSelectedUserIds([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateButtonClick = async (e) => {
    e.preventDefault();
    if (!userGroupToHighlight || userGroupToHighlight === "") {
      toast.error("Please select a group to continue");
      return;
    }

    if (!userRoleToHighlight || userRoleToHighlight === "") {
      toast.error("Please select a role to continue");
      return;
    }

    toast.promise(
      addAffilaitionsForUsersApi(
        selectedUserIds,
        parseInt(userGroupToHighlight),
        parseInt(userRoleToHighlight),
        userAffiliationIdsToRemove
      ),
      {
        loading: "Saving...",
        success: <b>Successfully updated</b>,
        error: <b>Failed to update</b>,
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setSelectedUserIds([]);
      getUsers();
    };
    fetchData();
    return () => {};
  }, [userGroupToHighlight]);

  useEffect(() => {
    const fetchData = async () => {
      if (userGroupToHighlight != "" && userRoleToHighlight != "") {
        const response = await getAllUserAffilaitionsByGroupAndRoleIdApi(
          parseInt(userGroupToHighlight),
          parseInt(userRoleToHighlight)
        );
        if (response && response.data) {
          setAllowedUsersForGroupAndRole(response.data);
          setUnChangedAllowedUsers(response.data);
        }
      }
    };

    fetchData();
    return () => {};
  }, [userGroupToHighlight, userRoleToHighlight]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoadingGroups(true);
        const response = await getAllGroupsApi();
        if (response && response.data) {
          setUnchangedGroupsList(response.data);
          setGroupsList(response.data);
        }
        setIsLoadingGroups(false);
      } catch (error) {
        console.error("Error fetching groups: ", error);
        setIsLoadingGroups(false);
      } finally {
        setIsLoadingGroups(false);
      }
    };
    fetchGroups();
    return () => {};
  }, []);

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
    <div className="mx-5 mt-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 border border-black p-2">
      <div className="grid grid-cols-4 gap-4 ">
        <div className="bg-gray-200 rounded-lg shadow dark:border  xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="groupSearch"
              value={groupQuery}
              onChange={(e) => handleGroupSearch(e)}
              placeholder="Search Group ..."
              className="bg-white text-black rounded-md py-1 px-2 "
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {isLoadingGroups && (
              <LISpinnerWithText loadingText="Loading groups..." />
            )}
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
        <div className="bg-gray-200 rounded-lg shadow dark:border  xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="roleSearch"
              value={roleQuery}
              onChange={(e) => handleRoleSearch(e)}
              placeholder="Search Role ..."
              className="bg-white text-black rounded-md py-1 px-2 "
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {isLoadingRoles && (
              <LISpinnerWithText loadingText="Loading roles..." />
            )}
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
        <div className="bg-gray-200 rounded-lg shadow dark:border  xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="groupUsers"
              value={groupUserQuery}
              className="bg-white text-black rounded-md py-1 px-2 "
              onChange={(e) => handleGroupUserSearch(e)}
              placeholder="Search Users ..."
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {allowedUsersForGroupAndRole && (
                <div>
                  {allowedUsersForGroupAndRole.map((data, key) => {
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          removeItemsFromAllowedUsersForGroupAndRole(
                            data.user_id
                          );
                          setUserAffiliationIdsToRemove([
                            ...userAffiliationIdsToRemove,
                            data.ua_id,
                          ]);
                        }}
                      >
                        {data.username}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Available users section */}
        <div className="bg-gray-200 rounded-lg shadow dark:border  xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="allUsers"
              value={allUsersQuery}
              className="bg-white text-black rounded-md py-1 px-2 "
              onChange={(e) => handleAllUsersSearch(e)}
              placeholder="Search Users ..."
            />
          </div>
          {/* Remove this */}
          {/* <div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {loading && <p>Loading...</p>}
            <ul>
              {searchResults.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div> */}

          {/* End */}
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 ">
            <div className="">
              {userGroupToHighlight && (
                <div className="">
                  {allUsers && (
                    <div className="">
                      {allUsers.map((data, key) => {
                        const isUserPresent = selectedUserIds.some(
                          (data2) => data2 === data.user_id
                        );

                        if (!isUserPresent) {
                          return (
                            <div
                              key={key}
                              // onClick={() => handleUserAddToGroup(data.user_id)}
                              onClick={() =>
                                addItemsForAllowedUsersForGroupAndRole(data)
                              }
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
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={handleUpdateButtonClick}>
        {/* <button type="submit" className="w-full btn bg-blue-600 m-2">
          Update
        </button> */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600  hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border  text-white"
        >
          Update
        </button>
      </form>
      {/* </section> */}
    </div>
  );
};

export default UMSAssignGroup;
