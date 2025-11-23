import axios from "axios";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const HouseMaidRegistration = () => {
  const [formData, setFormData] = useState({
    nic_number: "",
    employer_nic: "",
    start_date: "",
    registered_date: "",
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
      const createDriverResponse = await axios.post(
        `http://${server_port}:4000/api/Housemaid/CreateDriver`,
        {
          formData,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className=" my-12">
      <div className=" bg-white p-4 rounded-md  border border-black">
        <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
          HOUSEMAID REGISTRATION PORTAL
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="text"
              name="nic_number"
              id="nic_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.nic_number}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="nic_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              NIC Number
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="employer_nic"
              id="employer_nic"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.employer_nic}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="employer_nic"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Employer NIC
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="start_date"
              id="start_date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.start_date}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="start_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Start Date
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="datetime-local"
              name="registered_date"
              id="registered_date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formData.registered_date}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="registered_date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              value=""
            >
              Registered Date
            </label>
          </div>
          <div className="relative z-0 mx-auto w-48 mb-6 group flex justify-between gap-12">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md  border border-black text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <GrAdd />
              Register Housemaid
            </button>
          </div>
          {/* <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="nickname" id="nickname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="nickname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" onChange={() => {}} value=''>Device Nickname</label>
            </div>   */}

          {/* Should we also have a remove option */}
          {/* <Link to='/connection'> */}
          {/* </Link> */}
        </form>
      </div>
      This form will also be used by shops in unity plaze or anywhere that sells
      electrical and electronic items. So they must use this portal to Register
      their sales of any device [like who is buying and selling] <br />
      <br />
      Any repairing shop does not accept any devices that is not registered on
      the portal. Shop guy register the broken phone on behalf of the user Phone
      laptop
      <br />
      <br />
      Registers all the drones sold. Compulsory like all the electrical
      equipment.
      <br />
      25 rupees tax returns for all the electrical or electronic items sold
      after registering. Meaning you selling all mobile phones or laptops in
      your shop only after registering Meaning, it hepls your shop to recover
      some tax benefits 25 rupees per registeration
    </section>
  );
};

export default HouseMaidRegistration;
