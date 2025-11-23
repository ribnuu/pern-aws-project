const setUpAssociationsCCC = require("../../models/ccc");
const { Sequelize } = require("sequelize");

const getLicenseInHandQuery = async ({ policeOfficerId, fromDate, toDate }) => {
  try {
    const {
      DepartmentDriversOffensePortal,
      DepartmentDriversOffenseMaster,
      CccUserMasterfile,
      DepartmentDriversLicenseDispatches,
      PoliceStationMaster,
      CccMasterProvince,
      CccMasterDistrict,
      PoliceDivisionMaster,
    } = setUpAssociationsCCC();

    const whereClause = {};

    if (policeOfficerId) {
      whereClause.police_officer_id = policeOfficerId;
    }

    // If toDate is provided, set it to the end of the day (23:59:59.999)
    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999); // Set to end of day
    }

    const response = await DepartmentDriversOffensePortal.findAll({
      where: {
        ...whereClause,
        ...(fromDate || endOfDay
          ? {
              created_at: {
                ...(fromDate ? { [Sequelize.Op.gte]: new Date(fromDate) } : {}), // Greater than or equal to fromDate
                ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}), // Less than or equal to end of day for toDate
              },
            }
          : {}),
      },
      include: [
        {
          model: CccUserMasterfile,
          as: "policeOfficer",
        },
        {
          model: DepartmentDriversOffenseMaster,
          as: "offense",
        },
        {
          model: DepartmentDriversLicenseDispatches,
          as: "licenseDispatches",
          include: [
            {
              model: CccUserMasterfile,
              as: "dispatcher",
            },
          ],
        },
        {
          model: PoliceStationMaster,
          as: "policeStation",
          attributes: ["province_id", "district_id", "police_station_name"],
          include: [
            { model: CccMasterProvince, as: "province" },
            { model: CccMasterDistrict, as: "district" },
            {
              model: PoliceDivisionMaster,
              as: "policeDivision",
              associations: ["id", "name"],
            },
          ],
        },
      ],
    });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLicenseInHandQuery,
};
