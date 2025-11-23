const { Sequelize, DataTypes } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");
const getLicenseInHandByFiltersQuery = async ({
  fromDate = null,
  toDate = null,
  filterBy = null,
  dispatchedStatus = null,
  dataFor = null,
  officerId = null,
}) => {
  console.log(`Filter By: ${filterBy?.toString()}`);
  console.log(`Dispatched Status: ${dispatchedStatus?.toString()}`);

  try {
    const {
      DepartmentDriversOffensePortal,
      DepartmentDriversOffenseMaster,
      PoliceStationMaster,
      CccMasterProvince,
      CccMasterDistrict,
      PoliceDivisionMaster,
      DepartmentDriversLicenseDispatches,
    } = setUpAssociationsCCC();

    const whereClause = {};

    const endOfDay = toDate ? new Date(toDate) : null;
    if (endOfDay) {
      endOfDay.setHours(23, 59, 59, 999); // Set to 11:59:59.999 PM
    }

    if (fromDate || endOfDay) {
      whereClause["created_at"] = {
        ...(fromDate ? { [Sequelize.Op.gte]: new Date(fromDate) } : {}),
        ...(endOfDay ? { [Sequelize.Op.lte]: endOfDay } : {}),
      };
    }

    if (dataFor === "TRAFFIC_OFFENSE") {
      if (filterBy === "PROVINCE") {
        const response = await CccMasterProvince.findAll({
          // where: { province_id: provinceId }, // Uncomment if you want to filter by province ID
          include: [
            {
              model: PoliceStationMaster,
              as: "policeStations", // Correct alias for police stations
              // required: true, // Ensures only police stations are included
              include: [
                {
                  model: DepartmentDriversOffensePortal,
                  as: "offensePortals", // Adjust this alias if needed
                  where: whereClause, // Apply the filtering conditions
                  required: true, // Ensures that only offense portals matching the conditions are included
                  include: {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                    // required: dispatchedStatus === "DISPATCHED", // Only require dispatches if status is DISPATCHED
                  },
                },
              ],
            },
          ],
        });

        const provinces = [];
        const offenseCounts = [];

        response.forEach((province) => {
          const provinceName = province.province_name;
          provinces.push(provinceName);

          const totalOffensePortals = province.policeStations.reduce(
            (acc, station) => {
              return (
                acc +
                (station.offensePortals?.reduce((count, offensePortal) => {
                  const hasDispatches =
                    offensePortal?.licenseDispatches?.length > 0;

                  // Count offense portal based on dispatched status
                  switch (dispatchedStatus) {
                    case "ALL":
                      return count + 1;
                    case "DISPATCHED":
                      return count + (hasDispatches ? 1 : 0);
                    case "IN_HAND":
                      return count + (hasDispatches ? 0 : 1);
                    default:
                      return count; // In case dispatchedStatus is not recognized
                  }
                }, 0) || 0)
              ); // Default to 0 if offensePortals is undefined
            },
            0
          );

          offenseCounts.push(totalOffensePortals); // Count of offense portals for this province
        });

        return { data: offenseCounts, categories: provinces };
      }

      if (filterBy === "DISTRICT") {
        // Account for dispatchedStatus when ALL, DISPATCHED, IN_HAND
        const response = await CccMasterDistrict.findAll({
          include: [
            {
              model: PoliceStationMaster,
              as: "policeStations", // Adjust to the correct alias for police stations
              include: [
                {
                  model: DepartmentDriversOffensePortal,
                  as: "offensePortals", // Adjust this alias if needed
                  where: whereClause, // Apply the filtering conditions
                  // required: true, // Ensures that only offense portals matching the conditions are included
                  include: {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                    // required: dispatchedStatus === "DISPATCHED", // Only require dispatches if status is DISPATCHED
                  },
                },
              ],
            },
          ],
        });

        const districts = [];
        const offenseCounts = [];

        response.forEach((district) => {
          const districtName = district.district_name;
          districts.push(districtName);

          district.policeStations?.forEach((policeStation) => {
            const offenseCount = policeStation.offensePortals.reduce(
              (count, offensePortal) => {
                const hasDispatches =
                  offensePortal?.licenseDispatches?.length > 0;

                switch (dispatchedStatus) {
                  case "ALL":
                    return count + 1;
                  case "DISPATCHED":
                    return count + (hasDispatches ? 1 : 0);
                  case "IN_HAND":
                    return count + (hasDispatches ? 0 : 1);
                  default:
                    return count; // In case dispatchedStatus is not recognized
                }
              },
              0
            );

            offenseCounts.push(offenseCount);
          });
        });

        return { data: offenseCounts, categories: districts };
      }

      if (filterBy === "DIVISION") {
        const response = await PoliceDivisionMaster.findAll({
          include: {
            model: PoliceStationMaster,
            as: "policeStations",
            include: [
              {
                model: DepartmentDriversOffensePortal,
                as: "offensePortals",
                where: whereClause,
                required: true,
                include: {
                  model: DepartmentDriversLicenseDispatches,
                  as: "licenseDispatches",
                  // required: dispatchedStatus === "DISPATCHED", // Only require dispatches if status is DISPATCHED
                },
              },
            ],
          },
          // Ensure distinct divisions are fetched
          distinct: true, // This may require additional setup in your query depending on your database
        });

        let divisions = []; // Store unique division names
        let offenseCounts = []; // Store counts of offense portals
        let divisionCounts = {}; // To track counts for each unique division
        let uniqueDivisions = new Set(); // Use a Set to track unique division names

        response.forEach((division) => {
          const divisionName = division.name
            .replace("Police Division", "")
            .trim();

          // Initialize count for this division if it hasn't been encountered
          if (!uniqueDivisions.has(divisionName)) {
            uniqueDivisions.add(divisionName); // Add to Set for uniqueness
            divisions.push(divisionName); // Add the unique division name
            divisionCounts[divisionName] = 0; // Initialize count for this division
          }

          const totalOffensePortals = division.policeStations.reduce(
            (acc, station) => {
              return (
                acc +
                (station.offensePortals?.reduce((count, offensePortal) => {
                  const hasDispatches =
                    offensePortal?.licenseDispatches?.length > 0;

                  // Count offense portal based on dispatched status
                  switch (dispatchedStatus) {
                    case "ALL":
                      return count + 1;
                    case "DISPATCHED":
                      return count + (hasDispatches ? 1 : 0);
                    case "IN_HAND":
                      return count + (hasDispatches ? 0 : 1);
                    default:
                      return count; // In case dispatchedStatus is not recognized
                  }
                }, 0) || 0)
              ); // Default to 0 if offensePortals is undefined
            },
            0
          );

          // Add the total offense portals to the unique division's count
          divisionCounts[divisionName] += totalOffensePortals;
        });

        // Convert the counts into an array for offenseCounts
        offenseCounts = divisions.map((division) => divisionCounts[division]);

        return { data: offenseCounts, categories: divisions };
      }

      if (filterBy === "OFFENSE") {
        const response = await PoliceDivisionMaster.findAll({
          include: {
            model: PoliceStationMaster,
            as: "policeStations",
            include: [
              {
                model: DepartmentDriversOffensePortal,
                as: "offensePortals",
                where: whereClause,
                required: true,
                include: [
                  {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                    // required: dispatchedStatus === "DISPATCHED", // Only require dispatches if status is DISPATCHED
                  },
                  {
                    model: DepartmentDriversOffenseMaster,
                    as: "offense",
                    attributes: ["offense"],
                  },
                ],
              },
            ],
          },
          distinct: true, // Ensure distinct divisions are fetched
        });

        let offenseCounts = []; // Store offense counts
        let offenses = []; // Store unique offense names
        let offenseCountsMap = {}; // To track counts for each unique offense

        response.forEach((division) => {
          division.policeStations.forEach((station) => {
            station.offensePortals.forEach((offensePortal) => {
              const offenseName = offensePortal?.offense?.offense; // Assuming offensePortal has a name field

              // Initialize count for this offense if it hasn't been encountered
              if (!offenseCountsMap[offenseName]) {
                offenseCountsMap[offenseName] = 0; // Initialize count for this offense
                offenses.push(offenseName); // Add to unique offenses
              }

              // Count offense portal based on dispatched status
              const hasDispatches =
                offensePortal?.licenseDispatches?.length > 0;

              switch (dispatchedStatus) {
                case "ALL":
                  offenseCountsMap[offenseName] += 1; // Count all offenses
                  break;
                case "DISPATCHED":
                  if (hasDispatches) {
                    offenseCountsMap[offenseName] += 1; // Count only dispatched offenses
                  }
                  break;
                case "IN_HAND":
                  if (!hasDispatches) {
                    offenseCountsMap[offenseName] += 1; // Count only in-hand offenses
                  }
                  break;
                default:
                  break; // Do nothing if dispatchedStatus is not recognized
              }
            });
          });
        });

        // Convert the counts into an array for offenseCounts
        offenseCounts = offenses.map((offense) => offenseCountsMap[offense]);

        return { data: offenseCounts, categories: offenses };
      }

      if (filterBy === "STATION") {
        const response = await PoliceDivisionMaster.findAll({
          include: {
            model: PoliceStationMaster,
            as: "policeStations",
            include: [
              {
                model: DepartmentDriversOffensePortal,
                as: "offensePortals",
                where: whereClause,
                required: true,
                include: [
                  {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                  },
                  {
                    model: DepartmentDriversOffenseMaster,
                    as: "offense",
                    attributes: ["offense"],
                  },
                ],
              },
            ],
          },
          distinct: true,
        });

        let stationOffenseCounts = {}; // Store total offense counts for each station

        response.forEach((division) => {
          division.policeStations.forEach((station) => {
            const stationName = station?.police_station_name; // Get the station name, assuming there's a name field

            // Initialize count for this station if it hasn't been encountered
            if (!stationOffenseCounts[stationName]) {
              stationOffenseCounts[stationName] = 0; // Initialize count for this station
            }

            station.offensePortals.forEach((offensePortal) => {
              const hasDispatches =
                offensePortal?.licenseDispatches?.length > 0;

              // Count offense based on dispatched status
              switch (dispatchedStatus) {
                case "ALL":
                  stationOffenseCounts[stationName] += 1; // Count all offenses
                  break;
                case "DISPATCHED":
                  if (hasDispatches) {
                    stationOffenseCounts[stationName] += 1; // Count only dispatched offenses
                  }
                  break;
                case "IN_HAND":
                  if (!hasDispatches) {
                    stationOffenseCounts[stationName] += 1; // Count only in-hand offenses
                  }
                  break;
                default:
                  break; // Do nothing if dispatchedStatus is not recognized
              }
            });
          });
        });

        // Convert the stationOffenseCounts object into arrays for response
        const categories = Object.keys(stationOffenseCounts); // Station names
        const data = Object.values(stationOffenseCounts); // Corresponding counts

        return { data, categories };
      }

      if (filterBy === "OFFICER" && officerId) {
        if (officerId) {
          whereClause["police_officer_id"] = officerId;
        }

        const response = await DepartmentDriversOffensePortal.findAll({
          where: whereClause,
          include: [
            {
              model: DepartmentDriversLicenseDispatches,
              as: "licenseDispatches",
            },
            {
              model: DepartmentDriversOffenseMaster,
              as: "offense",
              attributes: ["offense"],
            },
          ],
          distinct: true,
        });

        let offenseCounts = []; // Store offense counts
        let offenses = []; // Store unique offense names
        let offenseCountsMap = {}; // To track counts for each unique offense

        response.forEach((offense) => {
          console.log(offense);
          const offenseName = offense?.offense?.offense;

          if (!offenseCountsMap[offenseName]) {
            offenseCountsMap[offenseName] = 0; // Initialize count for this offense
            offenses.push(offenseName); // Add to unique offenses
          }
          // Count offense portal based on dispatched status
          const hasDispatches = offense?.licenseDispatches?.length > 0;

          switch (dispatchedStatus) {
            case "ALL":
              offenseCountsMap[offenseName] += 1; // Count all offenses
              break;
            case "DISPATCHED":
              if (hasDispatches) {
                offenseCountsMap[offenseName] += 1; // Count only dispatched offenses
              }
              break;
            case "IN_HAND":
              if (!hasDispatches) {
                offenseCountsMap[offenseName] += 1; // Count only in-hand offenses
              }
              break;
            default:
              break; // Do nothing if dispatchedStatus is not recognized
          }
        });

        // Convert the counts into an array for offenseCounts
        offenseCounts = offenses.map((offense) => offenseCountsMap[offense]);

        return { data: offenseCounts, categories: offenses };
      }
    }

    if (dataFor === "REVENUE") {
      if (filterBy === "PROVINCE") {
        const response = await CccMasterProvince.findAll({
          include: [
            {
              model: PoliceStationMaster,
              as: "policeStations",
              include: [
                {
                  model: DepartmentDriversOffensePortal,
                  as: "offensePortals",
                  where: whereClause,
                  required: true,
                  include: [
                    {
                      model: DepartmentDriversOffenseMaster,
                      as: "offense",
                    },
                    {
                      model: DepartmentDriversLicenseDispatches,
                      as: "licenseDispatches",
                      // required: dispatchedStatus === "DISPATCHED", // Only require dispatches if status is DISPATCHED
                    },
                  ],
                },
              ],
            },
          ],
        });

        const provinces = [];
        const offenseFines = [];

        response.forEach((province) => {
          const provinceName = province.province_name;
          provinces.push(provinceName);

          const totalFineForProvince = province.policeStations.reduce(
            (acc, station) => {
              return (
                acc +
                (station.offensePortals?.reduce((fineSum, offensePortal) => {
                  const hasDispatches =
                    offensePortal?.licenseDispatches?.length > 0;
                  const offenseFine = offensePortal?.offense?.fine || 0;

                  // Add fine based on dispatched status
                  switch (dispatchedStatus) {
                    case "ALL":
                      return fineSum + offenseFine;
                    case "DISPATCHED":
                      return fineSum + (hasDispatches ? offenseFine : 0);
                    case "IN_HAND":
                      return fineSum + (!hasDispatches ? offenseFine : 0);
                    default:
                      return fineSum; // In case dispatchedStatus is not recognized
                  }
                }, 0) || 0)
              );
            },
            0
          );

          offenseFines.push(totalFineForProvince); // Total fine for this province
        });

        return { data: offenseFines, categories: provinces };
      }

      if (filterBy === "DISTRICT") {
        // Account for dispatchedStatus when ALL, DISPATCHED, IN_HAND
        const response = await CccMasterDistrict.findAll({
          include: [
            {
              model: PoliceStationMaster,
              as: "policeStations", // Correct alias for police stations
              include: [
                {
                  model: DepartmentDriversOffensePortal,
                  as: "offensePortals", // Adjust this alias if needed
                  where: whereClause, // Apply the filtering conditions
                  include: [
                    {
                      model: DepartmentDriversOffenseMaster,
                      as: "offense",
                    },
                    {
                      model: DepartmentDriversLicenseDispatches,
                      as: "licenseDispatches",
                    },
                  ],
                },
              ],
            },
          ],
        });

        const districts = [];
        const offenseFines = [];

        response.forEach((district) => {
          const districtName = district.district_name;
          districts.push(districtName);

          const totalFineForDistrict = district.policeStations?.reduce(
            (acc, policeStation) => {
              return (
                acc +
                policeStation.offensePortals.reduce(
                  (fineSum, offensePortal) => {
                    const hasDispatches =
                      offensePortal?.licenseDispatches?.length > 0;
                    const offenseFine = offensePortal?.offense?.fine || 0;

                    // Accumulate fine based on dispatched status
                    switch (dispatchedStatus) {
                      case "ALL":
                        return fineSum + offenseFine;
                      case "DISPATCHED":
                        return fineSum + (hasDispatches ? offenseFine : 0);
                      case "IN_HAND":
                        return fineSum + (!hasDispatches ? offenseFine : 0);
                      default:
                        return fineSum; // In case dispatchedStatus is not recognized
                    }
                  },
                  0
                )
              );
            },
            0
          );

          offenseFines.push(totalFineForDistrict); // Total fine for this district
        });

        return { data: offenseFines, categories: districts };
      }

      if (filterBy === "DIVISION") {
        const response = await PoliceDivisionMaster.findAll({
          include: {
            model: PoliceStationMaster,
            as: "policeStations",
            include: [
              {
                model: DepartmentDriversOffensePortal,
                as: "offensePortals",
                where: whereClause,
                required: true,
                include: [
                  {
                    model: DepartmentDriversOffenseMaster,
                    as: "offense",
                  },
                  {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                  },
                ],
              },
            ],
          },
          distinct: true,
        });

        let divisions = []; // Store unique division names
        let offenseFines = []; // Store total fines for each division
        let divisionFines = {}; // To track total fines for each unique division
        let uniqueDivisions = new Set(); // Use a Set to track unique division names

        response.forEach((division) => {
          const divisionName = division.name
            .replace("Police Division", "")
            .trim();

          // Initialize the total fine for this division if it hasn't been encountered
          if (!uniqueDivisions.has(divisionName)) {
            uniqueDivisions.add(divisionName); // Add to Set for uniqueness
            divisions.push(divisionName); // Add the unique division name
            divisionFines[divisionName] = 0; // Initialize fine for this division
          }

          const totalFinesForDivision = division.policeStations.reduce(
            (acc, station) => {
              return (
                acc +
                (station.offensePortals?.reduce((fineSum, offensePortal) => {
                  const hasDispatches =
                    offensePortal?.licenseDispatches?.length > 0;
                  const offenseFine = offensePortal?.offense?.fine || 0;

                  // Accumulate fines based on dispatched status
                  switch (dispatchedStatus) {
                    case "ALL":
                      return fineSum + offenseFine;
                    case "DISPATCHED":
                      return fineSum + (hasDispatches ? offenseFine : 0);
                    case "IN_HAND":
                      return fineSum + (!hasDispatches ? offenseFine : 0);
                    default:
                      return fineSum; // In case dispatchedStatus is not recognized
                  }
                }, 0) || 0)
              );
            },
            0
          );

          // Add the total fines for the division
          divisionFines[divisionName] += totalFinesForDivision;
        });

        // Convert the fine amounts into an array for offenseFines
        offenseFines = divisions.map((division) => divisionFines[division]);

        return { data: offenseFines, categories: divisions };
      }

      if (filterBy === "OFFENSE") {
        const response = await PoliceDivisionMaster.findAll({
          include: {
            model: PoliceStationMaster,
            as: "policeStations",
            include: [
              {
                model: DepartmentDriversOffensePortal,
                as: "offensePortals",
                where: whereClause,
                required: true,
                include: [
                  {
                    model: DepartmentDriversOffenseMaster,
                    as: "offense",
                    attributes: ["offense", "fine"], // Get offense name and fine fine
                  },
                  {
                    model: DepartmentDriversLicenseDispatches,
                    as: "licenseDispatches",
                  },
                ],
              },
            ],
          },
          distinct: true,
        });

        let offenseFines = []; // Store total fines for each offense
        let offenses = []; // Store unique offense names
        let offenseFinesMap = {}; // To track total fines for each unique offense

        response.forEach((division) => {
          division.policeStations.forEach((station) => {
            station.offensePortals.forEach((offensePortal) => {
              const offenseName = offensePortal?.offense?.offense;
              const offenseAmount = offensePortal?.offense?.fine || 0; // Get fine amount or default to 0

              // Initialize fine for this offense if it hasn't been encountered
              if (!offenseFinesMap[offenseName]) {
                offenseFinesMap[offenseName] = 0; // Initialize fine for this offense
                offenses.push(offenseName); // Add to unique offenses
              }

              const hasDispatches =
                offensePortal?.licenseDispatches?.length > 0;

              // Accumulate fines based on dispatched status
              switch (dispatchedStatus) {
                case "ALL":
                  offenseFinesMap[offenseName] += offenseAmount; // Sum fine for all offenses
                  break;
                case "DISPATCHED":
                  if (hasDispatches) {
                    offenseFinesMap[offenseName] += offenseAmount; // Sum only for dispatched offenses
                  }
                  break;
                case "IN_HAND":
                  if (!hasDispatches) {
                    offenseFinesMap[offenseName] += offenseAmount; // Sum only for in-hand offenses
                  }
                  break;
                default:
                  break; // Do nothing if dispatchedStatus is not recognized
              }
            });
          });
        });

        // Convert the fines into an array for offenseFines
        offenseFines = offenses.map((offense) => offenseFinesMap[offense]);

        return { data: offenseFines, categories: offenses };
      }

      if (filterBy === "STATION") {
        const response = await PoliceStationMaster.findAll({
          include: [
            {
              model: DepartmentDriversOffensePortal,
              as: "offensePortals",
              where: whereClause,
              required: true,
              include: [
                {
                  model: DepartmentDriversOffenseMaster,
                  as: "offense",
                  attributes: ["fine"], // Only fetch fine amount
                },
                {
                  model: DepartmentDriversLicenseDispatches,
                  as: "licenseDispatches",
                },
              ],
            },
          ],
        });

        let stationRevenues = []; // Total revenue for each station
        let stationNames = []; // Unique station names
        let stationRevenueMap = {}; // Map to track total revenue per station

        response.forEach((station) => {
          const stationName = station.police_station_name || "Unnamed Station"; // Use a default if name is missing
          if (!stationRevenueMap[stationName]) {
            stationRevenueMap[stationName] = 0; // Initialize revenue for this station
            stationNames.push(stationName); // Add to unique station names
          }

          // Sum up fines for the station based on dispatched status
          station.offensePortals.forEach((offensePortal) => {
            const offenseAmount = offensePortal?.offense?.fine || 0; // Fine amount or default to 0
            const hasDispatches = offensePortal?.licenseDispatches?.length > 0;

            switch (dispatchedStatus) {
              case "ALL":
                stationRevenueMap[stationName] += offenseAmount; // Sum fine for all offenses
                break;
              case "DISPATCHED":
                if (hasDispatches) {
                  stationRevenueMap[stationName] += offenseAmount; // Sum for dispatched offenses only
                }
                break;
              case "IN_HAND":
                if (!hasDispatches) {
                  stationRevenueMap[stationName] += offenseAmount; // Sum for in-hand offenses only
                }
                break;
              default:
                break; // Do nothing if dispatchedStatus is unrecognized
            }
          });
        });

        // Convert the revenue map into an array for stationRevenues
        stationRevenues = stationNames.map(
          (station) => stationRevenueMap[station]
        );

        return { data: stationRevenues, categories: stationNames };
      }

      if (filterBy === "OFFICER" && officerId) {
        if (officerId) {
          whereClause["police_officer_id"] = officerId;
        }

        const response = await DepartmentDriversOffensePortal.findAll({
          where: whereClause,
          include: [
            {
              model: DepartmentDriversLicenseDispatches,
              as: "licenseDispatches",
            },
            {
              model: DepartmentDriversOffenseMaster,
              as: "offense",
              attributes: ["offense", "fine"],
            },
          ],
          distinct: true,
        });

        let officerRevenues = []; // Total revenue for each station
        let offenseNames = []; // Unique station names
        let officerRevenueMap = {}; // Map to track total revenue per station

        response.forEach((offense) => {
          const offenseName = offense?.offense?.offense;
          if (!officerRevenueMap[offenseName]) {
            officerRevenueMap[offenseName] = 0; // Initialize revenue for this station
            offenseNames.push(offenseName); // Add to unique station names
          }

          const offenseAmount = offense?.offense?.fine || 0; // Fine amount or default to 0
          const hasDispatches = offense?.licenseDispatches?.length > 0;

          switch (dispatchedStatus) {
            case "ALL":
              officerRevenueMap[offenseName] += offenseAmount; // Sum fine for all offenses
              break;
            case "DISPATCHED":
              if (hasDispatches) {
                officerRevenueMap[offenseName] += offenseAmount; // Sum for dispatched offenses only
              }
              break;
            case "IN_HAND":
              if (!hasDispatches) {
                officerRevenueMap[offenseName] += offenseAmount; // Sum for in-hand offenses only
              }
              break;
            default:
              break; // Do nothing if dispatchedStatus is unrecognized
          }
        });

        // Convert the revenue map into an array for officerRevenues
        officerRevenues = offenseNames.map(
          (station) => officerRevenueMap[station]
        );

        return { data: officerRevenues, categories: offenseNames };
      }
    }

    return {};
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};

module.exports = {
  getLicenseInHandByFiltersQuery,
};
