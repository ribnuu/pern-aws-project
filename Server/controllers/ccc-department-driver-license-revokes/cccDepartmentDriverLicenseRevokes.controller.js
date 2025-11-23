const cccDepartmentDriverLicenseRevokesServices = require("../../services/ccc-department-driver-license-revokes/service");

const createRevokeLicenseRecordController = async (req, res) => {
  try {
    console.log(req);
    const createdBy = req.headers.user_id;
    const reqBody = req.body;
    const { licenseNumber, toDate, courtId, courtCaseNumber } = reqBody;

    const data =
      await cccDepartmentDriverLicenseRevokesServices.createRevokeLicenseRecordService(
        { licenseNumber, toDate, courtId, courtCaseNumber, createdBy }
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create revoke license record",
    });
  }
};

const getDepartmentDriverLicenseRevokesByLicenseNumberController = async (
  req,
  res
) => {
  try {
    console.log(req);

    const { licenseNumber } = req.params;

    const data =
      await cccDepartmentDriverLicenseRevokesServices.getDepartmentDriverLicenseRevokesByLicenseNumberService(
        { licenseNumber: licenseNumber }
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get department driver offense points by license number",
    });
  }
};

const getLicenseRevokeStatusController = async (req, res) => {
  try {
    const { licenseNumber } = req.params;
    const data =
      await cccDepartmentDriverLicenseRevokesServices.getLicenseRevokeStatusService(
        { licenseNumber }
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get license revoke status",
    });
  }
};

module.exports = {
  createRevokeLicenseRecordController,
  getDepartmentDriverLicenseRevokesByLicenseNumberController,
  getLicenseRevokeStatusController,
};
