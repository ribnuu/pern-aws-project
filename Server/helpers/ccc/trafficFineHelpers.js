const { sendSingleSmsHutch } = require("../hutchSmsService");
const { generateRandomNumberOfNDigits } = require("../randomNumber");
const cccDepartmentDriverOffensesPortalQueries = require("../../services/departmentDriverOffensePortal/departmentDriverOffensePortalQueries");

const sendTrafficFinePaymentSuccessfulMesssageWithConfirmationCode = async ({
  trafficOffenseReferenceNumber,
}) => {
  try {
    // Generate a 6 digit code
    const code = generateRandomNumberOfNDigits({ n: 6 });

    // Save the code in the department_drivers_offense_portal
    const updatedRow =
      await cccDepartmentDriverOffensesPortalQueries.updateConfirmationCodeByReferenceNumberQuery(
        {
          referenceNumber: trafficOffenseReferenceNumber,
          confirmationCode: code,
        }
      );
    // Send the payment successful message to the relevant number
    const message = `The payment for the traffic fine associated with reference number ${trafficOffenseReferenceNumber?.trim()} was successful. Please provide the code below to the police officer when retrieving your license: ${code}`;
    await sendSingleSmsHutch(updatedRow?.mobile_number, message);
  } catch (error) {
    console.log(error);
    //  TODO - When a payment is successful and if the system fails to send a message to the relevant user
    //  TODO - store the failed details in a seperate db table, and then account for it using some schedular or manual interference for now,
    //  TODO - The above stated condition MUST be considered and implemented
    throw error;
  }
};

module.exports = {
  sendTrafficFinePaymentSuccessfulMesssageWithConfirmationCode,
};
