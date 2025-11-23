const cccDepartmentDriverLicenseRevokesQueries = require("./queries");

const createRevokeLicenseRecordService = async ({
  licenseNumber = null,
  toDate = null,
  courtId = null,
  courtCaseNumber = null,
  createdBy = null,
}) => {
  try {
    const data =
      await cccDepartmentDriverLicenseRevokesQueries.createRevokeLicenseRecordQuery(
        {
          licenseNumber: licenseNumber,
          toDate,
          courtId,
          courtCaseNumber,
          createdBy,
        }
      );
    return data;
  } catch (error) {
    throw error;
  }
};

const getDepartmentDriverLicenseRevokesByLicenseNumberService = async ({
  licenseNumber = null,
}) => {
  try {
    const data =
      await cccDepartmentDriverLicenseRevokesQueries.getDepartmentDriverLicenseRevokesByLicenseNumberQuery(
        {
          licenseNumber: licenseNumber,
        }
      );
    return data;
  } catch (error) {
    throw error;
  }
};

const getLicenseRevokeStatusService = async ({ licenseNumber = null }) => {
  try {
    const data =
      await cccDepartmentDriverLicenseRevokesQueries.getLicenseRevokeStatusQuery(
        { licenseNumber }
      );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRevokeLicenseRecordService,
  getDepartmentDriverLicenseRevokesByLicenseNumberService,
  getLicenseRevokeStatusService,
};
