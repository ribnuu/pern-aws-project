import React, { useRef, useState } from "react";
import HouseHoldersRegistrationForm from "./HouseHoldersRegistrationForm";
import { Toaster } from "react-hot-toast";
import HouseHoldersRegistrationStepper from "./HouseHoldersRegistrationStepper";
import {
  Announcement,
  AssignmentTurnedIn,
  CheckCircleOutline,
  House,
  PersonAdd,
  SupervisorAccount,
} from "@mui/icons-material";
import { FaBaby, FaUserPlus } from "react-icons/fa";

const HouseHoldersRegistration = () => {
  const scrollRef = useRef(null);

  const scrollTo = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initialStepperData = {
    currentStep: 1,
    totalSteps: 6,
  };
  const [stepperData, setStepperData] = useState(initialStepperData);

  const steps = [
    {
      title: "Disclaimer",
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <Announcement className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: "House Information",
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <House className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: "Chief Occupant (C/O)",
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <SupervisorAccount className="w-6 h-6 text-gray-400 me-4" />,
    },
    {
      title: "Details OF Family Members",
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: (
        <FaBaby className="w-5 h-5 lg:w-10 lg:h-10 text-gray-400 me-4" />
      ),
    },
    {
      title: "Other Residents Including Domestic Assistants",
      iconCompleted: (
        <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
      ),
      iconPending: <PersonAdd className="w-10 h-10 text-gray-400 me-4" />,
    },
    // {
    //   title: "Confirmation",
    //   iconCompleted: (
    //     <CheckCircleOutline className="w-6 h-6 text-green-600 me-4" />
    //   ),
    //   iconPending: <Info className="w-6 h-6 text-gray-400 me-4" />,
    // },
    {
      title: "Acknowledgement",
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
          <HouseHoldersRegistrationStepper
            steps={steps}
            currentStep={stepperData?.currentStep}
          />
        </div>
        <div className="mt-5">
          <HouseHoldersRegistrationForm
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

export default HouseHoldersRegistration;
