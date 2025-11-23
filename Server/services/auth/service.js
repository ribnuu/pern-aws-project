// const authQueries = require("./queries");

// const loginWithMobileNumberService = async (reqBody) => {
//   try {
//     const { mobileNumber, language } = reqBody;
//     const lastNineDigits = mobileNumber.slice(-9);
//     const data = await authQueries.loginWithMobileNumberQuery({
//       language,
//       lastNineDigits,
//       res: null,
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   loginWithMobileNumberService,
// };

const authQueries = require("./queries");

const loginWithMobileNumberService = async (reqBody) => {
  try {
    const { mobileNumber, language } = reqBody;

    // Validate mobile number length
    const mobileNumberLength = mobileNumber.length;

    // Check if the length is between 10 and 15 characters (adjust limits as per your requirements)
    if (mobileNumberLength < 10 || mobileNumberLength > 15) {
      throw new Error("Mobile number must be between 10 and 15 digits.");
    }

    // Get the last 9 digits (you can adjust this logic if needed)
    const lastNineDigits = mobileNumber.slice(-9);

    // Proceed with the query if validation passes
    const data = await authQueries.loginWithMobileNumberQuery({
      language,
      lastNineDigits,
      res: null,
    });

    return data;
  } catch (error) {
    throw error; // Rethrow error for handling at a higher level
  }
};

module.exports = {
  loginWithMobileNumberService,
};
