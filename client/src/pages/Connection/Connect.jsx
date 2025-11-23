import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsDatabaseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Connect = () => {
  const [formData, setFormData] = useState({
    dbType: "",
    dbName: "",
    ipName: "",
    portNumber: "",
    tableName: "",
    columnName: "",
    columnListArray: [],
  });

  const [columnList, setColumnList] = useState([{ column: "" }]);

  const handleColumnChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...columnList];
    list[index][name] = value;
    setColumnList(list);
    console.log(list);
    // formData.columnListArray.push()
  };

  const handleColumnRemove = (index) => {
    const list = [...columnList];
    list.splice(index, 1);
    setColumnList(list);
  };

  const handleColumnAdd = () => {
    setColumnList([...columnList, { column: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mx-12 my-12 bg-white p-4 rounded-md border border-black">
      <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
        DCM - Database Connection Manager
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="dbType"
            id={formData.dbType}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleInputChange}
            value={formData.dbType}
            required
          />
          <label
            htmlFor={formData.dbType}
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Database Type
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="db_name"
            id="db_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="db_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            onChange={handleInputChange}
            value={formData.dbName}
          >
            Database Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="ip_address"
            id="ip_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="ip_address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            onChange={handleInputChange}
            value={formData.ipName}
          >
            IP Address or Domain Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="port_number"
            id="port_number"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="port_number"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            onChange={handleInputChange}
            value={formData.portNumber}
          >
            Port Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="table_name"
            id="table_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="table_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            onChange={handleInputChange}
            value={formData.tableName}
          >
            Table Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group flex justify-between mx-5 gap-12">
          <div className="form-field x">
            <label htmlFor="" className="text-gray-950">
              Column(s)
            </label>
            {columnList.map((singleColumn, index) => (
              <div key={index} className="services">
                <div className="first-division">
                  <input
                    name="column"
                    type="text"
                    id="column"
                    value={singleColumn.column}
                    onChange={(e) => handleColumnChange(e, index)}
                    required
                    placeholder="Column Name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  {columnList.length - 1 === index && columnList.length < 4 && (
                    <button
                      type="button"
                      onClick={handleColumnAdd}
                      className="bg-red-500 my-4 px-2 rounded-xs"
                    >
                      <span>Add a Column</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="output">
              <h2>Output</h2>
              {columnList &&
                columnList.map((singleColumn, index) => (
                  <ul key={index}>
                    {singleColumn.column && (
                      <li className="text-gray-950">{singleColumn.column}</li>
                    )}
                  </ul>
                ))}
            </div>
          </div>
          <div className="text-gray-950 text-xs">
            <h2>
              New Connection Window will have tabs. Each tab will be assigned
              with the connection data for a particular database. Will be able
              to declare number of tables from the above mention database. will
              be able to pull data from the specific column(s) belong to the
              tables declared above. If a department has multiple databases , we
              fill the details on multiple tabs.
            </h2>
          </div>
        </div>

        {/* Should we also have a remove option */}
        {/* <Link to='/connection'> */}
        <div className="flex justify-between ">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
          >
            <BsDatabaseFill /> Add Connection
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
          >
            <BsDatabaseFill /> Test connection Connection
          </button>
        </div>

        {/* </Link> */}
      </form>
    </div>
  );
};

export default Connect;
