import React, { useEffect, useState } from "react";
import UMSAssignGroup from "./AssignGroup/UMSAssignGroup";
import UMSCreateWorkstation from "./UMSCreateWorkStation";
import UMSCreateRoles from "./CreateRoles/UMSCreateRoles";
import UMSCreateGroup from "./UMSCreateGroup";
import UMSAssignWorkStationUser from "./UMSAssignWorkStationUser";
import UMSassignPoliceStationWorkStation from "./UMSassignPoliceStationWorkStation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UMSCreatePages from "./UMSCreatePages";
import UMSCreateButtons from "./UMSCreateButtons";
import AssignRightsTreeView from "./AssignRightsTreeView/AssignRightsTreeView";
import UMSRegister from "./CreateUser/UMSRegister";
import { Toaster } from "react-hot-toast";
// import UMSAssignRolesToTheGroup from "./AssignRolesToTheGroup/assignRolesToTheGroup";
// import UMSAssignRights from "./UMSAssignRights";
// import UMSAssignRoles from "./UMSAssignRoles";

const UserManagementSystem = () => {
  const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
  const component_id = "1004000000000004";

  const navigate = useNavigate();

  // New Implementation
  const [state, setState] = useState({
    createUser: false,
    assignRoles: false,
    assignGroup: false,
    createWorkstation: false,
    createRoles: false,
    createGroups: false,
    assignWorkStationToUser: false,
    assignWorkStationToPoliceStation: false,
    assignRights: false,
    assignRightsTreeView: false,
    createPages: false,
    createButtons: false,
    assignRolesToTheGroup: false,
  });

  function handleToggle(key) {
    setState((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: k === key ? !prev[k] : false }),
        {}
      ),
    }));
  }

  const getRightsOfUser = async (user_id) => {
    const userRightsResponse = await axios.post(
      `http://${server_port}:4000/api/rights/getUserRightsByUserId`,
      {
        user_id: user_id,
        component_id,
      }
    );
    let userAccess = userRightsResponse.data.rowCount;

    if (!userAccess > 0) {
      navigate("/1192");
    } else {
      console.log("User has access");
    }
  };

  useEffect(() => {
    let user_id = localStorage.getItem("user_id");
    getRightsOfUser(user_id);
  });

  return (
    <>
      {/* <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12 uppercase"> */}
      <div className="mx-5 grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <button
          className={`${
            state.createUser
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createUser")}
        >
          Create User
        </button>
        {/* <button
          className={`${
            state.assignRoles
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignRoles")}
        >
          Assign Roles
        </button> */}
        <button
          className={`${
            state.assignGroup
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignGroup")}
        >
          Assign Group And Role
        </button>
        <button
          className={`${
            state.createWorkstation
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createWorkstation")}
        >
          Create WorkStation
        </button>
        <button
          className={`${
            state.createRoles
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createRoles")}
        >
          Create Roles
        </button>
        <button
          className={`${
            state.createGroups
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createGroups")}
        >
          Create Group
        </button>
        <button
          className={`${
            state.assignWorkStationToPoliceStation
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignWorkStationToPoliceStation")}
        >
          Assign Police Station - Workstation
        </button>
        <button
          className={`${
            state.assignWorkStationToUser
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignWorkStationToUser")}
        >
          Assign Work Station - User
        </button>
        <button
          className={`${
            state.assignRights
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignRights")}
        >
          Assign Rights
        </button>
        <button
          className={`${
            state.assignRightsTreeView
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignRightsTreeView")}
        >
          Assign Rights - Tree View
        </button>
        <button
          className={`${
            state.createPages
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createPages")}
        >
          CREATE PAGES
        </button>
        <button
          className={`${
            state.createButtons
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("createButtons")}
        >
          CREATE BUTTONS
        </button>
        {/* <button
          className={`${
            state.assignRolesToTheGroup
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("assignRolesToTheGroup")}
        >
          Assign roles to the group - Pending Development
        </button> */}
      </div>

      <div>{state.createUser && <UMSRegister />}</div>
      {/* <div>{state.assignRoles && <UMSAssignRoles />}</div> */}
      <div>{state.assignGroup && <UMSAssignGroup />}</div>
      <div>{state.createWorkstation && <UMSCreateWorkstation />}</div>
      <div>{state.createRoles && <UMSCreateRoles />}</div>
      <div>{state.createGroups && <UMSCreateGroup />}</div>
      <div>{state.assignWorkStationToUser && <UMSAssignWorkStationUser />}</div>
      <div>
        {state.assignWorkStationToPoliceStation && (
          <UMSassignPoliceStationWorkStation />
        )}
      </div>
      {/* <div>{AssignRights && <UMSAssignRights />}</div> */}
      <div>{state.assignRightsTreeView && <AssignRightsTreeView />}</div>
      <div>{state.createPages && <UMSCreatePages />}</div>
      <div>{state.createButtons && <UMSCreateButtons />}</div>
      {/* <div>{state.assignRolesToTheGroup && <UMSAssignRolesToTheGroup />}</div> */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default UserManagementSystem;
