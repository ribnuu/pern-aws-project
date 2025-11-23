const setUpAssociationsCCC = require("../../models/ccc");

const createDepartmentDriverLicenseDispatchRecordQuery = async ({
  dispatchedBy,
  dispatchedToNic,
  dispatchedToName,
  dispatchedToMobileNumber,
  dispatchMethod,
  remarks,
  dispatchedStatus,
  departmentDriverOffensePortalId,
}) => {
  try {
    const { DepartmentDriversLicenseDispatches } = setUpAssociationsCCC();

    const record = await DepartmentDriversLicenseDispatches.create(
      {
        dispatched_by: dispatchedBy,
        dispatched_to_nic: dispatchedToNic,
        dispatched_to_name: dispatchedToName,
        dispatched_to_mobile_number: dispatchedToMobileNumber,
        dispatched_method: dispatchMethod,
        remarks: remarks,
        dispatched_status: dispatchedStatus,
        department_driver_offense_portal_id: departmentDriverOffensePortalId,
      },
      { returning: true }
    );

    return record;
  } catch (error) {
    throw error;
  }
};

const getDepartmentDriversLicenseDispatchRecordByDriverOffensePortalIdAndSispatchedStatusQuery =
  async (departmentDriverOffensePortalId, dispatchedStatus) => {
    try {
      const { DepartmentDriversLicenseDispatches } = setUpAssociationsCCC();
      const response = await DepartmentDriversLicenseDispatches.findAll({
        where: {
          department_driver_offense_portal_id: parseInt(
            departmentDriverOffensePortalId
          ),
          dispatched_status: dispatchedStatus,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

const getDepartmentDriversLicenseDispatchRecordsByDriverOffensePortalIdQuery =
  async (departmentDriverOffensePortalId) => {
    try {
      const { DepartmentDriversLicenseDispatches } = setUpAssociationsCCC();
      const response = await DepartmentDriversLicenseDispatches.findAll({
        where: {
          department_driver_offense_portal_id: parseInt(
            departmentDriverOffensePortalId
          ),
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  createDepartmentDriverLicenseDispatchRecordQuery,
  getDepartmentDriversLicenseDispatchRecordByDriverOffensePortalIdAndSispatchedStatusQuery,
  getDepartmentDriversLicenseDispatchRecordsByDriverOffensePortalIdQuery,
};
