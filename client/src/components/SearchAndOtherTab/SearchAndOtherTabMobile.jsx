import React, { useEffect, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { MdArrowForward, MdRefresh, MdTextsms } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdLiveHelp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { FaLanguage } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import "../NotificationIcon.css";

import { Link, useNavigate } from "react-router-dom";
import useSelectedLanguage from "../../hooks/useSelectedLanguage";
import { useDispatch, useSelector } from "react-redux";
import { checkNotificationsAvailable } from "../../store/notifications/NotificationsSlice";
import { logoutApi } from "../../apis/AuthApiService";

const SearchAndOtherTabMobile = ({
  user_id,
  username,
  setHomeMenuQuery,
  mobileNumber,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notificationsReducer.notifications
  );

  const { selectedLanguage, handleUpdateLanguageInDb } = useSelectedLanguage();
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    const searchTextForm = e.target.value;
    setSearchText(searchTextForm);
    setHomeMenuQuery(searchTextForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Finds only the first instance of the word window.find()
    // window.find(searchText)
  };
  const sessiontoken = localStorage.getItem("session_token");
  const userId = localStorage.getItem("user_id");
  const mobileNumberFromLS = localStorage.getItem("mobileNumber");

  useEffect(() => {
    // Dispatch action to check notifications availability on component mount
    if (userId && mobileNumberFromLS) {
      dispatch(checkNotificationsAvailable(userId, mobileNumberFromLS));
    }
  }, []);

  const handleLogout = async () => {
    // Remove items from localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("session_token");
    localStorage.removeItem("nic_number");
    localStorage.removeItem("selectedLanguage");

    let logoutLatitude = "";
    let logoutLongitude = "";

    try {
      // Attempt to get current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // If position is obtained, set latitude and longitude
      logoutLatitude = position.coords.latitude;
      logoutLongitude = position.coords.longitude;
    } catch (error) {
      // Handle errors (e.g., permission denied)
      console.error("Error getting location:", error);
    }

    try {
      // Attempt to logout with coordinates
      const loginResponse = await logoutApi({
        sessiontoken,
        logoutLatitude,
        logoutLongitude,
      });

      if (loginResponse.logged === false) {
        window.location.reload(); // Reload the page if logout is successful
      } else {
        setError(loginResponse.error); // Handle error response from server
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/"); // Always navigate to "/" regardless of success or failure
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleFront = () => {
    navigate(+1); // Navigate back to the previous page
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the current page
  };

  return (
    <div className="mx-5 flex flex-col lg:flex-row gap-4 lg:-my-6 justify-stretch">
      <div className="lg:w-11/12">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center lg:pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              name="search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-black appearance-none  bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-black dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-black"
              placeholder="Search"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 lg:px-20 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-2 my-auto justify-center">
        <Link to="/">
          <div className="bg-white p-3 text-xl rounded-md text-black border border-black">
            <AiFillHome />
          </div>
        </Link>
        {/* <Link to="/chatUI/1">
          <div className="bg-white p-3 text-xl rounded-md text-black border border-black">
            <MdTextsms />
          </div>
        </Link> */}
        <div
          className="bg-white p-3 text-xl rounded-md text-black border border-black cursor-pointer"
          onClick={handleBack} // Trigger handleBack on click
        >
          <MdArrowBack /> {/* Use the arrow icon */}
        </div>

        <div
          className="bg-white p-3 text-xl rounded-md text-black border border-black cursor-pointer"
          onClick={handleRefresh} // Trigger handleBack on click
        >
          <MdRefresh /> {/* Use the arrow icon */}
        </div>

        <div
          className="bg-white p-3 text-xl rounded-md text-black border border-black cursor-pointer"
          onClick={handleFront} // Trigger handleBack on click
        >
          <MdArrowForward /> {/* Use the arrow icon */}
        </div>

        {/* <Link to="/customer-care-number">
          <div className="bg-white p-3 text-xl rounded-md text-black border border-black">
            <AiFillPhone />
          </div>
        </Link> */}
        <Link to="/not">
          <div
            className={`bg-white p-3 text-xl rounded-md text-black border border-black ${
              notifications && notifications.length > 0 && "animate-blink"
            }`}
          >
            <IoMdNotifications />
          </div>
        </Link>

        {/* <Link to="/request-for-help">
          <div className="bg-white p-3 text-xl rounded-md text-black border border-black">
            <MdLiveHelp />
          </div>
        </Link> */}
        <div className="dropdown dropdown-end bg-white p-3 text-xl rounded-md border border-black ">
          <label tabIndex={0} className="text-black">
            <FaLanguage />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 text-black text-xs"
          >
            <li color="red">
              <button
                style={{ color: selectedLanguage === "si" ? "blue" : "black" }}
                onClick={async () => await handleUpdateLanguageInDb("si")}
              >
                සිංහල
              </button>
            </li>
            <li>
              <button
                style={{ color: selectedLanguage === "ta" ? "blue" : "black" }}
                onClick={async () => await handleUpdateLanguageInDb("ta")}
              >
                தமிழ்
              </button>
            </li>
            <li>
              <button
                style={{ color: selectedLanguage === "en" ? "blue" : "black" }}
                onClick={async () => await handleUpdateLanguageInDb("en")}
              >
                English
              </button>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end bg-white p-3 text-xl rounded-md border border-black ">
          <label tabIndex={0} className="text-black">
            <CgProfile />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 text-black text-xs"
          >
            {username && (
              <li>
                <a>
                  {username} <br /> {mobileNumber}
                </a>
              </li>
            )}
            {!user_id && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {user_id && (
              <li
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/profile-settings");
                }}
              >
                <p>Profile Settings</p>
              </li>
            )}
            {user_id && (
              <li onClick={handleLogout}>
                <p>Logout</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchAndOtherTabMobile;
