import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AssaultForm = () => {
  const [Message, setMessage] = useState("");
  const initialForm = {
    victim_nic_number: "",
    assaulter_nic_number: "",
    assault_date_time: "",
    assault_location: "",
    complaint_number: "",
  };
  const [formNicData, setFormNicData] = useState(initialForm);
  const [LastAssaultId, setLastAssaultId] = useState("");

  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setFormNicData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NewComplaintId = LastAssaultId + 1;
    try {
      const insertAssaultResponse = await axios.post(
        `http://${server_port}:4000/api/complaint/assault`,
        {
          formNicData,
          NewComplaintId,
        }
      );
      if (insertAssaultResponse.data.rowCount > 0) {
        setMessage("Assault Complaint Added Successfully");
      }
      setFormNicData(initialForm);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLastAssaultId = async () => {
    const lastAssaultResponse = await axios.post(
      `http://${server_port}:4000/api/complaint/retrieveLastAssaultRecord`
    );
    setLastAssaultId(
      parseInt(lastAssaultResponse.data.rows[0].police_complaint_assault_id)
    );
  };

  useEffect(() => {
    fetchLastAssaultId();
  }, []);
  return (
    <section className="mx-12 my-12">
      <div className="bg-white px-2 py-1">
        {Message && <div className="text-blue-500">{Message}</div>}
        <div className="text-center">Assault Complaint</div>
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
              value={LastAssaultId + 1}
              disabled
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="victim_nic_number"
              id="victim_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formNicData.victim_nic_number}
            />
            <label
              htmlFor="victim_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Victim nic number
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="assault_location"
              id="assault_location"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formNicData.assault_location}
            />
            <label
              htmlFor="assault_location"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Assault location
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="assault_date_time"
              id="assault_date_time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formNicData.assault_date_time}
            />
            <label
              htmlFor="assault_date_time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Assault Date Time
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="assaulter_nic_number"
              id="assaulter_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formNicData.assaulter_nic_number}
            />
            <label
              htmlFor="assaulter_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Assaulter nic number
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

export default AssaultForm;
