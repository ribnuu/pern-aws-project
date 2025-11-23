const client = require("../../config/db");
const { sendSingleSmsHutch } = require("../../helpers/hutchSmsService");
const notificationService = require("../../services/notifications/notificationService");
const NotificationTypes = require("../../enums/notificationTypes");
const NotificationPriorities = require("../../enums/notificationPriorities");
const userServices = require("../../services/user/userService");
// const trafficOffenseMasterServices = require("../../services/departmenDriverOffenseMaster/departmenDriverOffenseMasterService");
const departmenDriverOffenseMasterService = require("../../services/departmentDriverOffensePortal/departmentDriverOffensePortalService");
const cccPoliceStationQueries = require("../../services/ccc-police-station/queries");
const setUpAssociationsCCC = require("../../models/ccc");
const cccDepartmentTrafficOffensePointsQueries = require("../../services/ccc-department-traffic-offense-points/queries");
const cccDepartmentDriverOffensePointsQueries = require("../../services/ccc-department-driver-offense-points/queries");
const {
  generateTrafficFineReferenceNumber,
} = require("../../helpers/ccc/generateTrafficFineRefNo");
const { ref } = require("pdfkit");

const generateReferenceNumber = ({ constantPart = "0000" }) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${constantPart}`;
};

// const getOffensesByDriverLicenseNumber = async (req, res) => {
//   const { licenseNumber } = req.params;
//   const query = `
//         SELECT * FROM department_drivers_offense_portal
//         WHERE license_number ILIKE  $1
//     `;
//   client.query(query, [licenseNumber], (err, results) => {
//     if (err) {
//       res.send({
//         success: false,
//         msg: "Failed to fetch records",
//         er: err.message,
//       });
//     } else {
//       res.send({
//         success: true,
//         data: results.rows,
//         count: results.rows.length,
//       });
//     }
//   });
// };

// const getOffensesByDriverLicenseNumber = async (req, res) => {
//   const { licenseNumber } = req.params;
//   const query = `
//     SELECT ddop.*, psm.police_station_name, psm.police_station_address
//     FROM department_drivers_offense_portal AS ddop
//     LEFT JOIN police_station_master AS psm
//     ON ddop.police_station_id = psm.id
//     WHERE ddop.license_number ILIKE $1
//   `;

//   client.query(query, [licenseNumber], (err, results) => {
//     if (err) {
//       res.send({
//         success: false,
//         msg: "Failed to fetch records",
//         error: err.message,
//       });
//     } else {
//       res.send({
//         success: true,
//         data: results.rows,
//         count: results.rows.length,
//       });
//     }
//   });
// };

