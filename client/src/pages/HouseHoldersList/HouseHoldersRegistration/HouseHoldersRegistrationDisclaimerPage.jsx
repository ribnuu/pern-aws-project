import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const HouseHoldersRegistrationDisclaimerPage = () => {
  return (
    // <div className="container mx-auto p-4">
    <div className=" mx-auto ">
      {/* Disclaimer Section */}
      <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-400 mb-4">
        <div className="flex items-center mb-4">
          <WarningIcon className="text-yellow-600 mr-4" />
          <h1 className="text-sm font-bold text-yellow-600">
            Important Disclaimer
          </h1>
        </div>

        <p className="text-sm mb-4">
          House Holder's List - Declaration under Police Ordinance Section 76
        </p>

        {/* Why Registration is Required */}
        <h2 className="text-sm font-medium text-gray-700">
          Why are you required to fill this form?
        </h2>
        <p className="text-sm mb-4">
          Householders are required to provide specific information in
          compliance with regulatory obligations under local laws. This
          submission is vital to ensure adherence to safety, security, and legal
          protocols. By completing this process, householders contribute to
          maintaining a secure and law-abiding community environment.
        </p>

        {/* Contact Information Section */}
        <h2 className="text-sm font-medium text-gray-700">
          Questions or Queries?
        </h2>
        <p className="text-sm mb-4">
          If you have any questions or concerns regarding this registration
          process, please reach out to us using the contact details below:
        </p>

        <ul className="list-disc pl-6 text-sm mb-4">
          <li>Phone: (+94) 11 2421111</li>
        </ul>

        <p className="text-sm">
          Thank you for your cooperation in ensuring the safety and compliance
          of our nation. We appreciate your attention to this matter.
        </p>
      </div>

      {/* Note Section */}
      {/* <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
        <h2 className="text-sm font-medium text-gray-700">Note</h2>
        <p className="text-sm mb-4">
          Failure to complete this registration may result in penalties or other
          legal actions as required by law. Please take a moment to review the
          necessary details and submit the required information at your earliest
          convenience.
        </p>
      </div> */}
    </div>
  );
};

export default HouseHoldersRegistrationDisclaimerPage;
