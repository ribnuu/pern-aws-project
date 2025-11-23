import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { HandleChangeFormData } from "../../../store/form/FormSlice";
import { FormattedMessage } from "react-intl";

const HotelRegistrationAcknowledgementPage = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
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
    <div className="">
      <div className="bg-green-100 p-6 rounded-lg border border-green-400 mb-4">
        <div className="flex items-center mb-4">
          <CheckCircleIcon className="text-green-600 me-4" />
          <h1 className="text-sm font-semibold text-green-600">
            <FormattedMessage
              id="app.hotel.acknowledgement_confirmation"
              defaultMessage="Not Selected"
            />
          </h1>
        </div>

        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.acknowledgement_confirmation_text_1"
            defaultMessage="app.general.translation.no_translation"
          />
        </p>

        {/* <h2 className="text-xl font-medium text-gray-700">
          Why is this important?
        </h2> */}
        <p className="text-sm mb-4">
          <FormattedMessage
            id="app.hotel.acknowledgement_confirmation_text_2"
            defaultMessage="app.general.translation.no_translation"
          />
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
          label={
            <FormattedMessage
              id="app.hotel.acknowledgement_confirmation_text_3"
              defaultMessage="app.general.translation.no_translation"
            />
          }
        />
      </div>

      {/* <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
        <h2 className="text-xl font-medium text-gray-700">
          Important Reminder
        </h2>
        <p className="text-sm mb-4">
          Please ensure that all future updates or changes to your hotel's
          information are submitted promptly to avoid any issues with
          compliance.
        </p>
      </div> */}
    </div>
  );
};

export default HotelRegistrationAcknowledgementPage;
