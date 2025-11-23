import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

//
//      This entire page needs to be renamed from roles to group
//

const UMSassignPoliceStationWorkStation = () => {
  // Handle roles and filter roles
  const [policeStationList, setPoliceStationList] = useState([]);
  const [unChangedPoliceStationList, setUnchangedPoliceStationList] = useState(
    []
  );
  const [roleQuery, setStationQuery] = useState("");

  //Handle role users and filter roles users
  const [roleUserQuery, setRoleUserQuery] = useState("");

  // Work Stations List to Update
  const [workStationPoliceStation, setWorkStationPoliceStation] = useState([]);

  const [workstation, setWorkstation] = useState([]);
  const [unchangedWorkStations, setUnchangedWorkStations] = useState([]);
  const [workStationQuery, setWorkstationQuery] = useState([]);

  const [policeStationToHighlight, setPoliceStationToHighlight] =
    useState(1004000000000001);

  const [allWorkStation, setAllWorkStation] = useState([]);

  const [nullWorkStation, setNullWorkStation] = useState([]);

  //Handle all Users and filter all users
  const [allUsersQuery, setAllUsersQuery] = useState([]);

  // Error Message
  const [selectRoleNull, setSelectRoleNull] = useState(false);

  const handlePoliceStationSearch = (event) => {
    const getPoliceStationSearch = event.target.value;
    if (getPoliceStationSearch.length > 0) {
      const searchData = unChangedPoliceStationList.filter((item) =>
        item.police_station_name.toLowerCase().includes(getPoliceStationSearch)
      );
      setPoliceStationList(searchData);
    } else {
      setPoliceStationList(unChangedPoliceStationList);
    }
    setStationQuery(getPoliceStationSearch);
  };

  // This needs to changes should check on name or id? or both?
  //
  const handleAllWorkStationSearch = (event) => {
    const getAllUsersSearch = event.target.value;
    if (getAllUsersSearch.length > 0) {
      const searchData = unchangedWorkStations.filter((item) =>
        item.username.toLowerCase().includes(getAllUsersSearch)
      );
      setAllUsers(searchData);
    } else {
      setAllUsers(unchangedWorkStations);
    }
    setAllUsersQuery(getAllUsersSearch);
  };

  const handleRoleUserSearch = (event) => {
    const getRoleUserSearch = event.target.value;
    if (getRoleUserSearch.length > 0) {
      const searchData = unchangedWorkStations.filter((item) =>
        item.username.toLowerCase().includes(getRoleUserSearch)
      );
      setUsers(searchData);
    } else {
      setUsers(unchangedWorkStations);
    }
    setRoleUserQuery(getRoleUserSearch);
  };

  const handleStation = (police_station_id) => {
    // This function chooses the police station
    setPoliceStationToHighlight(police_station_id);
  };

  const handleWorkstationAddToStation = (workstation_id) => {
    if (workStationPoliceStation.includes(workstation_id)) {
      setWorkStationPoliceStation((workStationPoliceStation) =>
        workStationPoliceStation.filter((id) => id !== workstation_id)
      );
    } else {
      setWorkStationPoliceStation((workStationPoliceStation) => [
        ...workStationPoliceStation,
        workstation_id,
      ]);
    }
  };

  const handleWorkstationRemoveFromStation = (workstation_id) => {
    if (workStationPoliceStation.includes(workstation_id)) {
      setWorkStationPoliceStation(
        workStationPoliceStation.filter((item) => item !== workstation_id)
      );
      if (!nullWorkStation.includes(workstation_id)) {
        setNullWorkStation((nullWorkStation) => [
          ...nullWorkStation,
          workstation_id,
        ]);
      } else {
        setNullWorkStation((nullWorkStation) =>
          nullWorkStation.filter((id) => id !== workstation_id)
        );
      }
    }
  };

  const handleAllWorkstation = (workstation_id) => {
    if (!workStationPoliceStation.includes(workstation_id)) {
      handleWorkstationAddToStation(workstation_id);
    } else {
      handleWorkstationRemoveFromStation(workstation_id);
    }
  };

  const updateWorkStationToDatabase = async (
    police_station_id,
    workstations
  ) => {
    try {
      const userRoleUpdateResponse = await axios.post(
        `http://${server_port}:4000/api/user/updatePoliceStationByWorkStationId`,
        {
          police_station_id: police_station_id,
          workstation_id: workstations,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateWorkStationToNullToDatabase = async (workstations) => {
    try {
      const updateUserRoleByUserIdToNull = await axios.post(
        `http://${server_port}:4000/api/user/updatePoliceStationByWorkstationIdToNull`,
        {
          workstation_id: workstations,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getPoliceStations = async () => {
    try {
      const groupResponse = await axios.get(
        `http://${server_port}:4000/police/master-police/viewStation`
      );
      // setTestOne(rolesResponse);
      if (groupResponse.data.rowCount > 0) {
        setUnchangedPoliceStationList(groupResponse.data.rows);
        setPoliceStationList(groupResponse.data.rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWorkstations = async () => {
    try {
      const workStationResponse = await axios.post(
        `http://${server_port}:4000/api/user/getWorkStations`
      );
      if (workStationResponse.data.rowCount > 0) {
        workStationResponse.data.rows.forEach((element) => {
          if (policeStationToHighlight == element.police_station_id) {
            // This function checks whether the workstation is assigned for the selected police station
            handleAllWorkstation(element.workstation_id);
          }
        });
        setAllWorkStation(workStationResponse.data.rows);
        setWorkstation(workStationResponse.data.rows);
        setUnchangedWorkStations(workStationResponse.data.rows);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectRoleNull(false);
    if (policeStationToHighlight == "") {
      setSelectRoleNull(true);
    } else {
      try {
        setPoliceStationToHighlight("");

        // // Needs to be tested
        //On this page the UMSAssignRole was copied. So not sure if the bug persists
        const r2 = await updateWorkStationToNullToDatabase(nullWorkStation);
        const r1 = await updateWorkStationToDatabase(
          policeStationToHighlight,
          workStationPoliceStation
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    setSelectRoleNull(false);
    const fetchData = async () => {
      setWorkStationPoliceStation([]);
      getPoliceStations();
      getWorkstations();
    };
    fetchData();
    return () => {};
  }, [policeStationToHighlight]);

  return (
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
              <span>Please select a group</span>
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
              value={roleQuery}
              onChange={(e) => handlePoliceStationSearch(e)}
              placeholder="Search Police Station ..."
              className="bg-white text-black rounded-md py-1 px-2 w-full"
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {policeStationList && (
                <div>
                  {policeStationList.map((data, key) => {
                    let highlight = "";
                    if (policeStationToHighlight == data.police_station_id) {
                      highlight = "text-green-500";
                    } else {
                      highlight = "";
                    }
                    return (
                      <div key={key}>
                        <div
                          onClick={() => handleStation(data.police_station_id)}
                          className={highlight}
                        >
                          {data.police_station_name}
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
              name="roleUsers"
              value={roleUserQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleRoleUserSearch(e)}
              placeholder="Search Workstation ..."
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="grid grid-cols-1">
              {policeStationToHighlight && (
                <div>
                  {workstation && (
                    <div>
                      {workstation.map((data, key) => {
                        const filteredData = workStationPoliceStation.filter(
                          (data2) => data2 === data.workstation_id
                        );

                        if (filteredData.length > 0) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleWorkstationRemoveFromStation(
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
              name="allUsers"
              value={allUsersQuery}
              className="bg-white text-black rounded-md py-1 px-2 w-full"
              onChange={(e) => handleAllWorkStationSearch(e)}
              placeholder="Search Workstation ..."
            />
          </div>
          <div className="px-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div className="">
              {allWorkStation && (
                <div className="">
                  {allWorkStation && (
                    <div className="w-full">
                      {allWorkStation.map((data, key) => {
                        const isUserPresent = workStationPoliceStation.some(
                          (data2) => data2 === data.workstation_id
                        );

                        if (!isUserPresent) {
                          return (
                            <div
                              key={key}
                              onClick={() =>
                                handleWorkstationAddToStation(
                                  data.workstation_id
                                )
                              }
                              onLoad={() =>
                                handleAllWorkstation(data.workstation_id)
                              }
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

export default UMSassignPoliceStationWorkStation;
