import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const MarriageCertificate = () => {
  const [Message, setMessage] = useState("");
  const initialFormData = {
    bride_nic_number: "",
    groom_nic_number: "",
    witness1_nic_number: "",
    witness2_nic_number: "",
  };

  const [BrideName, setBrideName] = useState("");

  const [GroomName, setGroomName] = useState("");

  const [WitnessOneName, setWitnessOneName] = useState("");

  const [WitnessTwoName, setWitnessTwoName] = useState("");

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchBride = async () => {
    try {
      const fetchBrideResponse = await axios.post(
        `http://${server_port}:4000/api/marriage/fetchBrideNic`,
        {
          nic_number: formData.bride_nic_number,
        }
      );
      if (fetchBrideResponse.data.rowCount > 0) {
        setBrideName(fetchBrideResponse.data.rows[0].citizen_name);
      } else {
        setBrideName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGroom = async () => {
    try {
      const fetchGroomResponse = await axios.post(
        `http://${server_port}:4000/api/marriage/fetchGroomNic`,
        {
          nic_number: formData.groom_nic_number,
        }
      );
      if (fetchGroomResponse.data.rowCount > 0) {
        setGroomName(fetchGroomResponse.data.rows[0].citizen_name);
      } else {
        setGroomName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWitnessOne = async () => {
    try {
      const fetchWitnessOneNicResponse = await axios.post(
        `http://${server_port}:4000/api/marriage/fetchWitnessOne`,
        {
          nic_number: formData.witness1_nic_number,
        }
      );
      if (fetchWitnessOneNicResponse.data.rowCount > 0) {
        setWitnessOneName(fetchWitnessOneNicResponse.data.rows[0].citizen_name);
      } else {
        setWitnessOneName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWitnessTwo = async () => {
    try {
      const fetchWitnessTwoNicResponse = await axios.post(
        `http://${server_port}:4000/api/marriage/fetchWitnessTwo`,
        {
          nic_number: formData.witness2_nic_number,
        }
      );
      if (fetchWitnessTwoNicResponse.data.rowCount > 0) {
        setWitnessTwoName(fetchWitnessTwoNicResponse.data.rows[0].citizen_name);
      } else {
        setWitnessTwoName("No person found");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPerson = async () => {
    fetchBride();
    fetchGroom();
    fetchWitnessOne();
    fetchWitnessTwo();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const insertResponse = await axios.post(
        `http://${server_port}:4000/api/marriage/createMarriageCertificate`,
        {
          formData,
        }
      );
      if (insertResponse.data.rowCount > 0) {
        setMessage("A new mrg certificate has been added successfully");
      }
      // setformData(initialFormData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" my-12 border border-black rounded-md">
      <div className=" px-2 py-1">
        {Message && <div className="text-green-500">{Message}</div>}
        <div className="text-center">Marriage Certificate</div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="bride_nic_number"
              id="bride_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.bride_nic_number}
            />
            <label
              htmlFor="bride_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Bride's NIC Number
            </label>
          </div>
          {BrideName && <p className="text-xs my-1">{BrideName}</p>}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="groom_nic_number"
              id="groom_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.groom_nic_number}
            />
            <label
              htmlFor="groom_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Groom's NIC Number
            </label>
          </div>
          {GroomName && <p className="text-xs my-1">{GroomName}</p>}

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="witness1_nic_number"
              id="witness1_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.witness1_nic_number}
            />
            <label
              htmlFor="witness1_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Witness Nic Number one
            </label>
          </div>
          {WitnessOneName && <p className="text-xs my-1">{WitnessOneName}</p>}

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="witness2_nic_number"
              id="witness2_nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.reported_nic_number}
            />
            <label
              htmlFor="witness2_nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Witness Nic Number two
            </label>
          </div>
          {WitnessTwoName && <p className="text-xs my-1">{WitnessTwoName}</p>}

          <div
            onClick={fetchPerson}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
          >
            <GrAdd className="my-auto" />
            Fetch Persons
          </div>
          <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <GrAdd className="my-auto" />
              Create Incident
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MarriageCertificate;
