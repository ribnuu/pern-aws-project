import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersApi } from "../../apis/RightsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSAssignWorkStationUser = () => {
  //Set User and Unchanged User for filtering and user query for search
  const [userList, setUserList] = useState([]);
  const [unchangedUserList, setUnchangedUserList] = useState([]);
  const [userQuery, setUserQuery] = useState("");

  // Stores the users , workstation
  const [userNewWorkstationId, setNewWorkStationId] = useState([]);

  //Handle worstation users and filter workstation users

  const [workstationUserQuery, setWorkstaionUserQuery] = useState("");

  //Handle all Users and filter all users
  const [workstation, setWorkstation] = useState([]);
  const [unChangedWorkstation, setUnchangedWorkstation] = useState([]);
  const [allWorkstatiosQuery, setAllWorkStationsQuery] = useState([]);

  const [userToHighlight, setUserToHighlight] = useState(1);

  const [allWorkstation, setAllWorkStation] = useState([]);

  const [nullWorkStationUser, setNullWorkStationUser] = useState([]);

  const [selectRoleNull, setSelectRoleNull] = useState(false);

  // Select the user

  const handleUserSearch = (event) => {
    const getUserSearch = event.target.value;
    if (getUserSearch.length > 0) {
      const searchData = unchangedUserList.filter((item) =>
        item.username.toLowerCase().includes(getUserSearch)
      );
      setUserList(searchData);
    } else {
      setUserList(unchangedUserList);
    }
    setUserQuery(getUserSearch);
  };

  const handleAllWorkstationSearch = (event) => {
    const getAllWorkStationSearch = event.target.value;
    if (getAllWorkStationSearch.length > 0) {
      const searchData = unChangedWorkstation.filter((item) =>
        item.username.toLowerCase().includes(getAllWorkStationSearch)
      );
      setAllWorkStation(searchData);
    } else {
      setAllWorkStation(unChangedWorkstation);
    }
    setAllWorkStationsQuery(getAllWorkStationSearch);
  };
  const handleWorkStationUserSearch = (event) => {
    const getRoleUserSearch = event.target.value;
    if (getRoleUserSearch.length > 0) {
      const searchData = unChangedWorkstation.filter((item) =>
        item.username.toLowerCase().includes(getRoleUserSearch)
      );
      setWorkstation(searchData);
    } else {
      setWorkstation(unChangedWorkstation);
    }
    setWorkstaionUserQuery(getRoleUserSearch);
  };

  const handleUser = (role_id) => {
    setUserToHighlight(role_id);
  };
  const handleWorkstationAddToUser = (workstation_id) => {
    if (userNewWorkstationId.includes(workstation_id)) {
      setNewWorkStationId((userNewWorkstationId) =>
        userNewWorkstationId.filter((id) => id !== workstation_id)
      );
    } else {
      setNewWorkStationId((userNewWorkstationId) => [
        ...userNewWorkstationId,
        workstation_id,
      ]);
    }
  };

  const handleWorkStationRemoveFromUser = (user_id) => {
    if (userNewWorkstationId.includes(user_id)) {
      setNewWorkStationId(
        userNewWorkstationId.filter((item) => item !== user_id)
      );
      if (!nullWorkStationUser.includes(user_id)) {
        setNullWorkStationUser((nullWorkStationUser) => [
          ...nullWorkStationUser,
          user_id,
        ]);
      } else {
        setNullWorkStationUser((nullWorkStationUser) =>
          nullWorkStationUser.filter((id) => id !== user_id)
        );
      }
    }
  };

  const handleAllWorkstation = (workstation_id) => {
    console.log(workstation_id);
    if (!userNewWorkstationId.includes(workstation_id)) {
      console.log("Add " + workstation_id);
      handleWorkstationAddToUser(workstation_id);
    } else {
      console.log("Remove " + workstation_id);
      handleWorkStationRemoveFromUser(workstation_id);
    }
  };

  const insertWorkStationToUser = async (user_id, workstations) => {
    try {
      const workStationUserUpdateResponse = await axios.post(
        `http://${server_port}:4000/api/user/insertWorkStationUserByUserAndWorkStationId`,
        {
          user_id,
          workstations,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserToNullToDatabase = async (user_id, workstations) => {
    try {
      const updateUserRoleByUserIdToNull = await axios.post(
        `http://${server_port}:4000/api/user/updateWorkStationUserByUserAndWorkStationIdToNull`,
        {
          user_id,
          workstations,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const rolesResponse = await getUsersApi();
      // setTestOne(rolesResponse);
      if (rolesResponse.rowCount > 0) {
        rolesResponse.rows.user_role_name;
      }
      setUnchangedUserList(rolesResponse.rows);
      setUserList(rolesResponse.rows);
    } catch (error) {
      console.error(error);
    }
  };

  const getWorkstations = async () => {
    try {
      const workStationResponse = await axios.post(
        `http://${server_port}:4000/api/user/getWorkstations`
      );
      // setTestTwo(userResponse);

      if (workStationResponse.data.rowCount > 0) {
        setAllWorkStation(workStationResponse.data.rows);
        setWorkstation(workStationResponse.data.rows);
        setUnchangedWorkstation(workStationResponse.data.rows);
      } else {
        setNewWorkStationId([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addUserToArray = (workstation_id) => {
    setNewWorkStationId((userNewWorkstationId) => [
      ...userNewWorkstationId,
      workstation_id,
    ]);
  };

  const getWorkstationsByUserId = async () => {
    const user_id = userToHighlight;
    const workStationUserResponse = await axios.post(
      `http://${server_port}:4000/api/user/getWorkstationsByUserId`,
      {
        user_id,
      }
    );
    if (workStationUserResponse.data.rowCount > 0) {
      workStationUserResponse.data.rows.forEach((element) => {
        if (userToHighlight == element.user_id) {
          addUserToArray(element.workstation_id);
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectRoleNull(false);
    if (userToHighlight == "") {
      setSelectRoleNull(true);
    } else {
      try {
        setNewWorkStationId([]);
        setUserToHighlight("");

        // A bug. This nullWorkStationUser Array id needs to be removed if he moves to the roleUser Array
        // // Needs to be tested
        const r2 = await updateUserToNullToDatabase(
          userToHighlight,
          nullWorkStationUser
        );
        const r1 = await insertWorkStationToUser(
          userToHighlight,
          userNewWorkstationId
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("------------------------------------------");
    setSelectRoleNull(false);
    setNewWorkStationId([]);

    getUsers();
    getWorkstations();
    getWorkstationsByUserId();
  }, [userToHighlight]);

  return (
    // <div className="mx-5 mt-8 bg-gray-800 p-4 rounded-lg py-4">
    <div className="mx-5 mt-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 border border-black p-2">
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
              <span>Please select an user</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="search"
              name="roleSearch"
              value={userQuery}
              onChange={(e) => handleUserSearch(e)}
              placeholder="Search Users ..."
              className="bg-white text-black rounded-md py-1 px-2 w-full"
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {userList && (
                <div>
                  {userList.map((data, key) => {
                    let highlight = "";
                    if (userToHighlight == data.user_id) {
                      highlight = "text-green-500";
                    } else {
                      highlight = "";
                    }
                    return (
                      <div key={key}>
                        <div
                          onClick={() => handleUser(data.user_id)}
                          className={highlight}
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

        <div className="bg-gray-200 rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="workstationUser"
              value={workstationUserQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleWorkStationUserSearch(e)}
              placeholder="Search Workstations ..."
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {userToHighlight && (
                <div>
                  {workstation && (
                    <div>
                      {workstation.map((data, key) => {
                        const filteredData = userNewWorkstationId.filter(
                          (data2) => data2 === data.workstation_id
                        );

                        if (filteredData.length > 0) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleWorkStationRemoveFromUser(
                                  data.workstation_id
                                )
                              }
                            >
                              {data.workstation_name}
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

        <div className="bg-gray-200 rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="items-center mx-2 mt-2">
            <input
              type="text"
              name="allWorkstation"
              value={allWorkstatiosQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleAllWorkstationSearch(e)}
              placeholder="Search Workstation ..."
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {userToHighlight && (
                <div className="">
                  {allWorkstation && (
                    <div className="w-full">
                      {allWorkstation.map((data, key) => {
                        const isUserPresent = userNewWorkstationId.some(
                          (data2) => data2 === data.workstation_id
                        );

                        if (!isUserPresent) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleWorkstationAddToUser(data.workstation_id)
                              }
                              // onLoad={() => addUserToArray(data.workstation_id)}
                            >
                              {data.workstation_name}
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
    </div>
  );
};

export default UMSAssignWorkStationUser;
