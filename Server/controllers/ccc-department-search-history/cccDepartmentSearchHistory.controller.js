const cccDepartmentSearchHistoryServices = require("../../services/ccc-department-search-history/service");

const createDepartmentDriverLicenseDispatchRecordController = async (
  req,
  res
) => {
  try {
    const reqBody = req.body;
    const user_id = req.headers.user_id;
    const data =
      await cccDepartmentSearchHistoryServices.createDepartmentSearchHistoryService(
        { user_id: user_id, reqBody: reqBody }
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
