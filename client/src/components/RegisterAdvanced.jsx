import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useGeolocation from "../hooks/useGeolocation";
import { setSessionData } from "../utils/localStorageUtils";
import {
  registerAdvancedApi,
  registerAdvancedConfirmOTPApi,
} from "../apis/AuthApiService";

const RegisterAdvanced = () => {
  document.title = "User Registration Screen";

  const { loginLatitude, loginLongitude, user } = useGeolocation();

  const [formData, setFormData] = useState({
    // username: "",
    // nic: "",
    mobileNumber: "",
    // email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          mobileNumber: input,
        }));
      }
    }
  };

  const [otp, setOtp] = useState(null);
  const handleChangeOtp = (e) => {
    const { name, value } = e.target;
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== confirmPassword) {
      toast.error("Password Mismatch");
      return;
    }

    try {
      const registerResponse = await registerAdvancedApi({
        formData: formData,
      });
      if (registerResponse.data.success == true) {
        // navigate("/");
        setShowOtpInput(true);
      } else {
        setError(registerResponse.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    setError("");
    if (otp === "" || !otp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      const confirmOtpResponse = await registerAdvancedConfirmOTPApi({
        otp: otp,
        mobileNumber: formData.mobileNumber,
        loginLatitude,
        loginLongitude,
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
        toast.error(confirmOtpResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {showOtpInput ? "Otp Confirmation" : "Sign up"}
            </h1>
            <div className="px-4 py-2">
              <p className="text-red-500">{error}</p>
            </div>
            {!showOtpInput ? (
              <>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Mobile Number *
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      value={formData.mobileNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
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
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-black border border-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign up
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
            ) : (
              <>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmitOtp}
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter OTP *
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
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default RegisterAdvanced;
