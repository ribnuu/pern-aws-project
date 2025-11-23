import React, { useState } from "react";
import { Home, Security } from "@mui/icons-material";
import HotelSecurityAssessmentForm from "../HotelRegistration/HotelSecurityAssesmentForm";
import HotelInformationForm from "../HotelRegistration/HotelInformationForm";

const ManageHotelsTabView = ({ formData }) => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("hotelInfo");

  // Function to handle tab selection
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
          data-tabs="tabs"
          role="list"
        >
          {/* Hotel Info Tab */}
          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("hotelInfo")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                selectedTab === "hotelInfo"
                  ? "text-slate-900"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <Home className="w-4 h-4 mr-1.5" />
              <span className="ml-1">Hotel Info</span>
            </a>
          </li>

          {/* Security Info Tab */}
          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("securityInfo")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                selectedTab === "securityInfo"
                  ? "text-slate-900"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <Security className="w-4 h-4 mr-1.5" />
              <span className="ml-1">Security Info</span>
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {selectedTab === "hotelInfo" && (
            <div>
              <HotelInformationForm formData={formData} />
            </div>
          )}
          {selectedTab === "securityInfo" && (
            <div>
              <h2>Security Information</h2>
              <HotelSecurityAssessmentForm formData={formData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageHotelsTabView;
