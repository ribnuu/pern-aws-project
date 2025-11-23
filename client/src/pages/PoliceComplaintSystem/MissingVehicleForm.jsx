import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MissingVehicleForm = () => {
  const [Message, setMessage] = useState("");

  const initialFormData = {
    missing_vehicle_number: "",
    missing_vehicle_make: "",
    missing_vehicle_model: "",
    missing_vehicle_owner_name: "",
    missing_vehicle_owner_address: "",
    lost_date_time: "",
    last_seen_date_time: "",
    last_seen_location: "",
    reported_nic_number: "",
    missing_vehicle_description: "",
    complaint_number: "",
  };
  const [formVehicleData, setformVehicleData] = useState(initialFormData);

  const [LastMissingVehicleId, setLastMissingVehicleId] = useState("");

  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setformVehicleData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NewComplaintId = LastMissingVehicleId + 1;

    try {
      const insertPersonResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/missingVehicle`,
        {
          formVehicleData,
          NewComplaintId,
        }
      );
      if (insertPersonResponse.data.rowCount > 0) {
        setMessage("Missing Vehicle Complaint Added Successfully");
      }
      setformVehicleData(initialFormData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastMissingVehicleId = async () => {
    const lastMissingNumberResponse = await axios.post(
      `http://${server_port}:4000/api/complaint/retrieveLastMissingVehicleRecord`
    );
    setLastMissingVehicleId(
      parseInt(lastMissingNumberResponse.data.rows[0].missing_vehicle_number_id)
    );
  };

  useEffect(() => {
    fetchLastMissingVehicleId();
  }, []);

  return (
    <section className="mx-12 my-12">
      <div className="bg-white px-2 py-1">
        {Message && <div className="text-blue-500">{Message}</div>}
        <div className="text-center">Missing Vehicle Complaint</div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group rounded-lg">
            <label
              htmlFor="workstation_id"
              className="block mb-2 text-sm font-medium text-gray-900 px-1"
            >
              Complaint Number
            </label>
            <input
              type="text"
              name="complaint_id"
              id="complaint_id"
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer rounded-lg px-4 bg-purple-500"
              placeholder=" "
              value={LastMissingVehicleId + 1}
              disabled
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_number"
              id="missing_vehicle_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_number}
            />
            <label
              htmlFor="missing_vehicle_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Missing Vehicle Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_owner_name"
              id="missing_vehicle_owner_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_owner_name}
            />
            <label
              htmlFor="missing_vehicle_owner_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Missing Vehicle Owner Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_owner_address"
              id="missing_vehicle_owner_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_owner_address}
            />
            <label
              htmlFor="missing_vehicle_owner_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Missing Vehicle Owner Address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_make"
              id="missing_vehicle_make"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_make}
            />
            <label
              htmlFor="missing_vehicle_make"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Missing Vehicle Make
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_model"
              id="missing_vehicle_model"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_model}
            />
            <label
              htmlFor="missing_vehicle_model"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Missing Vehicle Model
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="last_seen_location"
              id="last_seen_location"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.last_seen_location}
            />
            <label
              htmlFor="last_seen_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last seen location
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="last_seen_date_time"
              id="last_seen_date_time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.last_seen_date_time}
            />
            <label
              htmlFor="last_seen_date_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last seen date & time
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="lost_date_time"
              id="lost_date_time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.lost_date_time}
            />
            <label
              htmlFor="lost_date_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Lost date & time
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="reported_nic_number"
              id="reported_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.reported_nic_number}
            />
            <label
              htmlFor="reported_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Reported By
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="missing_vehicle_description"
              id="missing_vehicle_description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formVehicleData.missing_vehicle_description}
            />
            <label
              htmlFor="missing_vehicle_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description Of the missing Vehicle
            </label>
          </div>

          <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <GrAdd className="my-auto" />
              Report Incident
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MissingVehicleForm;
