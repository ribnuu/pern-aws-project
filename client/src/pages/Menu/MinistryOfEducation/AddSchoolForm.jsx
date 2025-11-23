import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const AddSchoolForm = () => {
  const [Message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAddmission, setShowAddmission] = useState(false);

  const initialFormData = {
    district: "",
    school_name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData==========>>>>", formData);

    try {
      const insertResponse = await axios.post(
        `http://${server_port}:4000/api/school/createSchool`,
        {
          formData,
        }
      );
      if (insertResponse.data.rowCount > 0) {
        setMessage("A new school student record has been added successfully");
      }
      console.log("insertResponse=====>>>", insertResponse);
      setformData(initialFormData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);

  const SchoolFormShow = async () => {
    setShowForm(!showForm);
    setShowAddmission(false);
  };
  const SclGradeAddmissionShow = async () => {
    setShowAddmission(!showAddmission);
    setShowForm(false);
  };
  // const [value, setValue] = useState(getInitialState);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  return (
    <>
      <section className="">
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2"
            onClick={SchoolFormShow}
          >
            Add School
          </div>
          <div
            className="bg-white border border-gray-900 rounded-md px-4 py-2"
            onClick={SclGradeAddmissionShow}
          >
            Grade 01 Addmission
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12"></div>
      {showForm && (
        <section className="border border-black rounded-md">
          <div className=" px-2">
            {Message && <div className="text-green-500">{Message}</div>}
            <div className="text-center mt-2">Add School </div>
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <select
                  type="select"
                  name="district"
                  id="select_district"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.district}
                  required
                >
                  <option>Select District</option>
                  <option value="colombo">Colombo</option>
                  <option value="baticaloa">Baticaloa</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="school_name"
                  id="school_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.school_name}
                  required
                />
                <label
                  htmlFor="school_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  School Name
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <button
                  type="submit"
                  className="mb-2 w-full border border-black bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white"
                >
                  Create School Record
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12"></div>
      {/* {showAddmission &&(

                <section className="border border-black rounded-md">
                    <div className=" px-2">
                        {
                            Message &&
                            <div className="text-green-500">
                                {
                                    Message
                                }
                            </div>
                        }
                        <div className="text-center mt-2">Grade 01 Addmission </div>
                        <form >
                        <div className="relative z-0 w-full mb-6 group">
                                <select
                                    type="select"
                                    name="select_district"
                                    id="select_district"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={handleChange}
                                    // value={formData.citizen_code_number}
                                    required>
                                    <option >Select District</option>
                                    <option value="N/A">N/A</option>
                                    <option value="N/A">N/A</option>
                                </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                                <select
                                    type="select"
                                    name="select_school"
                                    id="select_school"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={handleChange}
                                    // value={formData.citizen_code_number}
                                    required>
                                    <option >Select School</option>
                                    <option value="N/A">N/A</option>
                                    <option value="N/A">N/A</option>
                                </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="select"
                                name="number_of_applicants"
                                id="number_of_applicants"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                value={formData.number_of_applicants}
                                required
                            />
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Number of Applicants
                            </label>
                        </div>
                        <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12"></div>

                        <div className="relative z-0 w-full mb-6 group">
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Student Details
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                value={formData.full_name}
                                required
                            />
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Full Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="name_with_initials"
                                id="name_with_initials"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                // onChange={handleChange}
                                value={formData.name_with_initials}
                                required
                            />
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Name With Initial
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <select
                                type="text"
                                name="number_of_applicants"
                                id="number_of_applicants"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                required
                            >
                                <option value="">Please select</option>
                                <option value="male">Male </option>
                                <option value="femail">Femail</option>
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="text"
                                name="relegion"
                                id="relegion"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                value={formData.relegion}
                                required
                            />
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Religion
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <select
                                type="text"
                                name="medium"
                                id="medium"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                value={formData.medium}
                                required
                            >
                                <option > Select Medium</option>
                                <option value="english">English</option>
                                <option value="sinhala">Sinhala</option>
                                <option value="tamil">Tamil</option>
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="date"
                                name="date_of_birth"
                                id="date_of_birth"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                value={formData.date_of_birth}
                                required
                            />
                            <label
                                htmlFor="school_name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Date Of Birth
                            </label>
                        </div>
                        <div className="relative z-0 w-full group">

                            <button
                                type="submit"
                                className="mb-2 w-full border border-black bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white"
                            >
                                Save
                            </button>
                        </div>
                        </form>
                    </div>
                </section>  
            )} */}
    </>
  );
};

export default AddSchoolForm;
