import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSCreatePages = () => {
  const [LastComponentId, setLastComponentId] = useState("");
  const [formData, setFormData] = useState({
    component_name: "",
    file_name: "",
    folder_name: "",
    page_url: "",
  });

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

  const fetchLastComponentId = async () => {
    try {
      const componentResponse = await axios.post(
        `http://${server_port}:4000/api/pages/retrieveLastComponentId`
      );
      if (componentResponse.data.rowCount > 0) {
        console.log(componentResponse.data.rows[0]);
        setLastComponentId(parseInt(componentResponse.data.rows[0].pages_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLastComponentId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    const newComponentId = parseInt(LastComponentId);
    newComponentId + 1;
    try {
      const componentResponse = await axios.post(
        `http://${server_port}:4000/api/pages/createComponent`,
        { formData, LastComponentId: LastComponentId + 1 }
      );
      if (componentResponse.data.rowCount > 0) {
        setSuccess("Successfully Added");
      } else {
        setError("Some error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <div className="mx-5 mt-8 bg-gray-800">
    <div className="mx-5 mt-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 border border-black p-2">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-center">
              {" "}
              CREATE COMPONENT = {LastComponentId + 1}
            </div>
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="component_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Component name
                </label>
                <input
                  type="text"
                  name="component_name"
                  id="component_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.component_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="file_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  File name
                </label>
                <input
                  type="text"
                  name="file_name"
                  id="file_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.file_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="folder_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Folder Name
                </label>
                <input
                  type="text"
                  name="folder_name"
                  id="folder_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.folder_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="page_url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pages Url
                </label>
                <input
                  type="text"
                  name="page_url"
                  id="page_url"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.page_url}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border border-black text-black"
              >
                Create Component
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMSCreatePages;
