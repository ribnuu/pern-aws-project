const generateCustomBillNumber = (uniqueIdentifier) => {
  const now = new Date();
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = now.getFullYear().toString().slice(-2).padStart(2, "0");

  return `08${uniqueIdentifier}${milliseconds}${seconds}${minutes}${hours}${day}${month}${year}`;
};

const generateCustomGrnNumber = () => {
  const now = new Date();
  const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = now.getFullYear().toString().slice(-2); // Use last two digits of the year

  // Generate a random 3-digit number to ensure uniqueness within the same second
  const randomThreeDigits = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  // Concatenate all parts to form the 16-character GRN number
  const grnNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${randomThreeDigits}`;

  return grnNumber;
};

module.exports = {
  generateCustomBillNumber,
  generateCustomGrnNumber,
};
