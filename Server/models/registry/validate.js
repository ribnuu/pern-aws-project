const { modelRegistry } = require("./pos");

const validatePOSIncludeModels = (queryType, includeModels) => {
  const { allowedModels } = modelRegistry[queryType] || { allowedModels: [] };
  return includeModels.filter((model) => allowedModels.includes(model));
};

module.exports = {
  validatePOSIncludeModels,
};
