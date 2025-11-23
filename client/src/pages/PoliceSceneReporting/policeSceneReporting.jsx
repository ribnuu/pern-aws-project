import { Link } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { GrAdd } from "react-icons/gr";
import { BiCurrentLocation } from "react-icons/bi";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const policeSceneReporting = () => {
  const [dataChange, setDataChange] = useState("false");
  const [formData, setFormData] = useState({
    crime: "",
    vehicle_number: "",
    death_number: "",
    hospitalized_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const insertResponse = axios.post(
        `http://${server_port}:4000/policescenereporting/set`,
        { formData }
      );
      setDataChange(!dataChange);
    } catch (error) {
      console.log(error);
    }
  };

  const [renderedData, setRenderedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://${server_port}:4000/policescenereporting/get`
      );
      console.log(response.data);
      setRenderedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataChange]);

  const tableData = renderedData;

  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "police_scene_reporting_id", //simple accessorKey pointing to flat data
      },
      {
        header: "Crime",
        accessorKey: "crime", //simple accessorKey pointing to flat data
      },
      {
        header: "Vehicles Involved",
        accessorKey: "vehicle_number", //simple accessorKey pointing to flat data
      },

      {
        header: "No. of Deaths",
        accessorKey: "death_number", //simple accessorKey pointing to flat data
      },

      {
        header: "No. of Hospitalized",
        accessorKey: "hospitalized_number", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  return (
    <>
      <section className="mx-12 my-12">
        <div className="text-gray-950">
          <div className="bg-white rounded-md  border border-black p-4">
            <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
              Police Scene Reporting
            </h1>
            <div className="bg-white mt-4">
              <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                  <label>Choose crime : </label>
                  <select
                    name="crime"
                    id="crime"
                    form="crime"
                    onChange={handleChange}
                    value={formData.crime}
                    className="bg-white"
                    required
                  >
                    <option value=""> -- select the crime -- </option>
                    <option value="Accident">Accident</option>
                    <option value="Missing">Missing persons</option>
                    <option value="Wanted">Wanted Persons</option>
                    <option value="Murder">Murder</option>
                    <option value="Theft">Theft</option>
                    <option value="Missing Vehicle">Missing Vehicles</option>
                  </select>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name="vehicle_number"
                    id="vehicle_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    value={formData.vehicle_number}
                  />
                  <label
                    htmlFor="vehicle_number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    onChange={() => {}}
                    value=""
                  >
                    Number of Vehicles Involved
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="death_number"
                    id="death_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    value={formData.death_number}
                  />
                  <label
                    htmlFor="death_number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    onChange={() => {}}
                    value=""
                  >
                    How many death
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="hospitalized_number"
                    id="hospitalized_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    value={formData.hospitalized_number}
                  />
                  <label
                    htmlFor="hospitalized_number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    onChange={() => {}}
                    value=""
                  >
                    How many hospitalized
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="file"
                    name="vehicle_number"
                    id="vehicle_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="port_number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    onChange={() => {}}
                    value=""
                  >
                    Add photo(s) of incident
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="file"
                    name="vehicle_number"
                    id="vehicle_number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="port_number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    onChange={() => {}}
                    value=""
                  >
                    Add video(s) of incident
                  </label>
                </div>
                <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
                  >
                    <AiOutlineSend className="my-auto" />
                    Report Incident
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mx-12 my-12 text-white ">
          Police office who visits the scene will asses the situation and
          <br />
          Choose accident, murder etc using tags
          <br />
          How many vehicles collided
          <br />
          How many died
          <br />
          How many hospitalized
          <br />
          Take pictures and upload when needed.
          <br />
          Take video when needed.
        </div>
        <div>
          <MaterialReactTable
            columns={columns}
            data={tableData}
            className="bg-black text-white"
          />
        </div>
      </section>
      <section className="mx-12 my-12">
        <div className="bg-white p-4 rounded-md  border border-black">
          <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
            Case Report Portal
          </h1>
          <form onSubmit={() => {}}>
            <div className="relative z-0 w-full mb-6 group text-black mt-2 ">
              <label>Choose incident</label>
              <select
                name="province"
                id="province"
                form="province"
                className="bg-white px-2"
              >
                <option disabled selected value>
                  {" "}
                  -- select an incident --{" "}
                </option>
                <option value="">Missing Person</option>
                <option value="">Missing Vehicle</option>
                <option value="">Missing Devices</option>
                <option value="">Murder</option>
                <option value="">Theft</option>
                <option value="">Other</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 flex justify-stretch group">
              <div className="w-10/12">
                <input
                  type="text"
                  name="MAC"
                  id="MAC"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="MAC"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  onChange={() => {}}
                  value=""
                >
                  Location
                </label>
              </div>
              <div className="text-black flex mx-auto my-auto gap-2 px-2 py-2 bg-gray-400 rounded-md  border border-black">
                <BiCurrentLocation className="my-auto" />
                <p className="">Auto detect location</p>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="serial"
                id="serial"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
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
                name="nickname"
                id="nickname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="nickname"
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
                name="nickname"
                id="nickname"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
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
            <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              >
                <GrAdd />
                Report Incident
              </button>
            </div>
          </form>
        </div>
        All the officers who are rushing to scene where the incident or accident
        is taking place or a crime taken place, the officer will use this screen
        to report the incident
        <br />
      </section>
    </>
  );
};

export default policeSceneReporting;
