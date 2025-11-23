import React, { useRef, useState } from "react";
import HotelRegistrationForm from "./HotelRegistraionForm";
import { Toaster } from "react-hot-toast";
import HotelRegistrationStepper from "./HotelRegistrationStepper";
import {
  Announcement,
  AssignmentTurnedIn,
  CheckCircleOutline,
  Hotel,
  Lock,
  Security,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

const HotelRegistration = () => {
  const scrollRef = useRef(null);

  const scrollTo = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initialStepperData = {
    currentStep: 1,
    totalSteps: 5,
  };
  const [stepperData, setStepperData] = useState(initialStepperData);

  const steps = [
    {
      title: <FormattedMessage id="app.hotel.disclaimer" />,
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <Announcement className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: <FormattedMessage id="app.hotel.hotel_info" />,
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <Hotel className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: <FormattedMessage id="app.hotel.security_info" />,
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <Security className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: <FormattedMessage id="app.hotel.confirmation" />,
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <Lock className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: <FormattedMessage id="app.hotel.acknowledgement" />,
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: (
        <AssignmentTurnedIn className="w-6 h-6 text-gray-400 me-4" />
      ),
    },
  ];

  return (
    <>
      <div
        ref={scrollRef}
        // className="m-5 p-5 bg-gray-50 rounded-md dark:bg-gray-900 border border-black overflow-hidden"
        className="m-5 p-5 bg-gray-50 rounded-md dark:bg-gray-900 border border-black"
      >
        <div>
          <HotelRegistrationStepper
            steps={steps}
            currentStep={stepperData?.currentStep}
          />
        </div>
        <div className="mt-5">
          <HotelRegistrationForm
            stepperData={stepperData}
            setStepperData={setStepperData}
            scrollTo={scrollTo}
          />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default HotelRegistration;
