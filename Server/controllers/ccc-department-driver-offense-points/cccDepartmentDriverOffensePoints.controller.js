const cccDepartmentDriverOffensePointsServices = require("../../services/ccc-department-driver-offense-points/service");

const getDepartmentDriverOffensePointsByLicenseNumberController = async (
  req,
  res
) => {
  try {
    console.log(req);

    const { licenseNumber } = req.params;

    const data =
      await cccDepartmentDriverOffensePointsServices.getDepartmentDriverOffensePointsByLicenseNumberService(
        { licenseNumber: licenseNumber }
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get department driver offense points by license number",
    });
  }
};

module.exports = {
  getDepartmentDriverOffensePointsByLicenseNumberController,
};
