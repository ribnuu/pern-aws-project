import axios from "axios";
import React, { useEffect, useState } from "react";
import CccUserSearchByUserIdGroupIdAndSearchTerm from "../../components/CCC/CccUserSearchByUserIdGroupIdAndSearchTerm/CccUserSearchByUserIdGroupIdAndSearchTerm";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AssignPoliceOfficer = () => {
  const [formData, setFormData] = useState({
    police_officer_id: "",
    police_station_id: "",
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
    console.log(formData);
    try {
      const insertResponse = await axios.patch(
        `http://${server_port}:4000/police/master-police/assignPoliceOfficer`,
        { formData }
      );
      console.log(insertResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const [policeOfficerData, setPoliceOfficerData] = useState([]);
  const [stationData, setStationData] = useState([]);

  // Ccc User Search
  const [loadingCccUser, setLoadingCccUser] = useState(false);
  const [searchTermCccUser, setSearchTermCccUser] = useState("");

  const fetchPoliceData = async () => {
    try {
      const response = await axios.get(
        `http://${server_port}:4000/police/master-police/getPoliceOfficer`
      );
      setPoliceOfficerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStationData = async () => {
    try {
      const response = await axios.get(
        `http://${server_port}:4000/police/master-police/viewStation`
      );
      setStationData(response.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoliceData();
    fetchStationData();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new police officer
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* badge_number */}
            <CccUserSearchByUserIdGroupIdAndSearchTerm
              onSelectUser={(user) => {
                // updateFilter("userId", user.user_id); // Assuming user object has a username\
              }}
              setLoading={setLoadingCccUser}
              loading={loadingCccUser}
              setSearchTerm={setSearchTermCccUser}
              searchTerm={searchTermCccUser}
              hideLabel={false}
              loadOnMount={false}
              groupId={9}
              roleId={null}
            />

            {/* <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Officer
              </label>
              <select
                id="category"
                className="select select-bordered w-full bg-gray-700"
                name="police_officer_id"
                value={formData.police_officer_id}
                onChange={handleChange}
              >
                <option selected="">Select Officer</option>
                {policeOfficerData.map((data, key) => {
                  return (
                    <option value={data.police_officer_id} key={key}>
                      {data.badge_number}
                    </option>
                  );
                })}
              </select>
            </div> */}
            {/* station_number */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Station
              </label>
              <select
                id="category"
                className="select select-bordered w-full bg-gray-700 h-10"
                name="police_station_id"
                value={formData.police_station_id}
                onChange={handleChange}
              >
                <option selected="">Select Station</option>
                {stationData.map((data, key) => {
                  return (
                    <option value={data.police_station_id} key={key}>
                      {data.police_station_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mx-auto justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
            >
              Assign User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AssignPoliceOfficer;
