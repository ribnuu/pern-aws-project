// // // import React from "react";

// // // const CustomInputField = ({
// // //   id,
// // //   value,
// // //   onChange,
// // //   label,
// // //   type = "text",
// // //   placeholder = "",
// // //   disabled = false,
// // // }) => (
// // //   <div>
// // //     <label htmlFor={id} className="block text-sm font-medium mb-1">
// // //       {label}
// // //     </label>
// // //     <input
// // //       type={type}
// // //       id={id}
// // //       value={value}
// // //       onChange={(e) => onChange(e.target.value)}
// // //       className="w-full mt-1 px-3 py-2 border rounded-md"
// // //       placeholder={placeholder}
// // //       disabled={disabled}
// // //     />
// // //   </div>
// // // );

// // // export default CustomInputField;

// // import React from "react";

// // const CustomInputField = ({
// //   id,
// //   value,
// //   onChange,
// //   label,
// //   type = "text",
// //   placeholder = "",
// //   disabled = false,
// //   required = false, // New required prop
// // }) => {
// //   // Determine whether the field is required and empty
// //   const isRequiredAndEmpty = required && !value;

// //   return (
// //     <div className="mb-4">
// //       <label
// //         htmlFor={id}
// //         className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
// //       >
// //         {label}
// //         {required && (
// //           <span className="text-red-500 ml-1 text-lg font-semibold">*</span> // Red asterisk for required fields
// //         )}
// //       </label>
// //       <input
// //         type={type}
// //         id={id}
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// //           isRequiredAndEmpty ? "border-red-500" : "border-gray-300" // Apply red border if required and empty
// //         } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`} // Disabled field styling
// //         placeholder={placeholder}
// //         disabled={disabled}
// //       />
// //     </div>
// //   );
// // };

// // export default CustomInputField;

// import React from "react";

// const CustomInputField = ({
//   id,
//   value,
//   onChange,
//   label,
//   type = "text",
//   placeholder = "",
//   disabled = false,
//   required = false, // New required prop
// }) => {
//   return (
//     <div className="mb-4">
//       <label
//         htmlFor={id}
//         className="block text-sm font-medium text-gray-700 flex items-center"
//       >
//         {label}
//         {required && (
//           <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
//         )}
//       </label>
//       <input
//         type={type}
//         id={id}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//           disabled ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
//         }`} // No red border, only gray or blue border
//         placeholder={placeholder}
//         disabled={disabled}
//       />
//     </div>
//   );
// };

// export default CustomInputField;

// import React from "react";

// const CustomInputField = ({
//   id,
//   value,
//   onChange,
//   label,
//   type = "text", // Default type is "text", can also be "select"
//   placeholder = "",
//   disabled = false,
//   required = false,
//   options = [], // Options for select type
// }) => {
//   return (
//     <div className="mb-4">
//       <label
//         htmlFor={id}
//         className="block text-sm font-medium text-gray-700 flex items-center"
//       >
//         {label}
//         {required && (
//           <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
//         )}
//       </label>
//       {type === "select" ? (
//         <select
//           id={id}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//             disabled ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
//           }`}
//           disabled={disabled}
//         >
//           <option value="" disabled>
//             Select an option
//           </option>
//           {options.map((option) => (
//             <option key={option.id} value={option.id}>
//               {option.name}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           type={type}
//           id={id}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//             disabled ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
//           }`}
//           placeholder={placeholder}
//           disabled={disabled}
//         />
//       )}
//     </div>
//   );
// };

// export default CustomInputField;

import React from "react";
import Select from "react-select"; // Ensure this is imported

const CustomInputField = ({
  id,
  value,
  onChange,
  label,
  type = "text", // Default type is "text", can also be "select"
  placeholder = "",
  disabled = false,
  required = false,
  options = [], // Options for select type
}) => {
  const commonStyles =
    "w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const disabledStyles = "bg-gray-100 cursor-not-allowed";
  const enabledStyles = "border-gray-300";

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
        )}
      </label>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${commonStyles} ${
            disabled ? disabledStyles : enabledStyles
          }`}
          disabled={disabled}
          style={{ height: "42px" }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      ) : type === "searchable-select" ? (
        <Select
          id={id}
          value={options.find((opt) => opt.value === value)} // Find the object by matching the value
          onChange={(selectedOption) => onChange(selectedOption.value)} // Pass the value on change
          options={options}
          isDisabled={disabled}
          placeholder={placeholder}
          isSearchable
          className="w-full mt-1"
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${commonStyles} ${
            disabled ? disabledStyles : enabledStyles
          }`}
          placeholder={placeholder}
          disabled={disabled}
          style={{ height: "42px" }} // Explicit height matching the select field
        />
      )}
    </div>
  );
};

export default CustomInputField;
