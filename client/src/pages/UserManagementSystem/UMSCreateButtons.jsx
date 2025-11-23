import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComponentsApi } from "../../apis/RightsApiService";
import { createButtonApi } from "../../apis/CccMasterButtonsApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSCreatePages = () => {
  const [LastComponentId, setLastComponentId] = useState("");
  const [formData, setFormData] = useState({
    button_display_name: "",
    button_function_name: "",
    component_pages_id: "",
    button_routes: "",
  });

  const navigate = useNavigate();
  const [componentData, setComponentData] = useState([]);
  const [LastButtonId, setLastButtonId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchComponents = async () => {
    try {
      const ComponentResponse = await getComponentsApi();
      if (ComponentResponse.rowCount > 0) {
        setComponentData(ComponentResponse.rows);
        console.log(ComponentResponse.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastButtonId = async () => {
    try {
      const LastButtonIdResponse = await axios.post(
        `http://${server_port}:4000/api/pages/retrieveLastButtonId`
      );
      setLastButtonId(
        parseInt(LastButtonIdResponse.data.rows[0].ccc_master_buttons_id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComponents();
    fetchLastButtonId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(formData);
    try {
      const componentResponse = await createButtonApi({
        formData,
        LastButtonId: LastButtonId + 1,
      });
      if (componentResponse && componentResponse?.rows?.length > 0) {
        setSuccess("Successfully Added");
      } else {
        setError("Some error");
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
            <div className="text-center">
              {" "}
              CREATE BUTTON - {LastButtonId + 1}
            </div>
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="button_display_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Button Display Name
                </label>
                <input
                  type="text"
                  name="button_display_name"
                  id="button_display_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.button_display_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="button_function_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Button Function Name
                </label>
                <input
                  type="text"
                  name="button_function_name"
                  id="button_function_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.button_function_name}
                  onChange={handleChange}
                />
              </div>
              {/* Group Selection */}
              <div className="flex flex-wrap justify-center gap-12">
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose Component
                  </label>
                  <select
                    id="role"
                    className="select select-bordered w-full  "
                    name="component_pages_id"
                    value={formData.component_pages_id}
                    onChange={handleChange}
                    required
                  >
                    <option selected="">Select Component</option>
                    {componentData.map((data, key) => {
                      return (
                        <option value={data.pages_id} key={key}>
                          {data.component_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="button_routes"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Button Routes
                </label>
                <input
                  type="text"
                  name="button_routes"
                  id="button_routes"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.button_routes}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full border border-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Buttons
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UMSCreatePages;
