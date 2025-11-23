const dbDukeClient = require("../../config/dbDuke");

// ! IMPORTANT
// CREATE SEQUENCE IF NOT EXISTS public.bill_number_id_sequence
//     INCREMENT 1
//     START 0
//     MINVALUE 0
//     MAXVALUE 9223372036854775807
//     CACHE 1;

const getYearCode = () => {
  const year = new Date().getFullYear();
  return year.toString().slice(-2);
};

// Function to convert a number to a base-36 alphanumeric sequence (AAAA to ZZZZ)
const getAlphanumericSequence = (sequence) => {
  const maxNumeric = 9999;

  // If the sequence is less than or equal to 9999, return it as a zero-padded number
  if (sequence <= maxNumeric) {
    return sequence.toString().padStart(4, "0");
  }

  // If the sequence exceeds 9999, convert it to a base-36 alphanumeric (AAAA to ZZZZ)
  const base36sequence = (sequence - maxNumeric - 1).toString(36).toUpperCase();

  // Pad the result to 4 characters (e.g., AAAA, AAAB, ..., ZZZZ)
  return base36sequence.padStart(4, "A");
};

const getNextSequence = async () => {
  const result = await dbDukeClient.query(
    "SELECT nextval('bill_number_id_sequence')"
  );
  const sequenceNumber = result.rows[0].nextval;

  // Get either the numeric or alphanumeric sequence based on its value
  return getAlphanumericSequence(sequenceNumber);
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

const generateBillNumber = async () => {
  try {
    // let count = 0;
    // while (count <= 9999) {
    //   const yearCode = getYearCode();
    //   const dayOfYear = getDayOfYear();
    //   const alpCode = getAlphabeticCode(dayOfYear);
    //   const sequenceCode = await getNextSequence();
    //   console.log(`${yearCode}${alpCode}${sequenceCode}`);
    //   count += 1;
    // }
    const yearCode = getYearCode();
    const dayOfYear = getDayOfYear();
    const alpCode = getAlphabeticCode(dayOfYear);
    const sequenceCode = await getNextSequence();
    return `${yearCode}${alpCode}${sequenceCode}`;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateBillNumber,
};
