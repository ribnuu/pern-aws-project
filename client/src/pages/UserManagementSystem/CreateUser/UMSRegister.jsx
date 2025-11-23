import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchableSingleAndMultiSelectDropDown from "../SearchableSingleAndMultiSelectDropDown/SearchableSingleAndMultiSelectDropDown";
import { getAllGroupsApi } from "../../../apis/GroupApiService";
import {
  getAllRolesApi,
  getAllRolesByGroupIdApi,
} from "../../../apis/RoelsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSRegister = () => {
  const initialFormData = {
    username: "",
    password: "",
    role_id: 5,
    group_id: 8,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [rolesData, setRolesData] = useState([]);
  const [groupData, setGroupData] = useState([]);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleChangeSearchableSingleAndMultiSelectDropDown = (label, value) => {
  //   setError("");
  //   setSuccess("");
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [label]: value,
  //   }));
  // };

  // const [groups, setGroups] = useState([]);
  // const [roles, setRoles] = useState([]);
  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await getAllGroupsApi();
  //       if (response && response.data) {
  //         setGroups(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching pages:", error);
  //     }
  //   };

  //   fetchGroups();

  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await getAllRolesByGroupIdApi(
  //         parseInt(formData.group_id)
  //       );
  //       if (response && response.data) {
  //         setRoles(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching roles:", error);
  //     }
  //   };

  //   fetchRoles();

  //   return () => {};
  // }, [formData.group_id]);

  const fetchUserRoles = async () => {
    try {
      const RolesResponse = await getAllRolesApi();
      if (RolesResponse.rowCount > 0) {
        setRolesData(RolesResponse.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserGroup = async () => {
    try {
      const groupResponse = await getAllGroupsApi();
      if (groupResponse.rowCount > 0) {
        setGroupData(groupResponse.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserRoles();
    fetchUserGroup();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      const registerResponse = await axios.post(
        `http://${server_port}:4000/api/user/register`,
        { formData }
      );
      if (registerResponse.data.success === true) {
        setSuccess(registerResponse.data.msg);
      } else {
        setError(registerResponse.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mx-5 mt-8 text-black">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {/* Group Selection */}
              {/* <div className="flex flex-wrap justify-center gap-12">
                  <div>
                    <label
                      htmlFor="group"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose Group
                    </label>
                    <SearchableSingleAndMultiSelectDropDown
                      items={groups}
                      label={"Select group"}
                      multipleSelect={false}
                      onSelectionChange={(values) => {
                        handleChangeSearchableSingleAndMultiSelectDropDown(
                          "group_id",
                          values[0]
                        );
                      }}
                      searchPlaceholder="Search group"
                      labelKey="user_group_name"
                      valueKey="user_group_id"
                    />
                    <select
                      id="group"
                      className="select select-bordered w-full bg-gray-700"
                      name="group_id"
                      value={formData.group}
                      onChange={handleChange}
                    >
                      <option selected="">Select Group</option>
                      {groupData.map((data, key) => {
                        return (
                          <option value={data.user_group_id} key={key}>
                            {data.user_group_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose Role
                    </label>
                    <SearchableSingleAndMultiSelectDropDown
                      items={roles}
                      label={"Select role"}
                      multipleSelect={false}
                      onSelectionChange={(values) => {
                        handleChangeSearchableSingleAndMultiSelectDropDown(
                          "role_id",
                          values[0]
                        );
                      }}
                      searchPlaceholder="Search role"
                      labelKey="user_role_name"
                      valueKey="user_role_id"
                    />
                    <select
                      id="role"
                      className="select select-bordered w-full bg-gray-700"
                      name="role_id"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option selected="">Select Role</option>
                      {rolesData.map((data, key) => {
                        return (
                          <option value={data.user_role_id} key={key}>
                            {data.user_role_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div> */}

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-white"
              >
                Create User
              </button>

              <p className="text-xs text-blue-500">
                NOTE: When a user is created through this screen, the particular
                user is automatically assigned with the GROUP - General Public
                (8), ROLE - Citizen (5). If additional groups to be added, it is
                done via Assign Group Role section under UMS
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UMSRegister;
