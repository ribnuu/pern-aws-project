export const validateForm = (formData, validationRules) => {
  /**
   * Generalized form validator
   * @param {Object} formData - The data object representing the form inputs.
   * @param {Array} validationRules - Array of validation rules. Each rule is an object with:
   *                                  { field: "fieldName", name: "Field Label", required: true }
   * @returns {string|boolean} - Returns a string with the missing fields if validation fails, or `true` if valid.
   */
  debugger;

  const missingFields = validationRules
    .filter((rule) => rule.required && !formData?.[rule.field]) // Check required fields
    .map((rule) => rule.name); // Extract human-readable field names

  return missingFields.length
    ? `Please fill out the following required fields: ${missingFields.join(
        ", "
      )}`
    : true;
};
