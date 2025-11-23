import React from "react";

const HotelRegistrationStepper = ({ steps, currentStep }) => {
  return (
    <ol className="flex items-center w-full text-lg font-medium text-center text-gray-500 dark:text-gray-400 sm:text-xl">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber; // Completed steps
        const isActive = currentStep === stepNumber; // Current step

        return (
          <li
            key={index}
            className={`flex md:w-full items-center ${
              isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-400"
            } sm:after:content-[''] after:w-full after:h-2 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-6 dark:after:border-gray-700`}
          >
            <span className="flex items-center after:content-[''] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 cursor-pointer">
              {isCompleted
                ? step.iconCompleted || (
                    <span className="me-2">{stepNumber}</span>
                  )
                : step.iconPending || (
                    <span className="me-2">{stepNumber}</span>
                  )}
              <span className="hidden sm:inline-flex sm:ms-2">
                {step.title}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default HotelRegistrationStepper;

// import React from "react";

// const HotelRegistrationStepper = ({ steps, currentStep }) => {
//   return (
//     <div className="w-full">
//       {/* Horizontal Stepper for Desktop */}
//       <ol className="hidden md:flex items-center justify-between w-full text-sm sm:text-base lg:text-lg">
//         {steps.map((step, index) => {
//           const stepNumber = index + 1;
//           const isCompleted = currentStep > stepNumber;
//           const isActive = currentStep === stepNumber;

//           return (
//             <li
//               key={index}
//               className={`relative flex-1 flex items-center text-center ${
//                 isActive
//                   ? "text-blue-600 font-semibold dark:text-blue-500"
//                   : isCompleted
//                   ? "text-green-500 dark:text-green-400"
//                   : "text-gray-400 dark:text-gray-500"
//               }`}
//             >
//               <div
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
//                   isActive
//                     ? "bg-blue-500 text-white border-blue-500"
//                     : isCompleted
//                     ? "bg-green-500 text-white border-green-500"
//                     : "bg-gray-200 dark:bg-gray-700"
//                 }`}
//               >
//                 {stepNumber}
//               </div>
//               <span className="ml-3">{step.title}</span>
//               {/* {index < steps.length - 1 && (
//                 <div
//                   className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 h-1 w-full ${
//                     isCompleted
//                       ? "bg-green-500 dark:bg-green-400"
//                       : "bg-gray-300 dark:bg-gray-600"
//                   }`}
//                 ></div>
//               )} */}
//             </li>
//           );
//         })}
//       </ol>

//       {/* Condensed Stepper for Mobile */}
//       <ol className="flex flex-col gap-4 md:hidden w-full">
//         {steps.map((step, index) => {
//           const stepNumber = index + 1;
//           const isCompleted = currentStep > stepNumber;
//           const isActive = currentStep === stepNumber;
//           const isVisible =
//             stepNumber === currentStep ||
//             stepNumber === currentStep - 1 ||
//             stepNumber === currentStep + 1;

//           // Render only the previous, current, and next steps
//           if (!isVisible) return null;

//           return (
//             <li
//               key={index}
//               className={`flex items-start gap-3 ${
//                 isActive
//                   ? "text-blue-600 font-semibold dark:text-blue-500"
//                   : isCompleted
//                   ? "text-green-500 dark:text-green-400"
//                   : "text-gray-400 dark:text-gray-500"
//               }`}
//             >
//               <div
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
//                   isActive
//                     ? "bg-blue-500 text-white border-blue-500"
//                     : isCompleted
//                     ? "bg-green-500 text-white border-green-500"
//                     : "bg-gray-200 dark:bg-gray-700"
//                 }`}
//               >
//                 {stepNumber}
//               </div>
//               <div>
//                 <span className="text-sm sm:text-base">{step.title}</span>
//                 {isActive && (
//                   <p className="text-xs text-gray-500 mt-1">
//                     You are currently on this step
//                   </p>
//                 )}
//                 {isCompleted && (
//                   <p className="text-xs text-gray-400 mt-1">Completed</p>
//                 )}
//               </div>
//             </li>
//           );
//         })}

//         {/* Scrollable Steps for Remaining Steps */}
//         <div className="overflow-x-auto flex gap-4 mt-4">
//           {steps.map((step, index) => {
//             const stepNumber = index + 1;
//             const isVisible =
//               stepNumber === currentStep ||
//               stepNumber === currentStep - 1 ||
//               stepNumber === currentStep + 1;

//             // Skip visible steps to avoid duplication
//             if (isVisible) return null;

//             return (
//               <div
//                 key={index}
//                 className="flex items-center justify-center w-8 h-8 rounded-full border bg-gray-200 dark:bg-gray-700 text-gray-500"
//               >
//                 {stepNumber}
//               </div>
//             );
//           })}
//         </div>
//       </ol>
//     </div>
//   );
// };

// export default HotelRegistrationStepper;
