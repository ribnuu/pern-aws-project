import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const UMSCreateWorkstation = () => {
  const [workstationName, setWorkstationName] = useState([]);
  const [workstationId, setWorkstationId] = useState([]);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [workStationLastId, setWorkStationLastId] = useState("");

  const fetchLastWorkStationId = async () => {
    const lastWorkStationResponse = await axios.post(
      `http://${server_port}:4000/api/user/retrieveLastWorkstationRecord`
    );
    setWorkStationLastId(
      parseInt(lastWorkStationResponse.data.rows[0].workstation_id)
    );
  };

  useEffect(() => {
    fetchLastWorkStationId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const idToSend = workStationLastId + 1;
    try {
      const registerResponse = await axios.post(
        `http://${server_port}:4000/api/user/createWorkstation`,
        { workstationName, idToSend }
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
    <div className="mx-5 mt-8">
      <div className="bg-white rounded-lg shadow dark:border dark:bg-gray-800 border border-black p-2">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
              {success && <p className="text-green-500">{success}</p>}
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="workstation_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Work Station Id
                </label>
                <input
                  type="text"
                  name="workstation_id"
                  id="workstation_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  placeholder="2000 0000 0000 0001"
                  value={workStationLastId + 1}
                  onChange={() => setWorkstationId(workStationLastId + 1)}
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="workstation_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Work Station Name
                </label>
                <input
                  type="text"
                  name="workstation_name"
                  id="workstation_name"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={workstationName}
                  onChange={(e) => setWorkstationName(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-white"
              >
                Create Workstation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMSCreateWorkstation;
