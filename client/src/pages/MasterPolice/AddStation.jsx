import axios from "axios";
import React, { useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AddStation = () => {
  const [formData, setFormData] = useState({
    police_station_name: "",
    police_station_address: "",
    police_station_mail: "",
    police_station_contact_landline: "",
    police_station_contact_mobile: "",
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
      const insertResponse = await axios.post(
        `http://${server_port}:4000/police/master-police/addStation`,
        { formData }
      );
      console.log(insertResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new Station
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="police_station_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Add a Station Name
              </label>
              <input
                type="text"
                name="police_station_name"
                id="police_station_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Station Name"
                required=""
                value={formData.police_station_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:col-span-2">
              <label
                htmlFor="station_mail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Station Mail
              </label>
              <input
                type="email"
                name="police_station_mail"
                id="police_station_mail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Station Mail"
                required=""
                value={formData.police_station_mail}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="police_station_contact_landline"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Police Station Contact Landline
              </label>
              <input
                type="number"
                name="police_station_contact_landline"
                id="police_station_contact_landline"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0112 559 559"
                value={formData.police_station_contact_landline}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="police_station_contact_mobile"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Police Station Contact Mobile
              </label>
              <input
                type="number"
                name="police_station_contact_mobile"
                id="police_station_contact_mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={formData.police_station_contact_mobile}
                onChange={handleChange}
                placeholder="0777 559 559"
              />
            </div>
            {/* <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select category</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div> */}
            {/* <div>
                                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" />
                            </div>  */}
            <div className="sm:col-span-2">
              <label
                htmlFor="police_station_address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Station Address
              </label>
              <textarea
                id="police_station_address"
                name="police_station_address"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Station Address Here"
                value={formData.police_station_address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="mx-auto justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
            >
              Add Station
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddStation;
