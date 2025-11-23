// // src/hooks/useMobileNumber.js
// import { useState } from 'react';

// const useMobileNumber = (initialValue = '') => {
//   const [mobileNumber, setMobileNumber] = useState(initialValue);

//   const handleMobileNumberChange = (event) => {
//     const input = event.target.value;
//     // Check if input contains only digits and +
//     if (/^[0-9+]*$/.test(input)) {
//       // Check if + is at the beginning and length is <= 15
//       if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
//         setMobileNumber(input);
//       }
//     }
//   };

//   return [mobileNumber, handleMobileNumberChange];
// };

// export default useMobileNumber;


// // src/hooks/useMobileNumber.js
// import { useState } from 'react';

// const useMobileNumber = (initialValue = '') => {
//   const [mobileNumber, setMobileNumber] = useState(initialValue);

//   const handleMobileNumberChange = (event) => {
//     const input = event.target.value;
//     // Check if input contains only digits and +
//     if (/^[0-9+]*$/.test(input)) {
//       // Check if + is at the beginning and length is <= 15
//       if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
//         setMobileNumber(input);
//       }
//     }
//   };

//   return [mobileNumber, handleMobileNumberChange];
// };

// export default useMobileNumber;


// src/hooks/usePhoneNumber.js
import { useState } from 'react';

const usePhoneNumber = (initialValue = '') => {
  const [phoneNumber, setPhoneNumber] = useState(initialValue);

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    // Check if input contains only digits and +
    if (/^[0-9+]*$/.test(input)) {
      // Check if + is at the beginning and length is <= 15
      if (/^\+?[0-9]*$/.test(input) && input.length <= 15) {
        setPhoneNumber(input);
      }
    }
  };

  return [phoneNumber, handlePhoneNumberChange];
};

export default usePhoneNumber;
