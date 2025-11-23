import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setSessionData } from "../utils/localStorageUtils";
import toast, { Toaster } from "react-hot-toast";
import useGeolocation from "../hooks/useGeolocation";
import useSelectedLanguage from "../hooks/useSelectedLanguage";
import LIButtonWithText from "./LoadingIndicators/LIButtonWithText";
import {
  registerWithMobileNumberApi,
  registerWithMobileNumberConfirmOtpApi,
} from "../apis/AuthApiService";

const RegisterWithMobileNumber = (props) => {
  const navigate = useNavigate();
  const { loginLatitude, loginLongitude, user } = useGeolocation();
  const { selectedLanguage } = useSelectedLanguage();

  const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeOtp = (e) => {
    const { name, value } = e.target;
    setOtp(value);
  };

  const handleMobileNumberChange = (event) => {
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        setMobileNumber(input);
      }
    }
  };

  const handleSubmitMobileNumbreSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const loginResponse = await registerWithMobileNumberApi({
        mobileNumber,
        language: selectedLanguage,
      });
      if (loginResponse.status) {
        setShowOtpInput(true);
      } else {
        // setError(loginResponse.msg);
        toast.error(loginResponse.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLoginWithMobile = async (e) => {
    e.preventDefault();

    setError("");
    if (otp === "" || !otp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      const confirmOtpResponse = await registerWithMobileNumberConfirmOtpApi({
        otp: otp,
        mobileNumber: mobileNumber,
        latitude: loginLatitude,
        longitude: loginLongitude,
      });

      if (confirmOtpResponse.logged === true) {
        setSessionData({
          session_token: confirmOtpResponse.session_token,
          user_id: confirmOtpResponse.results.rows[0].user_id,
          username: confirmOtpResponse.results.rows[0].username,
          nic_number: confirmOtpResponse.results.rows[0].nic_number,
        });
        navigate("/");
      } else {
        toast.error(confirmOtpResponse.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-5 bg-gray-50 lg:mx-12 my-12 rounded-lg dark:bg-gray-900 border border-black">
      <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>

            {showOtpInput ? (
              <>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmitLoginWithMobile}
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter OTP
                    </label>
                    <input
                      type="number"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={otp}
                      onChange={handleChangeOtp}
                      maxLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-black border border-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Confirm OTP
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="px-4 py-2">
                  <p className="text-red-500">{error}</p>
                </div>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={isLoading ? null : handleSubmitMobileNumbreSignIn}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Mobile Number
                    </label>
                    <input
                      // ref={mobileNumberInput}
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-700 border-2 border-black text-white "
                  >
                    Sign Up
                  </button> */}
                  <button type="submit" className="w-full">
                    <LIButtonWithText
                      loading={isLoading}
                      loadingText={"Loading..."}
                      labelText={"Sin Up"}
                    />
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default RegisterWithMobileNumber;
