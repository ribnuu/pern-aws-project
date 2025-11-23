const cccDepartmentDriverOffensePointsQueries = require("./queries");

const getDepartmentDriverOffensePointsByLicenseNumberService = async ({
  licenseNumber,
}) => {
  try {
    const data =
      await cccDepartmentDriverOffensePointsQueries.getDepartmentDriverOffensePointsByLicenseNumberQuery(
        { licenseNumber: licenseNumber }
      );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDepartmentDriverOffensePointsByLicenseNumberService,
};