const getOffensesByDriverLicenseNumber = async (req, res) => {
  const { licenseNumber } = req.params;

  try {
    const { DepartmentDriversOffensePortal, PoliceStationMaster } =
      setUpAssociationsCCC();
    const results = await DepartmentDriversOffensePortal.findAll({
      where: {
        license_number: licenseNumber, // Using Op.iLike for case-insensitive search
      },
      include: [
        {
          model: PoliceStationMaster,
          attributes: ["police_station_name", "police_station_address"], // Select specific fields
          as: "policeStation",
        },
      ],
    });

    res.send({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (err) {
    res.send({
      success: false,
      msg: "Failed to fetch records",
      error: err.message,
    });
  }
};

// const getOffenseByReferenceNumber = async (req, res) => {
//   const { referenceNumber } = req.params;
//   const query = `
//         SELECT
//             ddop.offense_date_time,
//             ddop.license_number,
//             ddop.vehicle_number,
//             ddop.mobile_number,
//             cum.username AS officer_name,
//             ddom.offense AS offense_name,
//             ddom.fine AS fine_amount
//         FROM
//             department_drivers_offense_portal ddop
//         INNER JOIN
//             ccc_user_masterfile cum
//         ON
//             ddop.police_officer_id = cum.user_id
//         INNER JOIN
//             department_drivers_offense_master ddom
//         ON
//             ddop.offense_id = ddom.id
//         WHERE
//             ddop.reference_number ILIKE $1
//     `;
//   client.query(query, [referenceNumber], (err, results) => {
//     if (err) {
//       res.send({
//         success: false,
//         msg: "Failed to fetch records",
//         er: err.message,
//       });
//     } else {
//       res.send({ success: true, data: results.rows[0] ?? null });
//     }
//   });
// };

const getOffenseByReferenceNumber = async (req, res) => {
  const { referenceNumber } = req.params;
  const query = `
        SELECT 
            ddop.offense_date_time, 
            ddop.license_number,
            ddop.vehicle_number,
            ddop.mobile_number,
            cum.username AS officer_name,
            ddom.offense AS offense_name,
            ddom.fine AS fine_amount
        FROM 
            department_drivers_offense_portal ddop
        INNER JOIN 
            ccc_user_masterfile cum 
        ON 
            ddop.police_officer_id = cum.user_id
        INNER JOIN
            department_drivers_offense_master ddom
        ON
            ddop.offense_id = ddom.id
        WHERE 
            TRIM(ddop.reference_number) ILIKE TRIM($1)
    `;

  client.query(query, [referenceNumber], (err, results) => {
    if (err) {
      res.send({
        success: false,
        msg: "Failed to fetch records",
        er: err.message,
      });
    } else {
      res.send({ success: true, data: results.rows[0] ?? null });
    }
  });
};

// Function to insert a new record into department_drivers_offense_portal
const createOffenseRecord = async (req, res) => {
  try {
    const policeOfficerId = req.headers.user_id;

    const policeStationId =
      await cccPoliceStationQueries.getPoliceStationIdByPoliceOfficerIdQuery({
        policeOfficerId: policeOfficerId,
      });

    if (!policeStationId) {
      throw new Error("No police station assigned");
    }
    const { DepartmentDriversOffensePortal } = setUpAssociationsCCC();

    // Retrieve values from request body
    const {
      offenseId,
      offenseDateTime,
      licenseNumber,
      nicNumber,
      // policeOfficerId,
      latitude,
      longitude,
      vehicleNumber,
      paymentId,
      isCourts,
      courtsDate,
      comments,
      locationDescription,
      mobileNumber,
      policeOfficerName,
      offense,
    } = req.body;

    if (!offense) {
      throw new Error("No offense selected");
    }

    const trafficOffensePoints =
      await cccDepartmentTrafficOffensePointsQueries.getTrafficOffensePointsByOffenseAndTrafficOffensePointsIdQuery(
        {
          offenseId: offense.id,
          trafficOffensePointsId: offense.department_traffic_offense_points_id,
          attributes: ["points"],
        }
      );

    if (!trafficOffensePoints || !trafficOffensePoints?.points) {
      throw new Error("No department traffic offense points");
    }

    // const refNo = generateReferenceNumber({
    //   constantPart: policeOfficerId.slice(-4),
    // });

    const refNo = await generateTrafficFineReferenceNumber();

    if (!refNo) {
      throw new Error("Failed to generate reference number");
    }

    const user = await userServices.getUserbyMobileNumber(mobileNumber);
    // const offense =
    //   await trafficOffenseMasterServices.getTrafficOffenseMasterById(offenseId);

    const newRecord = await DepartmentDriversOffensePortal.create({
      offense_id: offenseId,
      reference_number: refNo,
      offense_date_time: offenseDateTime,
      license_number: licenseNumber,
      nic_number: nicNumber,
      police_officer_id: policeOfficerId,
      latitude: latitude,
      longitude: longitude,
      vehicle_number: vehicleNumber,
      payment_id: paymentId,
      is_courts: isCourts,
      courts_date: courtsDate,
      comments: comments,
      location_description: locationDescription,
      mobile_number: mobileNumber,
      police_station_id: policeStationId,
      points: trafficOffensePoints.points,
      created_at: new Date(), // Automatically handled if timestamps are enabled in the model
      last_updated_at: new Date(), // Automatically handled if timestamps are enabled in the model
    });

    await cccDepartmentDriverOffensePointsQueries.updateDepartmentDriverOffensePointsByLicenseNumberQuery(
      {
        licenseNumber: licenseNumber,
        points: trafficOffensePoints.points,
      }
    );

    const appLinkMessage = user?.user_id
      ? ""
      : " Download the citizen app for android on https://www.android.com and for ios https://www.ios.com";

    await notificationService.createNotification(
      user?.user_id,
      mobileNumber,
      NotificationTypes.TRAFFIC_FINE,
      "Traffic Fine",
      `You have a traffic fine - ${refNo}.`,
      refNo,
      NotificationPriorities.MEDIUM
    );
    await sendSingleSmsHutch(
      mobileNumber,
      `You have committed a traffic offense - ${offense.offense} while driving the vehicle ${vehicleNumber.toString()}. Your license number is ${licenseNumber.toString()}. Your offense is recorded by the officer ${policeOfficerName}. Reference Number: ${refNo}. This message serves as the temporary license until you make the payment and obtain the license. Please ensure that your fine is paid within 14 days inorder to avoid courts.${appLinkMessage}`
    );
    res.send({ success: true });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).send({
      success: false,
      msg: "Failed to insert record",
      error: error.message,
    });
  }
};

// const getOffensesByUserId = async (req, res) => {
//     const { userId } = req.params;
//     const query = `
//         SELECT * FROM department_drivers_offense_portal
//         WHERE license_number ILIKE  $1
//     `;
//     client.query(query, [licenseNumber], (err, results) => {
//         if (err) {
//             res.send({success: false, msg: 'Failed to fetch records', er: err.message});
//         } else {
//             res.send({success: true, data: results.rows, count: results.rows.length});
//         }
//     });
// };

const getFinesOnMyDutyByPoliceOfficerIdController = async (req, res, next) => {
  const { policeOfficerId } = req.params;
  const { fromDate, toDate } = req.body;
  try {
    const data =
      await departmenDriverOffenseMasterService.getFinesOnMyDutyByPoliceOfficerIdService(
        policeOfficerId,
        fromDate,
        toDate
      );
    res.json({ success: true, data });
  } catch (error) {
    console.error(
      "Error fetching fines on my duty by police officer id:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMobileNumberByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { mobileNumber } = req.body;
  try {
    const data =
      await departmenDriverOffenseMasterService.updateMobileNumberByIdService(
        id,
        mobileNumber
      );
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error updating offense mobile number by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFinesOnMeByMobileNumberController = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const data =
      await departmenDriverOffenseMasterService.getFinesOnMeByMobileNumberService(
        userId
      );
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to get fines on you" });
  }
};

const getPaidFinesOnMeByMobileNumberController = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const data =
      await departmenDriverOffenseMasterService.getPaidFinesOnMeByMobileNumberService(
        userId
      );
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to get fines on you" });
  }
};

module.exports = {
  getOffensesByDriverLicenseNumber,
  createOffenseRecord,
  getOffenseByReferenceNumber,
  getFinesOnMyDutyByPoliceOfficerIdController,
  updateMobileNumberByIdController,
  getFinesOnMeByMobileNumberController,
  getPaidFinesOnMeByMobileNumberController,
};
