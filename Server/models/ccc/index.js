const getSequelizeInstance = require("../../config/connectionManager");

const defineCccUserAffiliations = require("./CccUserAffiliations");
const defineCccUserMasterfile = require("./CccUserMasterfile");
const defineCccUserGroup = require("./CccUserGroup");
const defineCccUserRole = require("./CccUserRole");
const defineCccMasterPages = require("./CccMasterPages");
const defineCccMasterButtons = require("./CccMasterButtons");
const defineCccRightsGroupButtons = require("./CccRightsGroupButtons");
const defineCccRightsGroupPages = require("./CccRightsGroupPages");
const defineCccRightsRolesButtons = require("./CccRightsRolesButtons");
const defineCccWhitelistedRoutes = require("./CccWhitelistedRoutes");
const defineCccMasterProvince = require("./CccMasterProvince");
const defineCccMasterDistrict = require("./CccMasterDistrict");
const defineCccMasterCity = require("./CccMasterCity");
const defineDepartmentDriversOffenseMaster = require("./DepartmentDriversOffenseMaster");
const defineDepartmentDriversOffensePortal = require("./DepartmentDriversOffensePortal");
const defineHNBPaymentNotification = require("./HnbPaymentNotification");
const defineDepartmentDriversLicenseDispatches = require("./DepartmentDriversLicenseDispatches");
const defineDepartmentPoliceHrData = require("./DepartmentPoliceHRData");
const definePoliceStationMaster = require("./PoliceStationMaster");
const defineDepartmentPoliceOfficerTransfers = require("./DepartmentPoliceOfficerTransfers");
const defineDepartmentTrafficOffensePoints = require("./DepartmentTrafficOffensePoints");
const defineDepartmentDriverOffensePoints = require("./DepartmentDriverOffensePoints");
const definePoliceDivisionMaster = require("./PoliceDivisionMaster");
const defineDepartmentDriversLicenseRevokes = require("./DepartmentDriverLicenseRevokes");
const defineDepartmentSearchHistory = require("./DepartmentSearchHistory");
const defineDepartmentArrestReasons = require("./DepartmentArrestReasons");
const defineDepartmentArrestedPersonsRecords = require("./DepartmentArrestedPersonsRecords");
const defineCccHotels = require("./CccHotels");
const defineHouseHolders = require("./HouseHolders");
const defineHouseHoldersChiefOccupants = require("./HouseHoldersChiefOccupants");
const defineHouseHoldersFamilyMembers = require("./HouseHoldersFamilyMembers");
const defineHouseHoldersOtherResidents = require("./HouseHoldersOtherResidents");
const defineCountries = require("./Countries");

