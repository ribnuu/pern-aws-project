const departmentDriverOffensePortalQueries = require("./departmentDriverOffensePortalQueries");
const notificationQueries = require("../notifications/notificationQueries");
const userQueries = require("../user/userQueries");
const departmenDriverOffenseMasterQueries = require("../departmenDriverOffenseMaster/departmenDriverOffenseMasterQueries");
const NotificationTypes = require("../../enums/notificationTypes");
const NotificationPriorities = require("../../enums/notificationPriorities");
const { sendSingleSmsHutch } = require("../../helpers/hutchSmsService");

const getFinesOnMyDutyByPoliceOfficerIdService = async (
  id,
  fromDate,
  toDate
) => {
  try {
    const data =
      await departmentDriverOffensePortalQueries.getFinesOnMyDutyByPoliceOfficerIdQuery(
        id,
        fromDate,
        toDate
      );
    return data;
  } catch (error) {
    console.error("Error fetching offenses by police officer id", error);
    throw error;
  }
};

const updateMobileNumberByIdService = async (id, mobileNumber) => {
  try {
    // 1.) Update the mobile number in ddop - DONE
    // 2.) If there is a notification already in notifications, delete the record from notifications table
    //     Delete record from notifications table where notifications.related_id === ddop.reference_number - DONE
    // 3.) Send new notification (app) - DONE
    // 3.) Send the sms again to the newly updated number
    const offenseData =
      await departmentDriverOffensePortalQueries.updateMobileNumberByIdQuery(
        id,
        mobileNumber
      ); // DONE
    const offenseMasterData =
      await departmenDriverOffenseMasterQueries.getTrafficOffenseMasterByIdQuery(
        offenseData.offense_id
      ); //DONE
    const deletedNotification =
      await notificationQueries.deleteNotificationsByRelatedId(
        offenseData.reference_number
      ); // DONE
    const user = await userQueries.getUserbyMobileNumberQuery(mobileNumber); // DONE
    const policeOfficerData = await userQueries.getUserNameByUserIdQuery(
      offenseData.police_officer_id
    ); // DONE
    if (user && user?.user_id) {
      await notificationQueries.insertNotificationQuery(
        user.user_id,
        mobileNumber,
        NotificationTypes.TRAFFIC_FINE,
        "Traffic Fine",
        `You have a traffic fine - ${offenseData.reference_number}.`,
        offenseData.reference_number,
        NotificationPriorities.MEDIUM
      );
    }
    const appLinkMessage = user?.user_id
      ? ""
      : " Download the citizen app for android on https://www.android.com and for ios https://www.ios.com";
    await sendSingleSmsHutch(
      mobileNumber,
      `You have committed a traffic offense - ${offenseMasterData.offense} while driving the vehicle ${offenseData.vehicle_number.toString()}. Your license number is ${offenseData.license_number.toString()}. Your offense is recorded by the officer ${policeOfficerData.username}. Reference Number: ${offenseData.reference_number}. This message serves as the temporary license until you make the payment and obtain the license. Please ensure that your fine is paid within 14 days inorder to avoid courts.${appLinkMessage}`
    );
    return offenseData;
  } catch (error) {
    console.error("Error updating offense mobile number by id", error);
    throw error;
  }
};

const getFinesOnMeByMobileNumberService = async (userId) => {
  try {
    const data =
      await departmenDriverOffenseMasterQueries.getFinesOnMeByMobileNumberQuery(
        userId
      );
    return data;
  } catch (error) {
    throw error;
  }
};

const getPaidFinesOnMeByMobileNumberService = async (offenseId) => {
  try {
    const user =
      await departmenDriverOffenseMasterQueries.getPaidFinesOnMeByMobileNumberQuery(
        offenseId
      );
    return user;
  } catch (error) {
    console.error(
      "Error fetching paid fines by me using my mobile number",
      error
    );
    throw error;
  }
};

module.exports = {
  getFinesOnMyDutyByPoliceOfficerIdService,
  updateMobileNumberByIdService,
  getFinesOnMeByMobileNumberService,
  getPaidFinesOnMeByMobileNumberService,
};
