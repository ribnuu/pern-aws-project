import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import CccUserSearchByUserIdGroupIdAndSearchTerm from "../../components/CCC/CccUserSearchByUserIdGroupIdAndSearchTerm/CccUserSearchByUserIdGroupIdAndSearchTerm";
import PoliceStationSearch from "../../components/CCC/PoliceStationSearch/PoliceStationSearch";
import { assignPoliceOffcerAPoliceStationApi } from "../../apis/PoliceStationApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AssignPoliceOfficer = () => {
  const initialState = {
    policeOfficerUserId: null,
    policeStationId: null,
  };

  const [formData, setFormData] = useState(initialState);

  // const [formData, setFormData] = useState({
  //   police_officer_id: "",
  //   police_station_id: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

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

  // Ccc Police Station Search
  const [loadingPoliceStation, setLoadingPoliceStation] = useState(false);
  const [searchTermPoliceStation, setSerchTermPoliceStation] = useState("");

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

  const assignPoliceOfficerAPoliceStation = async () => {
    try {
      const response = await assignPoliceOffcerAPoliceStationApi(formData);
      debugger;
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
        {/* <form onSubmit={handleSubmit}> */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {/* badge_number */}
          <div className="flex">
            {/* Flexbox for alignment */}
            <CccUserSearchByUserIdGroupIdAndSearchTerm
              onSelectUser={(policeOfficer) => {
                // updateFilter("policeOfficerUserId", policeOfficer.user_id); // Assuming user object has a username
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  policeOfficerUserId: policeOfficer.user_id,
                }));
              }}
              setLoading={setLoadingCccUser}
              loading={loadingCccUser}
              setSearchTerm={setSearchTermCccUser}
              searchTerm={searchTermCccUser}
              hideLabel={false}
              loadOnMount={false}
              groupId={9}
              roleId={null}
              className="flex-1 h-full" // Ensure it takes the full height
              labelText="Search Police Officer"
            />
          </div>

          <div className="flex">
            {/* Flexbox for alignment */}
            <PoliceStationSearch
              onSelectPoliceStation={(station) => {
                // updateFilter("policeStationId", station.id); // Assuming user object has a username
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  policeStationId: station.id,
                }));
              }}
              setLoading={setLoadingPoliceStation}
              loading={loadingPoliceStation}
              setSearchTerm={setSerchTermPoliceStation}
              searchTerm={searchTermPoliceStation}
              hideLabel={false}
              loadOnMount={true}
              className="flex-1 h-full" // Ensure it takes the full height
              labelText="Search Police Officer"
              disabled={formData.policeOfficerUserId === null}
            />
          </div>
        </div>
        <div className="mx-auto justify-center">
          <button
            onClick={assignPoliceOfficerAPoliceStation}
            // type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto"
          >
            Assign User
          </button>
        </div>
        {/* </form> */}
      </div>
    </section>
  );
};

export default AssignPoliceOfficer;
