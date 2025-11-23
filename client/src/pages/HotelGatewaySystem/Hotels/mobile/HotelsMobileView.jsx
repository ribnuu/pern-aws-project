// import React, { useState } from "react";
// import { formatDateToWords } from "../../../../utils/dateUtils";
// import LISpinnerWithTextTwo from "../../../../components/LoadingIndicators/LISpinnerWithTextTwo";

// const HotelsMobileView = ({
//   groupedCccHotelsData,
//   navigate,
//   loading = false,
// }) => {
//   const [openAccordion, setOpenAccordion] = useState(null);

//   const toggleAccordion = (index) => {
//     setOpenAccordion(openAccordion === index ? null : index);
//   };

//   return (
//     <div className="flex-grow overflow-y-auto bg-white shadow-lg rounded-lg p-6">
//       {loading ? (
//         <LISpinnerWithTextTwo label="Loading..." />
//       ) : (
//         Object.keys(groupedCccHotelsData).map((groupKey) => (
//           <div key={groupKey} className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//               {groupKey}
//             </h2>

//             {/* Desktop View: Table */}
//             <div className="hidden lg:block">
//               <table className="min-w-full bg-white rounded-lg shadow-md">
//                 <thead className="bg-blue-600 text-white">
//                   <tr>
//                     {[
//                       "Hotel Name",
//                       "Rooms",
//                       "Star Hotel",
//                       "Rating",
//                       "Security Officials",
//                       "Security Cameras",
//                       "Fire Safety Options",
//                       "Access Control",
//                       "Emergency Preparedness",
//                       "Visitor Management",
//                       "Incident Reporting",
//                       "Manager Contact",
//                       "Security Contact",
//                       "Last Updated",
//                     ].map((header) => (
//                       <th
//                         key={header}
//                         className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider"
//                       >
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {groupedCccHotelsData[groupKey].map((hotel) => (
//                     <tr
//                       key={hotel.id}
//                       className={`hover:bg-gray-50 ${
//                         !hotel?.is_active ? "opacity-50" : ""
//                       }`}
//                     >
//                       <td
//                         className="px-6 py-4 text-sm text-gray-800 cursor-pointer hover:underline"
//                         onClick={() =>
//                           navigate("/hotel/details", {
//                             state: { hotelId: hotel.id },
//                           })
//                         }
//                       >
//                         {hotel.name}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.rooms}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.is_star_hotel ? "Yes" : "No"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.rating}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.security_officials}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.security_cameras}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.fire_safety_options?.join(", ")}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.access_control?.join(", ")}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.emergency_preparedness?.join(", ")}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.visitor_management?.join(", ")}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.incident_reporting?.join(", ")}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.manager_contact_number}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {hotel.security_contact_number}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-700">
//                         {formatDateToWords(hotel.updated_at)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile View: Accordion */}
//             <div className="lg:hidden">
//               {groupedCccHotelsData[groupKey].map((hotel, index) => (
//                 <div key={hotel.id} className="mb-4 border-b">
//                   <button
//                     onClick={() => toggleAccordion(index)}
//                     className="w-full text-left px-4 py-3 bg-blue-600 text-white font-semibold"
//                   >
//                     {hotel.name}
//                   </button>
//                   {openAccordion === index && (
//                     <div className="bg-gray-100 p-4">
//                       <p>
//                         <strong>Rooms:</strong> {hotel.rooms}
//                       </p>
//                       <p>
//                         <strong>Star Hotel:</strong>{" "}
//                         {hotel.is_star_hotel ? "Yes" : "No"}
//                       </p>
//                       <p>
//                         <strong>Rating:</strong> {hotel.rating}
//                       </p>
//                       <p>
//                         <strong>Security Officials:</strong>{" "}
//                         {hotel.security_officials}
//                       </p>
//                       <p>
//                         <strong>Security Cameras:</strong>{" "}
//                         {hotel.security_cameras}
//                       </p>
//                       <p>
//                         <strong>Fire Safety Options:</strong>{" "}
//                         {hotel.fire_safety_options?.join(", ")}
//                       </p>
//                       <p>
//                         <strong>Access Control:</strong>{" "}
//                         {hotel.access_control?.join(", ")}
//                       </p>
//                       <p>
//                         <strong>Emergency Preparedness:</strong>{" "}
//                         {hotel.emergency_preparedness?.join(", ")}
//                       </p>
//                       <p>
//                         <strong>Visitor Management:</strong>{" "}
//                         {hotel.visitor_management?.join(", ")}
//                       </p>
//                       <p>
//                         <strong>Incident Reporting:</strong>{" "}
//                         {hotel.incident_reporting?.join(", ")}
//                       </p>
//                       <p>
//                         <strong>Manager Contact:</strong>{" "}
//                         {hotel.manager_contact_number}
//                       </p>
//                       <p>
//                         <strong>Security Contact:</strong>{" "}
//                         {hotel.security_contact_number}
//                       </p>
//                       <p>
//                         <strong>Last Updated:</strong>{" "}
//                         {formatDateToWords(hotel.updated_at)}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HotelsMobileView;

// import React, { useState } from "react";
// import { formatDateToWords } from "../../../../utils/dateUtils";
// import LISpinnerWithTextTwo from "../../../../components/LoadingIndicators/LISpinnerWithTextTwo";
// import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

// const HotelsMobileView = ({
//   groupedCccHotelsData,
//   navigate,
//   loading = false,
// }) => {
//   const [openMainGroup, setOpenMainGroup] = useState(null); // Track the open main group
//   const [openHotel, setOpenHotel] = useState(null); // Track the open hotel

//   // Toggle the main group accordion (e.g., City, Province, etc.)
//   const toggleMainGroup = (groupKey) => {
//     setOpenMainGroup((prev) => (prev === groupKey ? null : groupKey));
//   };

//   // Toggle the hotel accordion
//   const toggleHotel = (hotelId) => {
//     setOpenHotel((prev) => (prev === hotelId ? null : hotelId));
//   };

//   return (
//     <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg">
//       {loading ? (
//         <LISpinnerWithTextTwo label="Loading..." />
//       ) : (
//         Object.keys(groupedCccHotelsData).map((groupKey) => (
//           <div key={groupKey}>
//             {/* Main group accordion (e.g., City, Province, etc.) */}
//             <h2
//               className="bg-gray-200 px-6 py-2 text-md cursor-pointer uppercase h-10 flex justify-between items-center"
//               onClick={() => toggleMainGroup(groupKey)} // Toggle main group visibility
//             >
//               {groupKey}
//               {openMainGroup === groupKey ? (
//                 <FaChevronCircleUp className="text-gray-600" /> // Up arrow when expanded
//               ) : (
//                 <FaChevronCircleDown className="text-gray-600" /> // Down arrow when collapsed
//               )}
//             </h2>

//             {openMainGroup === groupKey && ( // Only show hotels if the main group is open
//               <div className="bg-gray-100">
//                 {groupedCccHotelsData[groupKey].map((hotel) => (
//                   <div key={hotel.id} className="border-b border-gray-200">
//                     {/* Hotel accordion */}
//                     <div
//                       className="px-6 py-4 flex justify-between items-center cursor-pointer"
//                       onClick={() => toggleHotel(hotel.id)} // Toggle hotel visibility
//                     >
//                       <div className="text-sm text-gray-900">{hotel.name}</div>
//                       {openHotel === hotel.id ? (
//                         <FaChevronCircleUp className="text-gray-400" /> // Up arrow when expanded
//                       ) : (
//                         <FaChevronCircleDown className="text-gray-400" /> // Down arrow when collapsed
//                       )}
//                     </div>

//                     {openHotel === hotel.id && (
//                       <div className="bg-gray-50 px-6 py-4 space-y-2">
//                         <div className="text-sm">
//                           <strong>Rooms:</strong> {hotel.rooms}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Star Hotel:</strong>{" "}
//                           {hotel.is_star_hotel ? "Yes" : "No"}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Rating:</strong> {hotel.rating}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Security Officials:</strong>{" "}
//                           {hotel.security_officials}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Security Cameras:</strong>{" "}
//                           {hotel.security_cameras}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Fire Safety Options:</strong>{" "}
//                           {hotel.fire_safety_options?.join(", ")}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Access Control:</strong>{" "}
//                           {hotel.access_control?.join(", ")}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Emergency Preparedness:</strong>{" "}
//                           {hotel.emergency_preparedness?.join(", ")}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Visitor Management:</strong>{" "}
//                           {hotel.visitor_management?.join(", ")}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Incident Reporting:</strong>{" "}
//                           {hotel.incident_reporting?.join(", ")}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Manager Contact:</strong>{" "}
//                           {hotel.manager_contact_number}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Security Contact:</strong>{" "}
//                           {hotel.security_contact_number}
//                         </div>
//                         <div className="text-sm">
//                           <strong>Last Updated:</strong>{" "}
//                           {formatDateToWords(hotel.updated_at)}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HotelsMobileView;
