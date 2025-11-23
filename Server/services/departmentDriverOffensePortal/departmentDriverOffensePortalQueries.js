const client = require("../../config/db");
const dayjs = require("dayjs");
const setUpAssociationsCCC = require("../../models/ccc");

const getFinesOnMyDutyByPoliceOfficerIdQuery = async (id, fromDate, toDate) => {
  let query = `SELECT * FROM department_drivers_offense_portal WHERE police_officer_id = $1`;
  const values = [id];

  try {
    // Check if fromDate and toDate are provided
    if (fromDate && toDate) {
      query += ` AND offense_date_time >= $2 AND offense_date_time <= $3`;
      values.push(fromDate, toDate);
    } else {
      // Default to current day
      const currentDate = dayjs().format("YYYY-MM-DD");
      query += ` AND offense_date_time::date = $2`;
      values.push(currentDate);
    }

    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving offenses by police officer id:", err);
    throw err;
  }
};

// const updateMobileNumberByIdQuery = async (id, newMobileNumber) => {
//   // Ensure id is converted to an integer
//   const idInt = parseInt(id, 10); // Assuming id is passed as a string and needs conversion

//   const updateQuery = `
//     UPDATE department_drivers_offense_portal
//     SET mobile_number = $1
//     WHERE id = $2
//   `;
//   const values = [newMobileNumber, idInt]; // Use idInt as the converted integer

//   try {
//     const res = await client.query(updateQuery, values);
//     return res.rowCount; // Return the number of rows affected
//   } catch (err) {
//     console.error('Error updating mobile number:', err);
//     throw err;
//   }
// };

const updateMobileNumberByIdQuery = async (id, newMobileNumber) => {
  // Ensure id is converted to an integer
  const idInt = parseInt(id, 10); // Assuming id is passed as a string and needs conversion

  const updateQuery = `
    UPDATE department_drivers_offense_portal
    SET mobile_number = $1
    WHERE id = $2
    RETURNING *
  `;
  const values = [newMobileNumber, idInt]; // Use idInt as the converted integer

  try {
    const res = await client.query(updateQuery, values);
    if (res.rows.length > 0) {
      return res.rows[0]; // Return the first (and only) row from the result set
    } else {
      throw new Error(`No record found with id ${id}`);
    }
  } catch (err) {
    console.error("Error updating mobile number:", err);
    throw err;
  }
};

const updateConfirmationCodeByReferenceNumberQuery = async ({
  confirmationCode = null,
  referenceNumber = null,
}) => {
  try {
    if (!confirmationCode || !referenceNumber) {
      throw new Error(
        "Missing attribute when updating the confirmation code by reference number"
      );
    }

    // Set up associations and get the model
    const { DepartmentDriversOffensePortal } = setUpAssociationsCCC();

    // Update the confirmation code where the reference number matches
    const [updatedCount, updatedRows] =
      await DepartmentDriversOffensePortal.update(
        { confirmation_code: confirmationCode }, // New value to set
        {
          where: { reference_number: referenceNumber }, // Condition for the update
          returning: true, // This option will return the updated rows
        }
      );

    // If a row was updated, return the updated row
    if (updatedCount > 0) {
      return updatedRows[0]; // Return the first updated row
    }

    return null; // Return null if no rows were updated
  } catch (error) {
    console.error("Error updating confirmation code:", error);
    return null; // Return null in case of an error
  }
};

// const updateConfirmationCodeByReferenceNumberQuery = async ({
//   confirmationCode = null,
//   referenceNumber = null,
// }) => {
//   try {
//     if (!confirmationCode || !referenceNumber) {
//       throw new Error(
//         "Missing attribute when updating the confirmation code by reference number"
//       );
//     }

//     // Set up associations and get the model
//     const { DepartmentDriversOffensePortal } = setUpAssociationsCCC();

//     // Update the confirmation code where the reference number matches
//     const [updatedCount] = await DepartmentDriversOffensePortal.update(
//       { confirmation_code: confirmationCode }, // New value to set
//       {
//         where: { reference_number: referenceNumber }, // Condition for the update
//       }
//     );

//     // If a row was updated, fetch and return the updated row
//     if (updatedCount > 0) {
//       const updatedRow = await DepartmentDriversOffensePortal.findOne({
//         where: { reference_number: referenceNumber }, // Fetch the updated row
//       });
//       return updatedRow; // Return the updated row
//     }

//     return null; // Return null if no rows were updated
//   } catch (error) {
//     console.error("Error updating confirmation code:", error);
//     return null; // Return null in case of an error
//   }
// };

const authenticateConfirmationCodeToDispatchLicenseQuery = async ({
  referenceNumber = null,
  confirmationCode = null,
}) => {
  try {
    if (!referenceNumber || !confirmationCode) {
      throw new Error("Error, Missing attributes");
    }

    const confirmationCodeInt = parseInt(confirmationCode, 10);

    const { DepartmentDriversOffensePortal } = setUpAssociationsCCC();

    // Check if a record exists with the given reference number and confirmation code
    const record = await DepartmentDriversOffensePortal.findOne({
      where: {
        reference_number: referenceNumber,
        confirmation_code: confirmationCodeInt,
      },
    });

    // Return true if a matching record is found, otherwise return false
    return record !== null; // If record exists, return true; otherwise, return false
  } catch (error) {
    console.error("Error authenticating confirmation code:", error);
    return false; // Return false in case of an error
  }
};

module.exports = {
  getFinesOnMyDutyByPoliceOfficerIdQuery,
  updateMobileNumberByIdQuery,
  updateConfirmationCodeByReferenceNumberQuery,
  authenticateConfirmationCodeToDispatchLicenseQuery,
};
