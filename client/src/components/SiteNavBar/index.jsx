import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "/logo.jpg";
// import SearchAndOtherTab from "../searchAndOtherTab";
import Items from "./items";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../hooks/useWindowSize";
import SearchAndOtherTabWeb from "../SearchAndOtherTab/SearchAndOtherTabWeb";
import SearchAndOtherTabMobile from "../SearchAndOtherTab/SearchAndOtherTabMobile";

const Navbar = () => {
  const navigate = useNavigate();
  const { width, isMobile } = useWindowSize(); // Custom hook to get window size
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userid, setUserid] = useState("");
  const [sessiontoken, setSessionToken] = useState("");
  const [HomeMenuQuery, setHomeMenuQuery] = useState("");

  const uuid = useSelector((state) => state.authReducer.userId);
  useEffect(() => {
    if (uuid && uuid !== "") {
      setUserid(localStorage.getItem("user_id"));
    }
  }, [uuid]);

  // Redirect to login if on mobile and user is not logged in
  useEffect(() => {
    if (isMobile && !userid && uuid) {
      navigate("/login");
    }
  }, [isMobile, userid, navigate]);

  const getLocalStorageData = () => {
    setUserid(localStorage.getItem("user_id"));
    setUsername(localStorage.getItem("user_name"));
    setSessionToken(localStorage.getItem("session_token"));
    setMobileNumber(localStorage.getItem("mobileNumber"));
  };

  useEffect(() => {
    getLocalStorageData();
  }, []);
  // useEffect(() => {}, [userid]);

  // const [isSearchVisible, setIsSearchVisible] = useState(false);
  // const [isNavVisible, setIsNavVisible] = useState(false);

  // const handleSearchToggle = () => {
  //   setIsSearchVisible((prev) => !prev);
  // };

  // const handleNavToggle = () => {
  //   setIsNavVisible((prev) => !prev);
  // };

  // const toggleAvatar = () => {
  //   setShowAvatrCont(!showAvatarCont);
  // };
  // const [showAvatarCont, setShowAvatrCont] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div
          className={`flex flex-wrap items-center justify-between p-4 ${"mx-1"}`}
        >
          <div
            id="dropdownNavbar"
            className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-400"
              aria-labelledby="dropdownLargeButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>

          {/* <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
            className="h-auto border-2 border-red-500 rounded-md p-1 py-2 px-2 my-4 hover:cursor-pointer"
            style={{ maxWidth: "25%" }}
          /> */}
          <div
            className="flex flex-col items-left cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1
              style={{ fontFamily: "monospace" }}
              className="text-red-500 font-bold"
            >
              ELITE CYBER TASK FORCE
            </h1>
            <p
              style={{ fontFamily: "monospace", fontSize: "10.5px" }}
              className="text-sm text-red-500 "
            >
              YOUR SECURITY. OUR PRIORITY.
            </p>
          </div>

          <div
            className={`${
              userid
                ? "flex flex-row justify-end space-x-2 md:flex-row md:justify-center md:items-center md:space-x-4 md:w-auto" // Logged In
                : "flex flex-row justify-end space-x-2 md:flex-row md:justify-center md:items-center md:space-x-4 md:w-auto" // Not logged in
            }`}
            id="navbar-solid-bg"
          >
            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-hamburger"
              type="button"
              className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div className={`${userid && "hidden"}`}>
              <button
                onClick={(e) => navigate("/login")}
                type="button"
                className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`${isMenuOpen ? "" : "hidden"} w-full`}
            id="navbar-hamburger"
          >
            <Items />
          </div>
        </div>
      </nav>
      <div className="">
        <div className={`${userid ? "" : "hidden"}`}>
          <div className="text-xs my-1 lg:my-12">
            <div className="grid gap-2">
              <div className="lg:block">
                {width >= 768 ? (
                  <SearchAndOtherTabWeb
                    user_id={userid}
                    username={username}
                    setHomeMenuQuery={setHomeMenuQuery}
                    mobileNumber={mobileNumber}
                  />
                ) : (
                  <SearchAndOtherTabMobile
                    user_id={userid}
                    username={username}
                    setHomeMenuQuery={setHomeMenuQuery}
                    mobileNumber={mobileNumber}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Outlet context={[HomeMenuQuery]} />
      </div>
    </>
  );
};

export default Navbar;
