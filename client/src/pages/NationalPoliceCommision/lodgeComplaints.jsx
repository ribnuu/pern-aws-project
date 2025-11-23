import axios from "axios";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const HouseMaidRegistration = () => {
  const [formData, setFormData] = useState({
    nic_number: "",
    employer_nic: "",
    start_date: "",
    registered_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createDriverResponse = await axios.post(
        `http://${server_port}:4000/api/Housemaid/CreateDriver`,
        {
          formData,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className=" my-12">
      <div className=" bg-white p-4 rounded-md  border border-black">
        <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
          POLICE REPORT FORM
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="text"
              name="nic_number"
              id="nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.nic_number}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              NIC Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="reportedby_nic"
              id="reportedby_nic"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.reportedby_nic}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="reportedby_nic"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              NIC Reported by
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="text"
              name="officer_name"
              id="officer_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.officer_name}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="officer_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Officer Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="incident_date"
              id="incident_date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.incident_date}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="incident_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Incident Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="reported_date"
              id="reported_date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.reported_date}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="reported_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Reported Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group text-black flex gap-4 text-xs">
            <input type="radio" id="Profile" name="access" value="Profile" />
            <label htmlFor="css">Complaint from me</label>
            <br />
            <input
              type="radio"
              id="Anonymous"
              name="access"
              value="Anonymous"
            />
            <label htmlFor="javascript">Anonymous complaint</label>
          </div>
          <div className="relative z-0 w-full mb-6 group flex flex-col gap-2  text-black">
            <div className="flex gap-2">
              <label>Add Media</label>
              <input type="file" />
            </div>
            <div>
              Add any .pdf , .docx , .jpg , .png , .jpeg , .mp4 , .mp3
              <br />
              Add video , audio , photo and other files
            </div>
          </div>
          <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <GrAdd />
              Lodge Complaint
            </button>
          </div>
        </form>
      </div>
      Complaints related to the police department itself , police officers
      misbehaviors are reported via this portal
    </section>
  );
};

export default HouseMaidRegistration;
