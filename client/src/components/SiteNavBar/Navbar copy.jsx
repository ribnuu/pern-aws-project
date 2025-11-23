import { Link, Outlet } from "react-router-dom";
import SearchAndOtherTab from "../searchAndOtherTab";
import { useEffect, useState } from "react";
import logo from "/logo.png";
import LanguageSelectionHomeScreen from "../Language/LanguageSelectionHomeScreen";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { FaAccessibleIcon } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  const [loginUpdate, setLoginUpdate] = useState(false);
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [userid, setUserid] = useState("");
  const [sessiontoken, setSessionToken] = useState("");
  const [HomeMenuQuery, setHomeMenuQuery] = useState("");

  const getLocalStorageData = () => {
    setUserid(localStorage.getItem("user_id"));
    setUsername(localStorage.getItem("user_name"));
    setSessionToken(localStorage.getItem("session_token"));
    setMobileNumber(localStorage.getItem("mobileNumber"));
  };
  useEffect(() => {
    getLocalStorageData();
  }, []);
  useEffect(() => {}, [userid]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <hr className="border-red-500" />
      <div className="mx-5">
        <div className="md:grid md:grid-cols-3 justify-between">
          <div className="w-full">
            <Link to="/">
              <img
                src={logo}
                className="w-36 border border-red-500 rounded-md p-3 my-4"
              />
            </Link>
            <div className="hidden md:flex ml-0 mt-4 space-x-2 text-left">
              <Button
                variant="contained"
                component={Link}
                to="/about-us"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  minWidth: "40px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                color="error"
              >
                About Us
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/services"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  minWidth: "40px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Services
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/solutions"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Solutions
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/compliance"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Compliance
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/cloud-security"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Cloud Security
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/contact-us"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Contact Us
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/terms-and-conditions"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Terms and Conds
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/refund-policy"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: "25px",
                  pl: "8px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  maxWidth: "200px",
                }}
                color="error"
              >
                Refund Policy
              </Button>
            </div>
            <div className="md:hidden ml-auto mt-1">
              <IconButton onClick={handleMenuOpen}>
                <CiMenuBurger />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/about-us"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  About Us
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/services"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Services
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/solutions"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Solutions
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/compliance"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Compliance
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/cloud-security"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Cloud Security
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/contact-us"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Contact Us
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/terms-and-conditions"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Terms and Conditions
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/refund-policy"
                  onClick={handleMenuClose}
                  sx={{ textTransform: "uppercase", fontSize: "12px" }}
                >
                  Refund Policy
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="md:col-span-2 gap-2 my-auto justify-center lg:hidden">
            <SearchAndOtherTab
              user_id={userid}
              username={username}
              setHomeMenuQuery={setHomeMenuQuery}
              mobileNumber={mobileNumber}
            />
          </div>
        </div>

        <div className="text-xs my-8 lg:my-16">
          <div className="grid gap-2">
            <div className="hidden lg:block">
              <SearchAndOtherTab
                user_id={userid}
                username={username}
                setHomeMenuQuery={setHomeMenuQuery}
                mobileNumber={mobileNumber}
              />
            </div>
          </div>
        </div>
        {!userid && <LanguageSelectionHomeScreen />}
        <div>
          <Outlet context={[HomeMenuQuery]} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
