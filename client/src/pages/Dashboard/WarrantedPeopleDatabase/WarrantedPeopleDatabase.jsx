import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const WarrantedPeopleDatabase = () => {
  const [formData, setFormData] = useState({
    nic_number: "",
    passport_number: "",
    date: "",
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
      const insertResponse = await axios.post(
        "http://localhost:4000/warranted/set",
        { formData }
      );
      console.log(insertResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const [click, setClick] = useState(false);
  function handleClick() {
    setClick((prev) => !prev);
  }

  const [renderedData, setRenderedData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/warranted/getAll");
    console.log(response.data);
    setRenderedData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [formData]);

  const tableData = renderedData;

  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "warranted_people_id", //simple accessorKey pointing to flat data
      },
      {
        header: "Nic Number",
        accessorKey: "nic_number", //simple accessorKey pointing to flat data
      },
      {
        header: "Passport",
        accessorKey: "passport_number", //simple accessorKey pointing to flat data
      },

      {
        header: "Date",
        accessorKey: "location", //simple accessorKey pointing to flat data
      },
    ],
    []
  );

  return (
    <section className="my-12 border border-black rounded-md">
      <div className="bg-white rounded-md  p-8 mt-4 mb-6 px-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-black uppercase">
            WPD - Warranted people database
          </h1>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="nic_number"
              id="nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.nic_number}
              onChange={handleChange}
            />
            <label
              htmlFor="nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={() => {}}
              value=""
            >
              NIC
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="passport_number"
              id="passport_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.passport_number}
              onChange={handleChange}
            />
            <label
              htmlFor="passport_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={() => {}}
              value=""
            >
              Passport
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="date"
              id="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.date}
              onChange={handleChange}
            />
            <label
              htmlFor="date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              onChange={handleChange}
            >
              Date
            </label>
          </div>
          <div className="relative z-0 mx-auto w-36 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              onClick={handleClick}
            >
              <AiOutlineSearch />
              Search
            </button>
          </div>

          {/* Should we also have a remove option */}
          {/* <Link to='/connection'> */}

          {/* </Link> */}
        </form>
      </div>
      {click && (
        <div className="mx-12 my-12 p-4 bg-white text-gray-950 gap-12 flex rounded-md ">
          <div className="flex justify-between gap-16">
            <div className="border-2 rounded-md ">
              <img src="../img" className="w-48 h-48" />
            </div>
            <div className="my-4">
              <div className="flex gap-2">
                <div>Name :</div>
                <div>Peter Cullen</div>
              </div>
              <div className="flex gap-2">
                <div>Age :</div>
                <div>52</div>
              </div>
              <div className="flex gap-2">
                <div>Address :</div>
                <div>189 , Railway Road , Kollupitiya</div>
              </div>
              <div className="flex gap-2">
                <div>Height :</div>
                <div>(177cm)</div>
              </div>
              <div className="flex gap-2">
                <div>Gender :</div>
                <div>Male</div>
              </div>
              <div className="flex gap-2">
                <div>Blood Type :</div>
                <div>O +</div>
              </div>
              <div className="flex gap-2">
                <div>Recent Criminal Record (if any) :</div>
                <div>No</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        When the courts instruct the police department to arrest someone his
        details is entered on this portal. Once entered on the portal it appears
        on the wanted people system.
      </div>
      <div>
        <MaterialReactTable
          columns={columns}
          data={tableData}
          className="bg-black text-white"
        />
      </div>
    </section>
  );
};

export default WarrantedPeopleDatabase;
