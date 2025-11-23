import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSessionData } from "../../utils/localStorageUtils";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import useSelectedLanguage from "../../hooks/useSelectedLanguage";
import useGeolocation from "../../hooks/useGeolocation";
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

const PaymentGatewayCheckout = (props) => {
  const navigate = useNavigate();
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleConfirmOtp = async (e) => {
    e.preventDefault();

    return;

    setError("");
    if (otp === "" || !otp) {
      toast.error("Invalid OTP");
      return;
    }

    try {
      if (confirmOtpResponse.data.logged === true) {
        setSessionData({
          session_token: confirmOtpResponse.data.session_token,
          user_id: confirmOtpResponse.data.results.rows[0].user_id,
          username: confirmOtpResponse.data.results.rows[0].username,
          nic_number: confirmOtpResponse.data.results.rows[0].nic_number,
          selectedLanguage: confirmOtpResponse.data.results.rows[0].language,
          mobileNumber: confirmOtpResponse.data.results.rows[0].mobile_number,
        });
        navigate("/");
      } else {
        toast.error(confirmOtpResponse.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 lg:mx-12 my-12 rounded-lg dark:bg-gray-900 border border-black">
      <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter details to checkout
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleConfirmOtp}
            >
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={otp}
                  onChange={handleChangeOtp}
                  maxLength={6}
                />
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={otp}
                  onChange={handleChangeOtp}
                  maxLength={6}
                />
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
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
                CHECKOUT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentGatewayCheckout;
