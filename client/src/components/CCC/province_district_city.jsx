// import React, { useState } from "react";
// import DistrictSearchComponent from "./DistrictSearchComponent";

// const DeliveryOptions = () => {
//   const [district, setDistrict] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSelectDistrict = (selectedDistrict) => {
//     setDistrict(selectedDistrict);
//     // Handle further logic, e.g., update delivery options
//   };

//   return (
//     <div>
//       <h2>Delivery Options</h2>
//       <form>
//         <DistrictSearchComponent
//           onSelectDistrict={handleSelectDistrict}
//           setLoading={setLoading}
//           loading={loading}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           hideLabel={false}
//           loadOnMount={false}
//         />
//         {/* Other delivery options */}
//         <button type="submit">Confirm Delivery</button>
//       </form>
//     </div>
//   );
// };

// export default DeliveryOptions;

// import React, { useState } from 'react';
// import ProvinceSearchComponent from './ProvinceSearchComponent';

// const AddressForm = () => {
//   const [province, setProvince] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSelectProvince = (selectedProvince) => {
//     setProvince(selectedProvince);
//     // Handle further logic, e.g., update form state
//   };

//   return (
//     <div>
//       <h2>Address Form</h2>
//       <form>
//         <ProvinceSearchComponent
//           onSelectProvince={handleSelectProvince}
//           setLoading={setLoading}
//           loading={loading}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           hideLabel={false}
//           loadOnMount={false}
//         />
//         {/* Other form fields */}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddressForm;

// import React, { useState } from 'react';
// import CitySearchComponent from './CitySearchComponent';

// const EventRegistrationForm = () => {
//   const [city, setCity] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSelectCity = (selectedCity) => {
//     setCity(selectedCity);
//     // Handle further logic, e.g., update registration details
//   };

//   return (
//     <div>
//       <h2>Event Registration</h2>
//       <form>
//         <CitySearchComponent
//           onSelectCity={handleSelectCity}
//           setLoading={setLoading}
//           loading={loading}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           hideLabel={false}
//           loadOnMount={false}
//         />
//         {/* Other registration fields */}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default EventRegistrationForm;
