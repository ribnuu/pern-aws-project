import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { FormattedMessage } from "react-intl"; // Import FormattedMessage

const HotelRegistrationDisclaimerPage = () => {
  return (
    // <div className="container mx-auto p-4">
    <div className=" mx-auto pb-4">
      <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-400 mb-4">
        <div className="flex items-center mb-4">
          <WarningIcon className="text-yellow-600 me-4" />
          <h1 className=" font-semibold text-yellow-600">
            <FormattedMessage
              id="app.hotel.disclaimer_section.important_disclaimer"
              defaultMessage="Important Disclaimer"
            />
          </h1>
        </div>

        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.disclaimer_section.registration_process"
            defaultMessage="Please be informed that the following registration process is a regulation and requirement set by the local Police Department. This is to ensure compliance with the latest public safety and security protocols."
          />
        </p>

        <h2 className="text-md font-medium text-gray-700">
          <FormattedMessage
            id="app.hotel.disclaimer_section.why_required"
            defaultMessage="Why are you required to fill this form?"
          />
        </h2>
        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.disclaimer_section.regulatory_requirements"
            defaultMessage="As part of regulatory requirements, hotels are required to submit certain information for safety, security, and legal purposes. This helps the authorities keep track of activities related to public safety and ensures that the local laws are being followed. By completing this form, you are contributing to maintaining a secure environment for all guests and staff."
          />
        </p>

        <h2 className="text-md font-medium text-gray-700">
          <FormattedMessage
            id="app.hotel.disclaimer_section.questions_queries"
            defaultMessage="Questions or Queries?"
          />
        </h2>
        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.disclaimer_section.contact_support"
            defaultMessage="If you have any questions or concerns regarding this registration process, please don't hesitate to reach out to us. You can contact our support team at:"
          />
        </p>

        <ul className="list-disc pl-6 text-sm mb-4">
          <li>Phone: (+94) 11-23232332</li>
        </ul>

        <p className="text-sm">
          <FormattedMessage
            id="app.hotel.disclaimer_section.thank_you"
            defaultMessage="Thank you for your cooperation in ensuring the safety and compliance of all hotel operations. We appreciate your attention to this matter."
          />
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
        <h2 className="text-md font-medium text-gray-700">
          <FormattedMessage
            id="app.hotel.disclaimer_section.note"
            defaultMessage="Note"
          />
        </h2>
        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.disclaimer_section.failure_to_complete"
            defaultMessage="Failure to complete this registration may result in penalties or other legal actions as required by law. Please take a moment to review the necessary details and submit the required information at your earliest convenience."
          />
        </p>
      </div>
    </div>
  );
};

export default HotelRegistrationDisclaimerPage;
