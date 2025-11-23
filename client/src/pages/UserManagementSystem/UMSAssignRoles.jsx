import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRolesApi, getUsersApi } from "../../apis/RightsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSAssignRoles = () => {
  // Handle roles and filter roles
  const [rolesList, setRolesList] = useState([]);
  const [unchangedRolesList, setUnchangedRolesList] = useState([]);
  const [roleQuery, setRoleQuery] = useState("");

  const [userRoleId, setUserRoleId] = useState([]);

  //Handle role users and filter roles users
  const [roleUserQuery, setRoleUserQuery] = useState("");

  //Handle all Users and filter all users
  const [users, setUsers] = useState([]);
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsersQuery, setAllUsersQuery] = useState([]);

  const [userRoleToHighlight, setUserRoleToHighlight] = useState(1);

  const [allUsers, setAllUsers] = useState([]);

  const [nullRoleUser, setNullRoleUser] = useState([]);

  const [selectRoleNull, setSelectRoleNull] = useState(false);

  // Select the user role

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

  const handleRoleUserSearch = (event) => {
    const getRoleUserSearch = event.target.value;
    if (getRoleUserSearch.length > 0) {
      const searchData = unChangedUsers.filter((item) =>
        item.username.toLowerCase().includes(getRoleUserSearch)
      );
      setUsers(searchData);
    } else {
      setUsers(unChangedUsers);
    }
    setRoleUserQuery(getRoleUserSearch);
  };

  const handleUserRole = (role_id) => {
    setUserRoleToHighlight(role_id);
  };

  const handleUserAddToRole = (user_id) => {
    if (userRoleId.includes(user_id)) {
      setUserRoleId((userRoleId) => userRoleId.filter((id) => id !== user_id));
    } else {
      setUserRoleId((userRoleId) => [...userRoleId, user_id]);
    }
  };

  const handleUserRemoveFromRole = (user_id) => {
    if (userRoleId.includes(user_id)) {
      setUserRoleId(userRoleId.filter((item) => item !== user_id));
      if (!nullRoleUser.includes(user_id)) {
        setNullRoleUser((nullRoleUser) => [...nullRoleUser, user_id]);
      } else {
        setNullRoleUser((nullRoleUser) =>
          nullRoleUser.filter((id) => id !== user_id)
        );
      }
    }
  };

  const handleAllUsers = (user_id) => {
    if (!userRoleId.includes(user_id)) {
      handleUserAddToRole(user_id);
    } else {
      handleUserRemoveFromRole(user_id);
    }
  };

  const updateUserRoleToDatabase = async (user_role_id, users) => {
    try {
      const userRoleUpdateResponse = await axios.post(
        `http://${server_port}:4000/api/user/updateUserRoleByUserId`,
        {
          user_role_id: user_role_id,
          user_id: users,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserToNullToDatabase = async (users) => {
    try {
      const updateUserRoleByUserIdToNull = await axios.post(
        `http://${server_port}:4000/api/user/updateUserRoleByUserIdToNull`,
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
      const rolesResponse = await getAllRolesApi();
      // setTestOne(rolesResponse);
      if (rolesResponse.data.rowCount > 0) {
        rolesResponse.data.rows.user_role_name;
      }
      setUnchangedRolesList(rolesResponse.data.rows);
      setRolesList(rolesResponse.data.rows);
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
          if (userRoleToHighlight == element.user_role) {
            // console.log(element.username);
            handleAllUsers(element.user_id);
          }
        });
        setAllUsers(userResponse.rows);
        setUsers(userResponse.rows);
        setUnchangedUsers(userResponse.rows);
      } else {
        setUserRoleId([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectRoleNull(false);
    if (userRoleToHighlight == "") {
      setSelectRoleNull(true);
    } else {
      try {
        setUserRoleId([]);
        setUserRoleToHighlight("");

        // A bug. This nullRoleUser Array id needs to be removed if he moves to the roleUser Array
        // // Needs to be tested
        const r2 = await updateUserToNullToDatabase(nullRoleUser);
        const r1 = await updateUserRoleToDatabase(
          userRoleToHighlight,
          userRoleId
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setSelectRoleNull(false);
    const fetchData = async () => {
      setUserRoleId([]);
      getRoles();
      getUsers();
    };
    fetchData();
    return () => {};
  }, [userRoleToHighlight]);

  return (
    <section className="mx-5 mt-8 bg-gray-800 p-4 rounded-lg py-4">
      {selectRoleNull && (
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
              <span>Please select a role</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="roleSearch"
              value={roleQuery}
              onChange={(e) => handleRoleSearch(e)}
              placeholder="Search Roles ..."
              className="bg-white text-black rounded-md py-1 px-2 w-full"
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {rolesList && (
                <div>
                  {rolesList.map((data, key) => {
                    let highlight = "";
                    if (userRoleToHighlight == data.user_role_id) {
                      highlight = "text-green-500";
                    } else {
                      highlight = "";
                    }
                    return (
                      <div key={key}>
                        <div
                          onClick={() => handleUserRole(data.user_role_id)}
                          className={highlight}
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

        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="roleUsers"
              value={roleUserQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleRoleUserSearch(e)}
              placeholder="Search Users ..."
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {userRoleToHighlight && (
                <div>
                  {users && (
                    <div>
                      {users.map((data, key) => {
                        const filteredData = userRoleId.filter(
                          (data2) => data2 === data.user_id
                        );
                        // console.log(userRoleId);

                        if (filteredData.length > 0) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleUserRemoveFromRole(data.user_id)
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
              {userRoleToHighlight && (
                <div className="">
                  {allUsers && (
                    <div className="w-full">
                      {allUsers.map((data, key) => {
                        const isUserPresent = userRoleId.some(
                          (data2) => data2 === data.user_id
                        );

                        if (!isUserPresent) {
                          return (
                            <div
                              key={key}
                              onClick={() => handleUserAddToRole(data.user_id)}
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

export default UMSAssignRoles;
