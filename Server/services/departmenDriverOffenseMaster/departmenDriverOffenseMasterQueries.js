const { Op } = require("sequelize");
const client = require("../../config/db");
const setUpAssociationsCCC = require("../../models/ccc");

const getTrafficOffenseMasterByIdQuery = async (id) => {
  const query = `SELECT fine, offense, points FROM department_drivers_offense_master WHERE id = $1`;
  const values = [id];

  try {
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("Error retrieving offense by offense id:", err);
    throw err;
  }
};

const getFinesOnMeByMobileNumberQuery = async (userId) => {
  try {
    const {
      DepartmentDriversOffensePortal,
      CccUserMasterfile,
      HnbPaymentNotification,
    } = setUpAssociationsCCC();

    // Fetch the mobile number of the user
    const user = await CccUserMasterfile.findOne({
      where: {
        user_id: userId,
      },
      attributes: ["mobile_number"],
    });

    if (user && user.mobile_number) {
      // Fetch fines where last 9 digits of mobile numbers match
      const fines = await DepartmentDriversOffensePortal.findAll({
        where: {
          mobile_number: {
            [Op.substring]: user.mobile_number.slice(-9), // Get the last 9 digits of user's mobile number
          },
        },
      });

      // Extract the reference numbers from the fines
      const referenceNumbers = fines.map((fine) => fine.reference_number);

      if (referenceNumbers.length > 0) {
        // Step 2: Fetch matching HNB Payment Notifications based on req_reference_number
        const paymentNotifications = await HnbPaymentNotification.findAll({
          where: {
            req_reference_number: {
              [Op.in]: referenceNumbers, // Match the reference numbers
            },
            reason_code: "100",
            decision: "ACCEPT",
          },
        });

        // Step 3: Combine the fines and payment notifications (optional logic based on your needs)
        const combinedResults = fines.map((fine) => {
          const matchingPayments = paymentNotifications.filter(
            (payment) => payment.req_reference_number === fine.reference_number
          );
          return {
            ...fine.toJSON(), // Convert Sequelize instance to plain object
            paymentNotifications: matchingPayments, // Attach matching payment notifications
            isPaidFine: matchingPayments && matchingPayments.length > 0,
          };
        });

        const pendingFines = combinedResults.filter(
          (result) => !result.isPaidFine
        );

        return pendingFines;
      }

      return [];
    }

    return [];
  } catch (error) {
    throw error;
  }
};

const getPaidFinesOnMeByMobileNumberQuery = async (userId) => {
  try {
    const {
      DepartmentDriversOffensePortal,
      CccUserMasterfile,
      HnbPaymentNotification,
    } = setUpAssociationsCCC();

    // Fetch the mobile number of the user
    const user = await CccUserMasterfile.findOne({
      where: {
        user_id: userId,
      },
      attributes: ["mobile_number"],
    });

    if (user && user.mobile_number) {
      // Fetch fines where last 9 digits of mobile numbers match
      const fines = await DepartmentDriversOffensePortal.findAll({
        where: {
          mobile_number: {
            [Op.substring]: user.mobile_number.slice(-9), // Get the last 9 digits of user's mobile number
          },
        },
      });

      // Extract the reference numbers from the fines
      const referenceNumbers = fines.map((fine) => fine.reference_number);

      if (referenceNumbers.length > 0) {
        // Step 2: Fetch matching HNB Payment Notifications based on req_reference_number
        const paymentNotifications = await HnbPaymentNotification.findAll({
          where: {
            req_reference_number: {
              [Op.in]: referenceNumbers, // Match the reference numbers
            },
            reason_code: "100",
            decision: "ACCEPT",
          },
        });

        // Step 3: Combine the fines and payment notifications (optional logic based on your needs)
        const combinedResults = fines.map((fine) => {
          const matchingPayments = paymentNotifications.filter(
            (payment) => payment.req_reference_number === fine.reference_number
          );
          return {
            ...fine.toJSON(), // Convert Sequelize instance to plain object
            paymentNotifications: matchingPayments, // Attach matching payment notifications
            isPaidFine: matchingPayments && matchingPayments.length > 0,
          };
        });

        const paidFines = combinedResults.filter((result) => result.isPaidFine);

        return paidFines;
      }

      return [];
    }

    return [];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTrafficOffenseMasterByIdQuery,
  getFinesOnMeByMobileNumberQuery,
  getPaidFinesOnMeByMobileNumberQuery,
};
