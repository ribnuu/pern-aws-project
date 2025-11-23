import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllGroupsApi } from "../../../apis/GroupApiService";
import SearchableSingleAndMultiSelectDropDown from "../SearchableSingleAndMultiSelectDropDown/SearchableSingleAndMultiSelectDropDown";
import { crateRoleApi } from "../../../apis/RoelsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSCreateRoles = () => {
  const initialFormData = {
    role_name: "",
    group_id: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [groups, setGroups] = useState([]);
  const handleSelectionChange = (checkedItems) => {
    setError("");
    setSuccess("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      group_id: parseInt(checkedItems[0]),
    }));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getAllGroupsApi();
        if (response && response.data) {
          setGroups(response.data);
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchGroups();

    return () => {};
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setError("");
    setLoading(true);
    try {
      const registerResponse = await crateRoleApi({ formData });
      if (registerResponse.data.success === true) {
        setSuccess(registerResponse.data.msg);
      } else {
        setError(registerResponse.data.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
      setFormData(initialFormData);
    }
  };

  return (
    <section className="mx-5 mt-8 text-black">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="role_name"
                  className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group
                </label>
                <SearchableSingleAndMultiSelectDropDown
                  items={groups}
                  label={"Select a group first"}
                  multipleSelect={false}
                  onSelectionChange={handleSelectionChange}
                  searchPlaceholder="Search group"
                  labelKey="user_group_name"
                  valueKey="user_group_id"
                />
              </div>
              <div>
                <label
                  htmlFor="role_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role Name
                </label>
                <input
                  disabled={!formData.group_id || formData.group_id === ""}
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
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {loading ? "Saving" : "Create Role"}
              </button>

              {/* <button
                disabled={loading}
                type="submit"
                className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left"
              >
                Create Role
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UMSCreateRoles;
