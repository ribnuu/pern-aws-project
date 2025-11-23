import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { crateRoleApi } from "../../../apis/RoelsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSCreateRoles = () => {
  const [formData, setFormData] = useState({
    role_name: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      const registerResponse = await crateRoleApi({ formData });
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
    <section className="mx-5 mt-8 bg-gray-800">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="role_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  name="role_name"
                  id="role_name"
                  placeholder="Enter Role Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.role_name}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-white"
              >
                Create Role
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UMSCreateRoles;
