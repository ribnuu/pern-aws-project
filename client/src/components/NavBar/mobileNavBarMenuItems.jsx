import React from "react";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const MobileNavBarMenuItems = ({ handleMenuClose }) => {
  return (
    <>
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
    </>
  );
};

export default MobileNavBarMenuItems;
