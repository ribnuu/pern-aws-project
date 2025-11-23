import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecord, resetState } from "../../../store/form/FormSlice";
import { createHotelApi } from "../../../apis/CccHotelGatewaySystemApiService";
import toast from "react-hot-toast";
import HotelInformationForm from "./HotelInformationForm";
import HotelSecurityAssesmentForm from "./HotelSecurityAssesmentForm";
import HotelRegistrationReview from "./HotelRegistrationReview";
import HotelRegistrationDisclaimerPage from "./HotelRegistrationDisclaimerPage";
import HotelRegistrationAcknowledgementPage from "./HotelRegistrationAcknowledgementPage";
import { FormattedMessage } from "react-intl";
import { validateForm } from "../../../utils/validateForm";
import { useNavigate } from "react-router-dom";

const HotelRegistrationForm = ({ stepperData, setStepperData, scrollTo }) => {
  const navigate = useNavigate();
  const initialData = {
    name: "Test Hotel 1",
    street_address: "1",
    address_line_2: "Hotel Lane",
    province_id: "9",
    district_id: "5",
    city_id: "2",
    postal_code: "00200",
    location_url: "https://google.com?1231",
    manager_contact_number: "+94772212121",
    security_contact_number: "+94772212121",
    website: "https://google.com?1231",
    facebook: "https://google.com?1231",
    instagram: "https://google.com?1231",
    rooms: 25,
    type: "villa",
    is_star_hotel: true,
    rating: 4,
    description: "Hotel Description",
  };
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector(
    (state) => state.formReducer
  );

  // useEffect(() => {
  //   if (initialData && Object.keys(initialData).length > 0) {
  //     console.log("Executed");

  //     dispatch(
  //       HandleChangeFormData({
  //         key: "batchUpdate",
  //         value: initialData,
  //       })
  //     );
  //   }
  // }, [initialData, dispatch]);

  useEffect(() => {
    if (error) {
      const msg = typeof error === "object" ? error?.error : error;
      toast.error(msg);
    }
  }, [error]);

  const validationRules = [
    { field: "type", name: "Hotel Type", required: true },
    { field: "name", name: "Name", required: true },
    { field: "street_address", name: "Street Address", required: true },
    { field: "location_url", name: "Location URL", required: true },
    { field: "city_id", name: "City", required: true },
    { field: "rooms", name: "Rooms", required: true },
    {
      field: "hotel_main_contact_number",
      name: "Hotel Main Contact Number",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValidationMsg = validateForm(formData, validationRules);

    if (formValidationMsg !== true) {
      toast.error(formValidationMsg);
      return;
    }

    if (!formData?.is_acknowledged) {
      toast.error("Please acknowledge");
      return;
    }

    // Dispatch createRecord thunk
    dispatch(
      createRecord({
        apiFunction: createHotelApi,
        reqBody: formData,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Hotel registered successfully.");
        dispatch(resetState());

        // Delay navigate by 5sec
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    });
  };

  useEffect(() => {
    dispatch(resetState());
  }, []);

  console.log("test", formData);

  return (
    <>
      {stepperData?.currentStep === 1 && <HotelRegistrationDisclaimerPage />}

      {stepperData?.currentStep === 2 && (
        <HotelInformationForm formData={formData} />
      )}

      {stepperData?.currentStep === 3 && (
        <HotelSecurityAssesmentForm formData={formData} />
      )}

      {stepperData?.currentStep === 4 && (
        <div className="mb-4">
          <HotelRegistrationReview formData={formData} />
        </div>
      )}

      {stepperData?.currentStep === 5 && (
        <HotelRegistrationAcknowledgementPage />
      )}

      {/* Submit Button */}
      <div className="flex justify-between items-center w-full">
        <button
          type="button"
          className={`${
            stepperData?.currentStep > 1 ? "bg-blue-600" : "bg-gray-600"
          } px-4 py-2 rounded text-white`}
          disabled={stepperData?.currentStep <= 1}
          onClick={(e) => {
            e.preventDefault();
            scrollTo();
            setStepperData({
              ...stepperData,
              currentStep: stepperData.currentStep - 1,
            });
          }}
        >
          <FormattedMessage
            id="app.general.button_label.previous"
            defaultMessage="Previous"
          />
        </button>

        {stepperData?.currentStep != stepperData?.totalSteps && (
          <button
            type="button"
            className={`px-4 py-2 rounded bg-blue-600 text-white`}
            disabled={stepperData?.currentStep > stepperData?.totalSteps}
            onClick={(e) => {
              e.preventDefault();
              let formValdiationMsg = true;
              if (stepperData.currentStep === 2) {
                formValdiationMsg = validateForm(formData, validationRules);
              }
              if (formValdiationMsg !== true) {
                toast.error(formValdiationMsg);
              } else {
                scrollTo();
                setStepperData({
                  ...stepperData,
                  currentStep: stepperData.currentStep + 1,
                });
              }
            }}
          >
            <FormattedMessage
              id="app.general.button_label.next"
              defaultMessage="Next"
            />
          </button>
        )}

        {stepperData?.currentStep === stepperData?.totalSteps && (
          <button
            onClick={handleSubmit}
            // type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${
              loading ? "bg-gray-400" : "bg-green-600 text-white"
            }`}
          >
            {loading ? "Processing..." : "Register Hotel"}
          </button>
        )}
      </div>
    </>
  );
};

export default HotelRegistrationForm;
