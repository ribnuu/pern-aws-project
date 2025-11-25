import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGeolocation from "../hooks/useGeolocation";
import { setSessionData } from "../utils/localStorageUtils";
import TextSwitch from "./TestSwitchComponent";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import useSelectedLanguage from "../hooks/useSelectedLanguage";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/auth/authSlice";
import LISpinnerWithText from "./LoadingIndicators/LISpinnerWithText";
import LIButtonWithText from "./LoadingIndicators/LIButtonWithText";
import {
  loginApi,
  loginOtpConfirmationApi,
  loginWithMobileNumberApi,
} from "../apis/AuthApiService";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedLanguage } = useSelectedLanguage();
  const { loginLatitude, loginLongitude, user } = useGeolocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [signInType, setSignInType] = useState(0);
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

  const handleSignInTypeChange = (event, newValue) => {
    setSignInType(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitMobileNumbreSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const loginResponse = await loginWithMobileNumberApi({
        mobileNumber: mobileNumber,
        language: selectedLanguage,
      });
      if (loginResponse.status) {
        setShowOtpInput(true);
      } else {
        debugger;
        toast.error(loginResponse.msg);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Plese check your credentials and try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    console.log(formData, loginLatitude, loginLongitude);
    try {
      const loginResponse = await loginApi({
        formData,
        loginLatitude,
        loginLongitude,
        language: selectedLanguage,
      });

      if (loginResponse.logged === true) {
        debugger;
        console.log(loginResponse.data);
        setSessionData({
          session_token: loginResponse.session_token,
          user_id: loginResponse.results.rows[0].user_id,
          username: loginResponse.results.rows[0].username,
          nic_number: loginResponse.results.rows[0].nic_number,
          selectedLanguage: loginResponse.results.rows[0].language,
          mobileNumber: loginResponse.results.rows[0].mobile_number,
        });
        dispatch(setAuthData("userId", loginResponse.results.rows[0].user_id));
        setIsLoading(false);
        navigate("/");
      } else {
        setError(loginResponse.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleConfirmOtp = async (e) => {
    e.preventDefault();

    setError("");
    if (otp === "" || !otp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      const confirmOtpResponse = await loginOtpConfirmationApi({
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
          selectedLanguage: confirmOtpResponse.results.rows[0].language,
          mobileNumber: confirmOtpResponse.results.rows[0].mobile_number,
        });
        dispatch(
          setAuthData("userId", confirmOtpResponse.results.rows[0].user_id)
        );
        navigate("/");
      } else {
        toast.error(confirmOtpResponse.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-5 bg-gray-50 my-12 rounded-lg dark:bg-gray-900 border border-black">
      <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in with
            </h1>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={signInType}
                  onChange={handleSignInTypeChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    sx={{ textTransform: "none" }}
                    label="Mobile Number"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ textTransform: "none" }}
                    label="Password"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={signInType} index={0}>
                {showOtpInput ? (
                  <>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleConfirmOtp}
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
                      onSubmit={
                        isLoading ? null : handleSubmitMobileNumbreSignIn
                      }
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Mobile Number
                        </label>
                        <input
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
                        Sign in
                      </button> */}
                      {/* <LISpinnerWithText loadingText="Sign In" /> */}
                      <LIButtonWithText
                        type="submit"
                        loading={isLoading}
                        loadingText={"Loading..."}
                        labelText={"Sign in"}
                      />
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link
                          to="/register"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </>
                )}
              </CustomTabPanel>
              <CustomTabPanel value={signInType} index={1}>
                <div className="px-4 py-2">
                  <p className="text-red-500">{error}</p>
                </div>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.username}
                      onChange={handleChange}
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
                      required
                      value={formData.password}
                      onChange={handleChange}
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
                  {/* <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-700 border-2 border-black text-white "
                  >
                    Sign in
                  </button> */}
                  <LIButtonWithText
                    type="submit"
                    loading={isLoading}
                    loadingText={"Loading..."}
                    labelText={"Sign in"}
                  />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default Login;
