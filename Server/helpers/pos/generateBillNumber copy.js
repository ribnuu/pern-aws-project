const dbDukeClient = require("../../config/dbDuke");

// CREATE SEQUENCE bill_number_id_sequence_test_1
//     START 0
//     MINVALUE 0;

const getYearCode = () => {
  const year = new Date().getFullYear();
  return year.toString().slice(-2);
};

const getNextSequence = async () => {
  const result = await dbDukeClient.query(
    "SELECT nextval('bill_number_id_sequence_test_1')"
  );
  const sequenceNumber = result.rows[0].nextval;
  return sequenceNumber.toString(36).padStart(4, "0").toUpperCase();
};

const getDayOfYear = () => {
  const date = new Date();
  // Create a new Date object for the start of the year
  const startOfYear = new Date(date.getFullYear(), 0, 1);

  // Calculate the difference in milliseconds between the given date and the start of the year
  const millisecondsDifference = date - startOfYear;

  // Convert milliseconds to days
  const daysDifference = millisecondsDifference / (24 * 60 * 60 * 1000);

  // Return the day of the year, rounded down to the nearest integer
  return Math.floor(daysDifference + 1);
};

const getAlphabeticCode = (dayOfYear) => {
  // Validate the dayOfYear input
  if (dayOfYear < 1 || dayOfYear > 366) {
    throw new Error("Invalid day of year: must be between 1 and 366");
  }

  // Calculate the first letter based on the day of the year
  const firstLetterIndex = Math.floor((dayOfYear - 1) / 26);
  const firstLetter = String.fromCharCode(firstLetterIndex + 65);

  // Calculate the second letter based on the remainder
  const secondLetterIndex = (dayOfYear - 1) % 26;
  const secondLetter = String.fromCharCode(secondLetterIndex + 65);

  // Return the alphabetic code
  return firstLetter + secondLetter;
};

const generateId = async (req, res) => {
  try {
    const yearCode = getYearCode();
    const dayOfYear = getDayOfYear();
    const alpCode = getAlphabeticCode(dayOfYear);
    const sequenceCode = await getNextSequence();
    res.send({ success: true, data: `${yearCode}${alpCode}${sequenceCode}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create stock customer institution record" });
  }
};

module.exports = {
  generateId,
};

// const dbDukeClient = require("../../config/dbDuke");

// const getYearCode = () => {
//   const year = new Date().getFullYear();
//   return year.toString().slice(-2);
// };

// // Function to convert a number to a base-26 alphanumeric code
// const numberToBase26Code = (num) => {
//   let result = "";
//   let current = num;

//   for (let i = 0; i < 4; i++) {
//     // Generate 4 character code
//     const charCode = (current % 26) + 65; // Get the ASCII code for 'A' to 'Z'
//     result = String.fromCharCode(charCode) + result; // Prepend the character
//     current = Math.floor(current / 26); // Move to the next digit
//   }

//   return result;
// };

// const getNextSequence = async () => {
//   const result = await dbDukeClient.query(
//     "SELECT nextval('bill_number_id_sequence_test_1')"
//   );
//   const sequenceNumber = result.rows[0].nextval;

//   // Generate the alphanumeric code
//   const alphanumericCode = numberToBase26Code(sequenceNumber);

//   // If it exceeds ZZZZ (which is 456976), reset to 0
//   if (sequenceNumber >= 456976) {
//     await dbDukeClient.query(
//       "ALTER SEQUENCE bill_number_id_sequence_test_1 RESTART WITH 1"
//     );
//   }

//   return alphanumericCode;
// };

// const generateId = async (req, res) => {
//   try {
//     const yearCode = getYearCode();
//     const sequenceCode = await getNextSequence();
//     res.send({ success: true, data: `${yearCode}${sequenceCode}` });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Failed to create stock customer institution record" });
//   }
// };

// module.exports = {
//   generateId,
// };
