import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  getUserProfileDataByUserIdApi,
  updateUserProfileApi,
} from "../apis/ProfileApiService";
import LIButtonWithText from "./LoadingIndicators/LIButtonWithText";
import { LinearProgress } from "@mui/material";

const ProfileSettings = (props) => {
  const userId = localStorage.getItem("user_id");
  const initialFormDaa = {
    username: "",
    email: "",
    licenseNumber: "",
    nicNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormDaa);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) {
          return;
        }
        setIsFetchingData(true);
        const data = await getUserProfileDataByUserIdApi(userId);
        if (data.success) {
          setFormData({
            username: data.data.userName,
            email: data.data.email,
            nicNumber: data.data.nicNumber,
            licenseNumber: data.data.licenseNumber,
            userId: userId,
          });
        } else {
          toast.error(data.msg);
        }
        setIsFetchingData(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching data");
        setIsFetchingData(false);
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchUserProfile();
  }, [userId]); // Depend on userId so that useEffect runs when userId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsUpdating(true);
    try {
      toast.promise(
        updateUserProfileApi(formData)
          .then((data) => {
            if (data.success) {
            } else {
              throw data.msg;
            }
          })
          .catch((err) => {
            throw err;
          }),
        {
          loading: "Updating profile...",
          success: <b>Successfully updated profile information</b>,
          error: (err) => <b>{err}</b>,
        }
      );
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };

  return (
    <section className="mx-5 bg-gray-50 my-12 rounded-lg dark:bg-gray-900 border border-black">
      <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {isFetchingData && <LinearProgress color="primary" />}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Profile Settings
            </h1>

            <>
              <div className="px-4 py-2">
                <p className="text-red-500">{error}</p>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={isUpdating ? null : handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="emaiul"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="licenseNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    id="licenseNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={formData.licenseNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nicNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NIC Number
                  </label>
                  <input
                    type="text"
                    name="nicNumber"
                    id="nicNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    value={formData.nicNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="w-full">
                  <LIButtonWithText
                    loading={isUpdating}
                    loadingText={"Updating..."}
                    labelText={"Update"}
                  />
                </button>
              </form>
            </>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default ProfileSettings;
