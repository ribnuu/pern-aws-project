import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import MissingNICForm from "./MissingNICForm";
import AssaultForm from "./AssaultForm";
import MissingPassportForm from "./MissingPassportForm";
import MissingLicenseForm from "./MissingLicenseForm";
import MissingVehicleForm from "./MissingVehicleForm";
import MissingPersonForm from "./MissingPersonForm";

const policeComplaintSystem = () => {
  const [selected, setSelected] = useState("Select");
  const [formData, setFormData] = useState({
    incident: "",
    location: "",
    vehicle_involved: "",
    people_around: "",
    officer_involved: "",
    officer_id: 10,
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
  };

  const handleIncidentChange = async (e) => {
    try {
      const incidentValue = e.target.value;
      setSelected(incidentValue);
      console.log(incidentValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = formData;

    try {
      const insertResponse = await axios.post(
        "http://localhost:4000/complaint/set",
        { formData }
      );
    } catch (error) {
      console.log(error);
    }
    // Perform form submission logic here
    console.log(formData);
    // Reset form fields
    // setFormData({
    //   name: '',
    //   email: '',
    //   message: '',
    // });
  };
  //

  const selectOptions = [
    "Missing Person",
    "Missing Vehicle",
    "Missing Nic",
    "Missing Passport",
    "Missing License",
    "Assault",
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    try {
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section>
      <div className="mx-12 my-12 bg-white p-4 rounded-md  border border-black text-black">
        <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
          Police Complaint System
        </h1>
        <div>
          <div className="relative z-0 w-full mb-6 group text-black mt-2 ">
            <label>Choose incident :</label>
            <label htmlFor="incident"></label>
            <select
              id="incident"
              name="incident"
              className="bg-white mx-4"
              value={selected}
              onChange={handleIncidentChange}
            >
              <option value="">Select incident</option>
              <option value="Missing Person">Missing Person</option>
              <option value="Missing Vehicle">Missing Vehicle</option>
              <option value="Missing NIC">Missing NIC</option>
              <option value="Missing Passport">Missing Passport</option>
              <option value="Missing license">Driving license</option>
              <option value="Assault">Assault</option>
            </select>
          </div>
          {selected === "Missing Person" && (
            <div>
              <MissingPersonForm />
            </div>
          )}
          {selected === "Missing Vehicle" && (
            <div>
              <MissingVehicleForm />
            </div>
          )}
          {selected === "Missing NIC" && (
            <div>
              <MissingNICForm />
            </div>
          )}
          {selected === "Missing Passport" && (
            <div>
              <MissingPassportForm />
            </div>
          )}
          {selected === "Assault" && (
            <div>
              <AssaultForm />
            </div>
          )}
          {selected === "Missing license" && (
            <div>
              <MissingLicenseForm />
            </div>
          )}
          {/* <div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="location"
                id="location"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                value={formData.location}
              />
              <label
                htmlFor="location"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Location
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="vehicle"
                id="vehicle"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="serial"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Vehicle involved(if any)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="people_around"
                id="people_around"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="people_around"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                People around (if any)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="officer"
                id="officer"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="nickname"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Any officer (if any)
              </label>
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

            <div className="relative z-0 w-full mb-6 group text-black flex gap-4 text-xs">
              <input type="radio" id="police" name="access" value="Police" />
              <label htmlFor="css">Police only</label>
              <br />
              <input type="radio" id="public" name="access" value="Public" />
              <label htmlFor="javascript">Public and Police</label>
            </div>
            <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              >
                <GrAdd />
                Report Incident
              </button>
            </div>
          </div> */}
        </div>
      </div>
      If one person is missing , if we choose police checkbox only police xan
      see that such person is missing. If they choose citizen portal , even the
      public [GENERAL public] will be able to see the person.
      <br />
      <br />
      If someone make a police entry tp declare NIC , PASSPORT OR DRIVING
      license lost. Automatically the NIC or Passport Or driving license office
      is updated through the system about the loss. so that the individual
      doesn't have to carry a complaint copy
    </section>
  );
};

export default policeComplaintSystem;
