const dbDukeClient = require("../../config/dbDuke");

const getYearCode = () => {
  const year = new Date().getFullYear();
  return year.toString().slice(-2); // Get last two digits of the year
};

const getDayOfYear = () => {
  const date = new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  return Math.floor(diff / (24 * 60 * 60 * 1000)) + 1; // Day of the year (1-365)
};

const getAlphabeticCode = (dayOfYear) => {
  if (dayOfYear < 1 || dayOfYear > 366) {
    throw new Error("Invalid day of year: must be between 1 and 366");
  }

  const firstLetterIndex = Math.floor((dayOfYear - 1) / 26); // A-Z
  const secondLetterIndex = (dayOfYear - 1) % 26; // A-Z

  const firstLetter = String.fromCharCode(65 + firstLetterIndex); // 'A' + index
  const secondLetter = String.fromCharCode(65 + secondLetterIndex); // 'A' + index

  return firstLetter + secondLetter; // Example: AA, AB, AC...
};

const getNextItemSequence = async (alpCode) => {
  // Get the current sequence for the alphabetic code from the database
  const result = await dbDukeClient.query(
    "SELECT sequence FROM item_sequences WHERE alphacode = $1",
    [alpCode]
  );

  let sequenceNumber;

  if (result.rows.length > 0) {
    sequenceNumber = result.rows[0].sequence + 1; // Increment sequence
    if (sequenceNumber > 9999) throw new Error("Sequence limit reached!");
    await dbDukeClient.query(
      "UPDATE item_sequences SET sequence = $1 WHERE alphacode = $2",
      [sequenceNumber, alpCode]
    );
  } else {
    sequenceNumber = 1; // Start at 0001 for a new alphabetic code
    await dbDukeClient.query(
      "INSERT INTO item_sequences (alphacode, sequence) VALUES ($1, $2)",
      [alpCode, sequenceNumber]
    );
  }

  return sequenceNumber.toString().padStart(4, "0"); // Ensure 4-digit format
};

const generateItemCode = async () => {
  try {
    const yearCode = getYearCode(); // Last 2 digits of the year
    const dayOfYear = getDayOfYear(); // Numeric day of the year
    const alpCode = getAlphabeticCode(dayOfYear); // Convert day to letters
    const sequenceCode = await getNextItemSequence(alpCode); // Get 4-digit sequence

    return `${yearCode}${alpCode}${sequenceCode}`; // Example: 24AB0001
  } catch (error) {
    console.error("Error generating item code:", error);
    return null;
  }
};

module.exports = { generateItemCode };
