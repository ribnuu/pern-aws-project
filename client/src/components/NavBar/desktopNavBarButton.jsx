import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";

const DesktopNavBarButton = ({ label, toLink }) => {
  return (
    <>
      <div className="hidden md:flex ml-0 mt-4 space-x-2 text-left">
        <Button
          variant="contained"
          component={Link}
          to={toLink}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            textTransform: "uppercase",
            fontSize: "10px",
            fontWeight: "bold",
            height: "25px",
            pl: "12px", // Adjust padding-left as needed
            minWidth: "80px", // Adjust minWidth for longer text
            paddingTop: "0px",
            paddingBottom: "0px",
            whiteSpace: "nowrap", // Prevent text wrapping
            overflow: "hidden", // Hide overflow if necessary
            textOverflow: "ellipsis", // Show ellipsis for overflow text
          }}
          color="error"
        >
          {label}
        </Button>
      </div>
    </>
  );
};

export default DesktopNavBarButton;
