import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const BirthCertificate = () => {
  const [FatherNicName, setFatherNicName] = useState("");
  const [MotherNicName, setMotherNicName] = useState("");

  const [Message, setMessage] = useState("");
  const initialFormData = {
    baby_name: "",
    hospital_name: "",
    dob: "",
    time: "",
    address: "",
    father_nic_number: "",
    mother_nic_number: "",
  };

  const [formattedTime, setformattedTime] = useState("");
  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchParents = async () => {
    fetchFather();
    fetchMother();
  };

  const fetchFather = async () => {
    try {
      const fetchParentsResponse = await axios.post(
        `http://${server_port}:4000/api/birth/fetchFatherNIc`,
        {
          father_nic_number: formData.father_nic_number,
        }
      );
      if (fetchParentsResponse.data.rowCount > 0) {
        setFatherNicName(fetchParentsResponse.data.rows[0].citizen_name);
      } else {
        setFatherNicName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMother = async () => {
    try {
      const fetchParentsResponse = await axios.post(
        `http://${server_port}:4000/api/birth/fetchMotherNic`,
        {
          mother_nic_number: formData.mother_nic_number,
        }
      );
      if (fetchParentsResponse.data.rowCount > 0) {
        setMotherNicName(fetchParentsResponse.data.rows[0].citizen_name);
      } else {
        setMotherNicName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setformattedTime(formData.time);
    try {
      const insertResponse = await axios.post(
        `http://${server_port}:4000/api/birth/create`,
        {
          formData,
          formattedTime,
        }
      );
      if (insertResponse.data.rowCount > 0) {
        setMessage("A new birth certificate has been added successfully");
      }
      // setformData(initialFormData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="border border-black rounded-md">
      <div className=" px-2">
        {Message && <div className="text-green-500">{Message}</div>}
        <div className="text-center">Birth Certificate</div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="baby_name"
              id="baby_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.baby_name}
              required
            />
            <label
              htmlFor="baby_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Baby Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="hospital_name"
              id="hospital_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.hospital_name}
              required
            />
            <label
              htmlFor="hospital_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Hospital Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="dob"
              id="dob"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.dob}
              required
            />
            <label
              htmlFor="dob"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of birth
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="time"
              name="time"
              id="time"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.time}
              required
            />
            <label
              htmlFor="time"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Time of birth
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="address"
              id="address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.address}
              required
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          <div className="flex">
            <div className="relative z-0 w-screen mb-6 group">
              <div>
                <input
                  type="text"
                  name="father_nic_number"
                  id="father_nic_number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.father_nic_number}
                />
                <label
                  htmlFor="father_nic_number"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Father Nic Number
                </label>
              </div>
              <div>
                {FatherNicName && (
                  <p className="text-xs  my-1">{FatherNicName}</p>
                )}
              </div>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <div>
                <input
                  type="text"
                  name="mother_nic_number"
                  id="mother_nic_number"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.mother_nic_number}
                />
                <label
                  htmlFor="mother_nic_number  "
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mother Nic Number
                </label>
              </div>
              <div>
                {MotherNicName && (
                  <p className="text-xs  my-1">{MotherNicName}</p>
                )}
              </div>
            </div>
          </div>
          <div
            className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            onClick={fetchParents}
          >
            Fetch Parents
          </div>

          <div className="relative z-0 w-full group">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2 my-14 mx-auto"
            >
              Create Birth Certificate
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BirthCertificate;
