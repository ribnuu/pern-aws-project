import React, { useState } from "react";
import DesktopNavBarButton from "./desktopNavBarButton";
import MobileNavBarMenuItems from "./mobileNavBarMenuItems";
import { IconButton, Menu } from "@mui/material";
import { CiMenuBurger } from "react-icons/ci";

const NavBarButtons = () => {
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
      {/* For Desktop */}
      <div className="hidden md:flex ml-0 mt-4 space-x-2 text-left">
        <DesktopNavBarButton label="About Us" toLink="/about-us" />
        <DesktopNavBarButton label="Services" toLink="/services" />
        <DesktopNavBarButton label="Solutions" toLink="/solutions" />
        <DesktopNavBarButton label="Compliance" toLink="/compliance" />
        <DesktopNavBarButton label="Cloud Security" toLink="/cloud-security" />
        <DesktopNavBarButton label="Contact Us" toLink="/contact-us" />
        <DesktopNavBarButton
          label="Terms and Conds"
          toLink="/terms-and-conditions"
        />
        <DesktopNavBarButton label="Refund Policy" toLink="/refund-policy" />
      </div>

      {/* For Mobile */}
      <div className="md:hidden ml-auto mt-1">
        <IconButton onClick={handleMenuOpen}>
          <CiMenuBurger />
        </IconButton>
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
          <MobileNavBarMenuItems handleMenuClose={handleMenuClose} />
        </Menu>
      </div>
    </>
  );
};

export default NavBarButtons;
