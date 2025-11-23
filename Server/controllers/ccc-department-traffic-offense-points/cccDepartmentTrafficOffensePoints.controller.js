// const cccDepartmentTrafficOffensePointsServices = require("../../services/ccc-department-drivers-license-dispatches/service");

// const createDepartmentDriverLicenseDispatchRecordController = async (
//   req,
//   res
// ) => {
//   try {
//     const reqBody = req.body;
//     const user_id = req.headers.user_id;
//     const provinces =
//       await cccDepartmentTrafficOffensePointsServices.createDepartmentDriverLicenseDispatchRecordService(
//         user_id,
//         reqBody
//       );
//     res.send({ success: true, data: provinces });
//   } catch (error) {
//     res.status(500).json({
//       error: "Failed to search provinces",
//     });
//   }
// };

// module.exports = {
//   createDepartmentDriverLicenseDispatchRecordController,
// };
