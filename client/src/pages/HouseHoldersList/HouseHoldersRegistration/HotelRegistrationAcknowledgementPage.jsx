import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { HandleChangeFormData } from "../../../store/form/FormSlice";

const HotelRegistrationAcknowledgementPage = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    // console.log("event:", event.target.checked);
    setIsChecked(event.target.checked);
    dispatch(
      HandleChangeFormData({
        key: "is_acknowledged",
        value: event.target.checked,
      })
    );
  };
  return (
    // <div className="container mx-auto p-4 max-w-4xl overflow-hidden">
    <div className="mb-4">
      <div className="bg-green-100 p-6 rounded-lg border border-green-400 mb-4">
        <div className="flex items-center mb-4">
          <CheckCircleIcon className="text-green-600 me-4" />
          <h1 className="text-sm font-semibold text-green-600">
            Acknowledgement Confirmation
          </h1>
        </div>
        <p className="text-sm mb-4">
          Thank you for completing the householder registration process.
        </p>

        <h2 className="text-sm font-medium text-gray-700">
          Before we proceed, please confirm that the details you have provided
          are accurate and up-to-date.
        </h2>
        <p className="text-sm mb-4">
          <br />
          Why is this important?
          <br />
          <span>
            By submitting your registration details, you are helping to maintain
            a safe and secure environment for yourself. The information you have
            provided will assist local authorities in ensuring public safety and
            compliance with applicable laws. It is important to ensure that the
            information is accurate to avoid any issues or discrepancies.
          </span>
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              name="acknowledgement"
              color="primary"
            />
          }
          label="I confirm that the information provided is correct and accurate."
        />
      </div>

      <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
        <h2 className="text-sm font-medium text-gray-700">
          Important Reminder
        </h2>
        <p className="text-sm mb-4">
          Please ensure that all future updates or changes to your householder's
          information are submitted promptly to avoid any issues with
          compliance.
        </p>
      </div>
    </div>
  );
};

export default HotelRegistrationAcknowledgementPage;