const setUpAssociationsCCC = (db_name = "database") => {
  // Get Sequelize instance
  const sequelize = getSequelizeInstance(db_name);

  // Define models
  const CccUserAffiliations = defineCccUserAffiliations(sequelize);
  const CccUserMasterfile = defineCccUserMasterfile(sequelize);
  const CccUserGroup = defineCccUserGroup(sequelize);
  const CccUserRole = defineCccUserRole(sequelize);
  const CccMasterPages = defineCccMasterPages(sequelize);
  const CccMasterButtons = defineCccMasterButtons(sequelize);
  const CccRightsGroupButtons = defineCccRightsGroupButtons(sequelize);
  const CccRightsGroupPages = defineCccRightsGroupPages(sequelize);
  const CccRightsRolesButtons = defineCccRightsRolesButtons(sequelize);
  const CccWhitelistedRoutes = defineCccWhitelistedRoutes(sequelize);
  const CccMasterProvince = defineCccMasterProvince(sequelize);
  const CccMasterDistrict = defineCccMasterDistrict(sequelize);
  const CccMasterCity = defineCccMasterCity(sequelize);
  const DepartmentDriversOffenseMaster =
    defineDepartmentDriversOffenseMaster(sequelize);
  const DepartmentDriversOffensePortal =
    defineDepartmentDriversOffensePortal(sequelize);
  const HnbPaymentNotification = defineHNBPaymentNotification(sequelize);
  const DepartmentDriversLicenseDispatches =
    defineDepartmentDriversLicenseDispatches(sequelize);
  const DepartmentPoliceHrData = defineDepartmentPoliceHrData(sequelize); // Ensure model definition exists for DepartmentPoliceHrData
  const PoliceStationMaster = definePoliceStationMaster(sequelize); // Ensure model definition exists for PoliceStationMaster
  const DepartmentPoliceOfficerTransfers =
    defineDepartmentPoliceOfficerTransfers(sequelize);
  const DepartmentTrafficOffensePoints =
    defineDepartmentTrafficOffensePoints(sequelize);
  const DepartmentDriverOffensePoints =
    defineDepartmentDriverOffensePoints(sequelize);
  const PoliceDivisionMaster = definePoliceDivisionMaster(sequelize);
  const DepartmentDriversLicenseRevokes =
    defineDepartmentDriversLicenseRevokes(sequelize);
  const DepartmentSearchHistory = defineDepartmentSearchHistory(sequelize);
  const DepartmentArrestReasons = defineDepartmentArrestReasons(sequelize);
  const DepartmentArrestedPersonsRecords =
    defineDepartmentArrestedPersonsRecords(sequelize);
  const CccHotels = defineCccHotels(sequelize);

  const HouseHolders = defineHouseHolders(sequelize);
  const HouseHoldersChiefOccupants =
    defineHouseHoldersChiefOccupants(sequelize);
  const HouseHoldersFamilyMembers = defineHouseHoldersFamilyMembers(sequelize);
  const HouseHoldersOtherResidents =
    defineHouseHoldersOtherResidents(sequelize);
  // define country model
  const Countries = defineCountries(sequelize);

  // CccUserAffiliations associations
  CccUserAffiliations.belongsTo(CccUserMasterfile, {
    foreignKey: "user_id",
    targetKey: "user_id",
    as: "user",
  });

  CccUserAffiliations.belongsTo(CccUserGroup, {
    foreignKey: "group_id",
    targetKey: "user_group_id",
    as: "group",
  });

  CccUserAffiliations.belongsTo(CccUserRole, {
    foreignKey: "role_id",
    targetKey: "user_role_id",
    as: "role",
  });

  // CccUserMasterfile associations
  CccUserMasterfile.hasMany(CccUserAffiliations, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    as: "affiliations",
  });

  // CccUserGroup associations
  CccUserGroup.hasMany(CccUserAffiliations, {
    foreignKey: "group_id",
    sourceKey: "user_group_id",
    as: "userAffiliations",
  });

  // CccUserRole associations
  CccUserRole.hasMany(CccUserAffiliations, {
    foreignKey: "role_id",
    sourceKey: "user_role_id",
    as: "userAffiliations",
  });

  // CccMasterButtons associations
  CccMasterButtons.belongsTo(CccMasterPages, {
    foreignKey: "component_pages_id",
    targetKey: "pages_id",
    as: "page",
  });

  CccMasterPages.hasMany(CccMasterButtons, {
    foreignKey: "component_pages_id",
    sourceKey: "pages_id",
    as: "buttons",
  });

  // CccRightsGroupButtons associations
  CccRightsGroupButtons.belongsTo(CccMasterButtons, {
    foreignKey: "button_id",
    targetKey: "ccc_master_buttons_id",
    as: "button",
  });

  CccMasterButtons.hasMany(CccRightsGroupButtons, {
    foreignKey: "button_id",
    sourceKey: "ccc_master_buttons_id",
    as: "rightsGroupMasterButtons",
  });

  CccRightsGroupButtons.belongsTo(CccUserGroup, {
    foreignKey: "user_group_id",
    targetKey: "user_group_id",
    as: "userGroup", // You can choose any alias you prefer
  });

  CccUserGroup.hasMany(CccRightsGroupButtons, {
    foreignKey: "user_group_id",
    sourceKey: "user_group_id",
    as: "rightsGroupButtons", // This should match the alias used in the belongsTo association
  });

  // CccRightsGroupPages associations
  CccRightsGroupPages.belongsTo(CccMasterPages, {
    foreignKey: "pages_id",
    targetKey: "pages_id",
    as: "page",
  });

  CccMasterPages.hasMany(CccRightsGroupPages, {
    foreignKey: "pages_id",
    sourceKey: "pages_id",
    as: "rightsGroupPages",
  });

  CccRightsGroupPages.belongsTo(CccUserGroup, {
    foreignKey: "user_group_id",
    targetKey: "user_group_id",
    as: "userGroup",
  });

  CccUserGroup.hasMany(CccRightsGroupPages, {
    foreignKey: "user_group_id",
    sourceKey: "user_group_id",
    as: "rightsGroupPages",
  });

  // CccRightsRolesButtons assocications
  CccRightsRolesButtons.belongsTo(CccMasterButtons, {
    foreignKey: "button_id",
    targetKey: "ccc_master_buttons_id",
    as: "button",
  });

  CccMasterButtons.hasMany(CccRightsRolesButtons, {
    foreignKey: "button_id",
    sourceKey: "ccc_master_buttons_id",
    as: "rightsRoleMasterButtons",
  });

  // CccMasterButtons.hasMany(CccRightsRolesButtons, {
  //   foreignKey: "",
  //   sourceKey: "pages_id",
  //   as: "rightsGroupPages",
  // });

  CccRightsRolesButtons.belongsTo(CccUserRole, {
    foreignKey: "user_role_id",
    targetKey: "user_role_id",
    as: "userRole",
  });

  CccUserRole.hasMany(CccRightsRolesButtons, {
    foreignKey: "user_role_id",
    targetKey: "user_role_id",
    as: "rightsRoleButtons",
  });

  // CccWhitelistedRoutes associations
  CccWhitelistedRoutes.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  CccUserMasterfile.hasMany(CccWhitelistedRoutes, {
    foreignKey: "created_by",
    sourceKey: "user_id",
    as: "whitelistedRoutes",
  });

  // Associations
  // A province can have multiple districts
  CccMasterProvince.hasMany(CccMasterDistrict, {
    foreignKey: "province_id", // Foreign key in CccMasterDistrict
    as: "districts", // Alias for the association
  });

  // A district belongs to a single province
  CccMasterDistrict.belongsTo(CccMasterProvince, {
    foreignKey: "province_id", // Foreign key in CccMasterDistrict
    targetKey: "province_id", // Primary key in CccMasterProvince
    as: "province", // Alias for the association
  });

  // A district can have multiple cities
  CccMasterDistrict.hasMany(CccMasterCity, {
    foreignKey: "district_id", // Foreign key in CccMasterCity
    as: "cities", // Alias for the association
  });

  // A city belongs to a single district
  CccMasterCity.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id", // Foreign key in CccMasterCity
    targetKey: "district_id", // Primary key in CccMasterDistrict
    as: "district", // Alias for the association
  });

  // A city belongs to a single province (for direct access to province from city)
  CccMasterCity.belongsTo(CccMasterProvince, {
    foreignKey: "province_id", // Foreign key in CccMasterCity
    targetKey: "province_id", // Primary key in CccMasterProvince
    as: "province", // Alias for the association
  });

  // DepartmentDriversOffensePortal associations
  DepartmentDriversOffensePortal.belongsTo(DepartmentDriversOffenseMaster, {
    foreignKey: "offense_id",
    targetKey: "id",
    as: "offense",
  });

  DepartmentDriversOffenseMaster.hasMany(DepartmentDriversOffensePortal, {
    foreignKey: "offense_id",
    sourceKey: "id",
    as: "portals",
  });

  // DepartmentDriversOffensePortal associations
  DepartmentDriversOffensePortal.belongsTo(CccUserMasterfile, {
    foreignKey: "police_officer_id",
    targetKey: "user_id",
    as: "policeOfficer",
  });

  CccUserMasterfile.hasMany(DepartmentDriversOffensePortal, {
    foreignKey: "police_officer_id",
    sourceKey: "user_id",
    as: "offensePortals",
  });

  // DepartmentDriversLicenseDispatches associations
  DepartmentDriversLicenseDispatches.belongsTo(CccUserMasterfile, {
    foreignKey: "dispatched_by", // Foreign key in DepartmentDriversLicenseDispatches
    targetKey: "user_id", // Primary key in CccUserMasterfile
    as: "dispatcher", // Alias for the association
  });

  CccUserMasterfile.hasMany(DepartmentDriversLicenseDispatches, {
    foreignKey: "dispatched_by", // Foreign key in DepartmentDriversLicenseDispatches
    sourceKey: "user_id", // Primary key in CccUserMasterfile
    as: "licenseDispatches", // Alias for the association
  });

  DepartmentDriversLicenseDispatches.belongsTo(DepartmentDriversOffensePortal, {
    foreignKey: "department_driver_offense_portal_id", // Foreign key in DepartmentDriversLicenseDispatches
    targetKey: "id", // Primary key in DepartmentDriversOffensePortal
    as: "offensePortal", // Alias for the association
  });

  DepartmentDriversOffensePortal.hasMany(DepartmentDriversLicenseDispatches, {
    foreignKey: "department_driver_offense_portal_id", // Foreign key in DepartmentDriversLicenseDispatches
    sourceKey: "id", // Primary key in DepartmentDriversOffensePortal
    as: "licenseDispatches", // Alias for the association
  });

  // CccMasterButtons associations
  CccMasterButtons.belongsTo(CccMasterPages, {
    foreignKey: "ccc_master_pages_id",
    targetKey: "pages_id",
    as: "mPage",
  });

  CccMasterPages.hasMany(CccMasterButtons, {
    foreignKey: "ccc_master_pages_id",
    sourceKey: "pages_id",
    as: "mButtons",
  });

  // department_police_hrdata associations
  DepartmentPoliceHrData.belongsTo(PoliceStationMaster, {
    foreignKey: "police_station_master_id",
    targetKey: "id",
    as: "policeStation",
  });

  PoliceStationMaster.hasMany(DepartmentPoliceHrData, {
    foreignKey: "police_station_master_id",
    sourceKey: "id",
    as: "policeHrData",
  });

  CccMasterDistrict.hasMany(PoliceStationMaster, {
    foreignKey: "district_id",
    sourceKey: "district_id",
    as: "policeStations",
  });

  CccMasterProvince.hasMany(PoliceStationMaster, {
    foreignKey: "province_id",
    sourceKey: "province_id",
    as: "policeStations",
  });

  DepartmentPoliceHrData.belongsTo(CccUserMasterfile, {
    foreignKey: "user_id",
    targetKey: "user_id",
    as: "user",
  });

  CccUserMasterfile.hasMany(DepartmentPoliceHrData, {
    foreignKey: "user_id",
    sourceKey: "user_id",
    as: "policeHrRecords",
  });

  DepartmentPoliceOfficerTransfers.belongsTo(CccUserMasterfile, {
    foreignKey: "user_id",
    as: "user", // alias for accessing the user in queries
  });

  DepartmentPoliceOfficerTransfers.belongsTo(PoliceStationMaster, {
    foreignKey: "police_station_id",
    as: "station", // alias for accessing the police station in queries
  });

  // Assuming created_by also references CccUserMasterfile
  DepartmentPoliceOfficerTransfers.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    as: "creator", // alias for accessing the creator in queries
  });

  // 1. Association between DepartmentTrafficOffensePoints and DepartmentDriversOffenseMaster
  // Each offense point record belongs to an offense in DepartmentDriversOffenseMaster
  DepartmentTrafficOffensePoints.belongsTo(DepartmentDriversOffenseMaster, {
    foreignKey: "offense_id",
    targetKey: "id",
    as: "offense", // alias for accessing the related offense in queries
  });

  DepartmentDriversOffenseMaster.hasMany(DepartmentTrafficOffensePoints, {
    foreignKey: "offense_id",
    sourceKey: "id",
    as: "trafficOffensePoints", // alias for accessing offense points for a given offense
  });

  // 2. Association between DepartmentTrafficOffensePoints and CccUserMasterfile
  // DepartmentTrafficOffensePoints has a "created_by" foreign key, referencing CccUserMasterfile for the user who created it
  DepartmentTrafficOffensePoints.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator", // alias for accessing the creator in queries
  });

  CccUserMasterfile.hasMany(DepartmentTrafficOffensePoints, {
    foreignKey: "created_by",
    sourceKey: "user_id",
    as: "createdTrafficOffensePoints", // alias for accessing offense points created by this user
  });

  DepartmentDriversOffenseMaster.belongsTo(DepartmentTrafficOffensePoints, {
    foreignKey: "department_traffic_offense_points_id", // Foreign key in the master table
    targetKey: "id", // Key in the referenced table
    as: "trafficPoints", // Alias for easier querying
  });

  DepartmentDriversOffensePortal.belongsTo(PoliceStationMaster, {
    foreignKey: "police_station_id",
    targetKey: "id",
    as: "policeStation",
  });

  //  // A district can have multiple cities
  //  CccMasterDistrict.hasMany(CccMasterCity, {
  //   foreignKey: "district_id", // Foreign key in CccMasterCity
  //   as: "cities", // Alias for the association
  // });

  // A city belongs to a single district
  PoliceStationMaster.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id", // Foreign key in CccMasterCity
    targetKey: "district_id", // Primary key in CccMasterDistrict
    as: "district", // Alias for the association
  });

  PoliceStationMaster.belongsTo(CccMasterProvince, {
    foreignKey: "province_id", // Foreign key in CccMasterCity
    targetKey: "province_id", // Primary key in CccMasterDistrict
    as: "province", // Alias for the association
  });

  // PoliceDivisionMaster belongs to CccMasterDistrict
  PoliceDivisionMaster.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id", // Foreign key in PoliceDivisionMaster
    targetKey: "district_id", // Primary key in CccMasterDistrict
    as: "district", // Alias for the association
  });

  // PoliceDivisionMaster belongs to CccMasterProvince
  PoliceDivisionMaster.belongsTo(CccMasterProvince, {
    foreignKey: "province_id", // Foreign key in PoliceDivisionMaster
    targetKey: "province_id", // Primary key in CccMasterProvince
    as: "province", // Alias for the association
  });

  PoliceStationMaster.belongsTo(PoliceDivisionMaster, {
    foreignKey: "police_division_master_id", // Foreign key in PoliceStationMaster
    targetKey: "id", // Primary key in PoliceDivisionMaster
    as: "policeDivision", // Alias for the association
  });

  PoliceDivisionMaster.hasMany(PoliceStationMaster, {
    foreignKey: "police_division_master_id",
    target_key: "id",
    as: "policeStations",
  });

  // DepartmentDriversOffensePortal.belongsTo(PoliceStationMaster, {
  //   foreignKey: "police_station_id", // Foreign key in DepartmentDriversOffensePortal
  //   targetKey: "id", // Primary key in PoliceStationMaster
  //   as: "policeStation", // Alias for accessing the police station in queries
  // });

  PoliceStationMaster.hasMany(DepartmentDriversOffensePortal, {
    foreignKey: "police_station_id", // Foreign key in DepartmentDriversOffensePortal
    sourceKey: "id", // Primary key in PoliceStationMaster
    as: "offensePortals", // Alias for accessing offense portals for this police station
  });

  DepartmentDriversLicenseRevokes.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id", // Assuming 'user_id' is the key in CccUserMasterfile
    as: "creator", // Alias for easy access
  });

  DepartmentSearchHistory.belongsTo(CccUserMasterfile, {
    foreignKey: "officer_id",
    targetKey: "user_id",
    as: "officer",
  });

  DepartmentArrestedPersonsRecords.belongsTo(DepartmentArrestReasons, {
    foreignKey: "arrest_reason",
    targetKey: "id",
    as: "arrestReason",
  });

  // CccHotels Associations
  CccHotels.belongsTo(CccMasterProvince, {
    foreignKey: "province_id",
    targetKey: "province_id",
    as: "province",
  });

  CccHotels.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id",
    targetKey: "district_id",
    as: "district",
  });

  CccHotels.belongsTo(CccMasterCity, {
    foreignKey: "city_id",
    targetKey: "id",
    as: "city",
  });

  CccHotels.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  // House Holders
  HouseHolders.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  HouseHolders.hasMany(HouseHoldersChiefOccupants, {
    foreignKey: "house_id",
    sourceKey: "id",
    as: "chiefOccupants",
  });

  HouseHolders.hasMany(HouseHoldersFamilyMembers, {
    foreignKey: "house_id",
    sourceKey: "id",
    as: "familyMembers",
  });

  HouseHolders.hasMany(HouseHoldersOtherResidents, {
    foreignKey: "house_id",
    sourceKey: "id",
    as: "otherResidents",
  });

  HouseHolders.belongsTo(CccMasterProvince, {
    foreignKey: "province_id",
    targetKey: "province_id",
    as: "province",
  });

  HouseHolders.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id",
    targetKey: "district_id",
    as: "district",
  });

  HouseHolders.belongsTo(CccMasterCity, {
    foreignKey: "city_id",
    targetKey: "id",
    as: "city",
  });

  HouseHoldersChiefOccupants.belongsTo(HouseHolders, {
    foreignKey: "house_id",
    targetKey: "id",
    as: "houseHolder",
  });

  HouseHoldersChiefOccupants.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  HouseHoldersChiefOccupants.belongsTo(PoliceStationMaster, {
    foreignKey: "police_station_id",
    targetKey: "id",
    as: "policeStation",
  });

  HouseHoldersChiefOccupants.hasMany(HouseHoldersFamilyMembers, {
    foreignKey: "chief_occupant_id",
    sourceKey: "id",
    as: "familyMembers",
  });

  HouseHoldersChiefOccupants.hasMany(HouseHoldersOtherResidents, {
    foreignKey: "chief_occupant_id",
    sourceKey: "id",
    as: "otherResidents",
  });

  HouseHoldersChiefOccupants.belongsTo(CccMasterProvince, {
    foreignKey: "province_id",
    targetKey: "province_id",
    as: "province",
  });

  HouseHoldersChiefOccupants.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id",
    targetKey: "district_id",
    as: "district",
  });

  HouseHoldersChiefOccupants.belongsTo(CccMasterCity, {
    foreignKey: "city_id",
    targetKey: "id",
    as: "city",
  });

  HouseHoldersFamilyMembers.belongsTo(HouseHolders, {
    foreignKey: "house_id",
    targetKey: "id",
    as: "houseHolder",
  });

  HouseHoldersFamilyMembers.belongsTo(HouseHoldersChiefOccupants, {
    foreignKey: "chief_occupant_id",
    targetKey: "id",
    as: "chiefOccupant",
  });

  HouseHoldersFamilyMembers.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  HouseHoldersOtherResidents.belongsTo(HouseHolders, {
    foreignKey: "house_id",
    targetKey: "id",
    as: "houseHolder",
  });

  HouseHoldersOtherResidents.belongsTo(HouseHoldersChiefOccupants, {
    foreignKey: "chief_occupant_id",
    targetKey: "id",
    as: "chiefOccupant",
  });

  HouseHoldersOtherResidents.belongsTo(CccUserMasterfile, {
    foreignKey: "created_by",
    targetKey: "user_id",
    as: "creator",
  });

  HouseHoldersOtherResidents.belongsTo(CccMasterProvince, {
    foreignKey: "province_id",
    targetKey: "province_id",
    as: "province",
  });

  HouseHoldersOtherResidents.belongsTo(CccMasterDistrict, {
    foreignKey: "district_id",
    targetKey: "district_id",
    as: "district",
  });

  HouseHoldersOtherResidents.belongsTo(CccMasterCity, {
    foreignKey: "city_id",
    targetKey: "id",
    as: "city",
  });

  HouseHoldersOtherResidents.belongsTo(PoliceStationMaster, {
    foreignKey: "police_station_id",
    targetKey: "id",
    as: "policeStation",
  });

  PoliceStationMaster.hasMany(HouseHoldersOtherResidents, {
    foreignKey: "police_station_id",
    as: "houseHoldersOtherResidents", // Optional: name for the association
  });

  // Returning all models for further use if needed
  return {
    sequelize,
    CccUserAffiliations,
    CccUserMasterfile,
    CccUserGroup,
    CccUserRole,
    CccMasterPages,
    CccMasterButtons,
    CccRightsGroupButtons,
    CccRightsGroupPages,
    CccRightsRolesButtons,
    CccWhitelistedRoutes,
    CccMasterProvince,
    CccMasterDistrict,
    CccMasterCity,
    DepartmentDriversOffenseMaster,
    DepartmentDriversOffensePortal,
    HnbPaymentNotification,
    DepartmentDriversLicenseDispatches,
    DepartmentPoliceHrData,
    PoliceStationMaster,
    DepartmentPoliceOfficerTransfers,
    DepartmentTrafficOffensePoints,
    DepartmentDriverOffensePoints,
    PoliceDivisionMaster,
    DepartmentDriversLicenseRevokes,
    DepartmentSearchHistory,
    DepartmentArrestReasons,
    DepartmentArrestedPersonsRecords,
    CccHotels,
    // House Holders
    HouseHolders,
    HouseHoldersChiefOccupants,
    HouseHoldersFamilyMembers,
    HouseHoldersOtherResidents,
    //countries
    Countries,
  };
};

module.exports = setUpAssociationsCCC;
