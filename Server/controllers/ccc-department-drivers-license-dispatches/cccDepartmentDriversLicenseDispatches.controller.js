const cccDepartmentDriversLicenseDispatchesServices = require("../../services/ccc-department-drivers-license-dispatches/service");

const createDepartmentDriverLicenseDispatchRecordController = async (
  req,
  res
) => {
  try {
    const reqBody = req.body;
    const user_id = req.headers.user_id;
    const data =
      await cccDepartmentDriversLicenseDispatchesServices.createDepartmentDriverLicenseDispatchRecordService(
        user_id,
        reqBody
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createDepartmentDriverLicenseDispatchRecordController,
};
