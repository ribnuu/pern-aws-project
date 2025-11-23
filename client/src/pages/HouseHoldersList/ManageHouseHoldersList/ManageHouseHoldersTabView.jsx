import React, { useState } from "react";
import {
  ChildCareRounded,
  Home,
  OtherHouses,
  People,
  Person,
  Security,
} from "@mui/icons-material";
import HouseHoldersPrimaryInformationForm from "../HouseHoldersRegistration/HouseHoldersPrimaryInformationForm";
import HouseHoldersChiefOccupantInfoForm from "../HouseHoldersRegistration/HouseHoldersChiefOccupantInfoForm";
import HouseHoldersFamilyMembersInfoForm from "../HouseHoldersRegistration/HouseHoldersFamilyMembersInfoForm";
import HouseHoldersOtherResidentsInfoForm from "../HouseHoldersRegistration/HouseHoldersOtherResidentsInfoForm";
// import HotelSecurityAssessmentForm from "../HotelRegistration/HotelSecurityAssesmentForm";
// import HotelInformationForm from "../HotelRegistration/HotelInformationForm";

const ManageHouseHoldersTabView = ({ formData }) => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("houseHoldersInformation");

  // Function to handle tab selection
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  console.log(formData);

  return (
    <div className="w-full">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
          data-tabs="tabs"
          role="list"
        >
          {/* House Info Tab */}
          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("houseHoldersInformation")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer ${
                selectedTab === "houseHoldersInformation"
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <Home className="w-4 h-4 mr-1.5" />
              <span className="ml-1">House Info</span>
            </a>
          </li>

          {/* Security Info Tab */}
          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("chiefOccupantInformation")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                selectedTab === "chiefOccupantInformation"
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <People className="w-4 h-4 mr-1.5" />
              <span className="ml-1">Chief Occupants</span>
            </a>
          </li>

          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("familyMembersInformation")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                selectedTab === "familyMembersInformation"
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <ChildCareRounded className="w-4 h-4 mr-1.5" />
              <span className="ml-1">Family Members</span>
            </a>
          </li>

          <li className="z-30 flex-auto text-center">
            <a
              onClick={() => handleTabSelect("otherResidentsInformation")}
              className={`z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer ${
                selectedTab === "otherResidentsInformation"
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
              role="tab"
            >
              <Person className="w-4 h-4 mr-1.5" />
              <span className="ml-1">Other Residents</span>
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {selectedTab === "houseHoldersInformation" && (
            <div>
              <HouseHoldersPrimaryInformationForm
                formData={formData}
                manage={true}
              />
            </div>
          )}
          {selectedTab === "chiefOccupantInformation" && (
            <div>
              <HouseHoldersChiefOccupantInfoForm manage={true} />
            </div>
          )}
          {selectedTab === "familyMembersInformation" && (
            <div>
              <HouseHoldersFamilyMembersInfoForm manage={true} />
            </div>
          )}
          {selectedTab === "otherResidentsInformation" && (
            <div>
              <HouseHoldersOtherResidentsInfoForm manage={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageHouseHoldersTabView;
