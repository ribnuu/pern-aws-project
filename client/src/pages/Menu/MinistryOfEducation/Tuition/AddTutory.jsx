import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AddTutory = () => {
  const [Message, setMessage] = useState("");
  const initialFormData = {
    tutory_name: "",
    tutory_address: "",
  };

  const [TutoryList, setTutoryList] = useState([]);

  const [formData, setformData] = useState(initialFormData);
  const handleChange = (e) => {
    setMessage("");
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const insertResponse = await axios.post(
        `http://${server_port}:4000/api/tuition/createTutoryMaster`,
        {
          formData,
        }
      );
      if (insertResponse.data.rowCount > 0) {
        setMessage("A new tutory has been added successfully");
      }
      // setformData(initialFormData)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllTutory = async () => {
    try {
      const fetchAllTutoryResponse = await axios.post(
        `http://${server_port}:4000/api/tuition/fetchAllTutory`
      );
      if (fetchAllTutoryResponse.data.rowCount > 0) {
        setTutoryList(fetchAllTutoryResponse.data.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTutory();
  }, []);

  return (
    <section className="border border-black rounded-md">
      <div className=" px-2">
        {Message && <div className="text-green-500">{Message}</div>}
        <div className="text-center">Assign Tutory </div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tutory_name"
              id="tutory_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.tutory_name}
              required
            />
            <label
              htmlFor="tutory_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tutory Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tutory_address"
              id="tutory_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.tutory_address}
              required
            />
            <label
              htmlFor="tutory_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tutor Address
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <button
              type="submit"
              className="mb-2 w-full border border-black bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white"
            >
              Create Tutory{" "}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTutory;
