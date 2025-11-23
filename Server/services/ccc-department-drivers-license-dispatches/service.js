const {
  authenticateConfirmationCodeToDispatchLicenseQuery,
} = require("../departmentDriverOffensePortal/departmentDriverOffensePortalQueries");
const departmentDriversLicenseDispatchesQueries = require("./queries");

const createDepartmentDriverLicenseDispatchRecordService = async (
  userId,
  reqBody
) => {
  try {
    const {
      dispatched_to_nic,
      dispatched_to_name,
      dispatched_to_mobile_number,
      dispatched_method,
      remarks,
      dispatched_status,
      department_driver_offense_portal_id,
      reference_number,
      confirmation_code,
    } = reqBody;

    const allow = await authenticateConfirmationCodeToDispatchLicenseQuery({
      referenceNumber: reference_number,
      confirmationCode: confirmation_code,
    });

    if (!allow) {
      throw new Error("Invalid confirmation code");
    }

    const offensePortalRecords =
      await departmentDriversLicenseDispatchesQueries.getDepartmentDriversLicenseDispatchRecordByDriverOffensePortalIdAndSispatchedStatusQuery(
        department_driver_offense_portal_id,
        "DISPATCHED"
      );

    if (offensePortalRecords && offensePortalRecords.length > 0) {
      // IF there is a record with status DISPATCHED then DO NOT allow to crate a new dispatch record
      return;
    } else {
      const response =
        await departmentDriversLicenseDispatchesQueries.createDepartmentDriverLicenseDispatchRecordQuery(
          {
            dispatchedBy: userId,
            dispatchedToNic: dispatched_to_nic,
            dispatchedToName: dispatched_to_name,
            dispatchedToMobileNumber: dispatched_to_mobile_number,
            dispatchMethod: dispatched_method,
            remarks,
            dispatchedStatus: dispatched_status,
            departmentDriverOffensePortalId:
              department_driver_offense_portal_id,
          }
        );
      return response;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createDepartmentDriverLicenseDispatchRecordService,
};
