const generateRandomNumberOfNDigits = ({ n, startsWith }) => {
  if (n <= 0) return null; // Return null for invalid input

  const min = Math.pow(10, n - 1); // Minimum number with n digits
  const max = Math.pow(10, n) - 1; // Maximum number with n digits

  // Generate a random number between min and max
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  if (!startsWith) {
    return randomNumber;
  }

  // Ensure the number starts with 5 by concatenating it with 5
  const numberWithFivePrefix = startsWith + randomNumber.toString().slice(1);

  return numberWithFivePrefix;
};

module.exports = {
  generateRandomNumberOfNDigits,
};
