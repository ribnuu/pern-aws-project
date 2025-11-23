import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Label } from "@mui/icons-material";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const PayFineForMySelf = () => {
  const userId = localStorage.getItem("user_id");
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://${server_port}:4000/api/profile/${userId}`
        );
        if (response.data.success) {
          setLicenseNumber(response.data.data.licenseNumber);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    return () => {
      setIsLoading(false);
    };
  }, [userId]); // Depend on userId so that useEffect runs when userId changes

  return (
    <section className="bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      {!licenseNumber && (
        <>
          <h1>
            No license number associated with this account{" "}
            <Link to="/profile-settings">Update your license number here</Link>
          </h1>
        </>
      )}

      {licenseNumber && (
        <>
          <div className="">
            <div className="bg-white rounded-lg p-8 mt-4">
              <form onSubmit={() => {}}>
                <div className="relative z-0 w-full mb-6 group flex items-center">
                  <div className="relative z-0 w-full mb-1 group mt-0">
                    <label
                      htmlFor="driverLicenseNo"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Driver License Number
                    </label>
                    <input
                      type="text"
                      name="driverLicenseNo"
                      id="driverLicenseNo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      //   onChange={handleChange}
                      //   value={driverLicenseNo}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="relative z-0 lg:w-full mb-6 group flex justify-between gap-12 bg-white px-4 py-1 rounded-lg">
              <button
                // onClick={handleProceedToOffenseSelection}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              >
                <AiOutlineSearch className="my-auto" />
                Proceed to offense selection
              </button>
              <Link to="/dop/issues-without-fine">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
                >
                  <AiOutlineSearch className="my-auto" />
                  Proceed to issues without fine
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default PayFineForMySelf;
