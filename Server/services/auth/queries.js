const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");
const { generateRandomNumberOfNDigits } = require("../../helpers/randomNumber");
const { sendSingleSmsHutch } = require("../../helpers/hutchSmsService");

const createCccUserAffiliation = async ({ user_id, group_id, role_id }) => {
  const { CccUserAffiliations } = setUpAssociationsCCC();

  try {
    // Insert new record
    const newAffiliation = await CccUserAffiliations.create({
      user_id: user_id, // Replace with actual user ID
      group_id: group_id, // Replace with actual group ID
      role_id: role_id, // Replace with actual role ID
    });

    console.log("New affiliation created:", newAffiliation);
  } catch (error) {
    console.error("Error creating affiliation:", error);
  }
};

const updateLanguageByUserId = async (userId, language) => {
  const { CccUserMasterfile } = setUpAssociationsCCC();

  try {
    const [affectedRows] = await CccUserMasterfile.update(
      { language },
      { where: { user_id: userId } }
    );

    if (affectedRows > 0) {
      return { status: true, msg: "Language updated successfully" };
    } else {
      return { status: false, msg: "No user found with the specified user ID" };
    }
  } catch (error) {
    console.error(error);
    return {
      status: false,
      msg: "Failed to update language - System Error",
      error: error.message,
    };
  }
};

const generateAndUpdateMobileOtpInDb = async (mobileNumber) => {
  const { CccUserMasterfile } = setUpAssociationsCCC();
  const mobileOtp = generateRandomNumberOfNDigits({ n: 6, startsWith: 6 });
  const lastNineDigits = mobileNumber.slice(-9);

  try {
    const [affectedRows] = await CccUserMasterfile.update(
      { mobile_otp: mobileOtp },
      {
        where: {
          mobile_number: {
            [Op.like]: `%${lastNineDigits}`,
          },
        },
      }
    );

    if (affectedRows > 0) {
      await sendSingleSmsHutch(
        lastNineDigits,
        `Your OTP for login is ${mobileOtp}`
      );
      return {
        status: true,
        msg: "OTP has been sent to your mobile number",
      };
    } else {
      throw new Error("No user found with the specified mobile number");
    }
  } catch (error) {
    console.error("Error updating mobile OTP:", error);
    throw new Error(`Failed to send OTP - ${error.message}`);
  }
};

const createNewUserWithMobileNumber = async (mobileNumber, language) => {
  const { CccUserMasterfile } = setUpAssociationsCCC();

  try {
    const latestUser = await CccUserMasterfile.findOne({
      order: [["user_id", "DESC"]],
      attributes: ["user_id"],
    });

    const newUserId = latestUser
      ? parseInt(latestUser.user_id, 10) + 1
      : 1001000000000001;

    await CccUserMasterfile.create({
      user_id: newUserId,
      username: mobileNumber,
      mobile_number: mobileNumber,
      language,
      mobile_verified: false,
    });

    // By default every user is a general public and role citizen
    await createCccUserAffiliation({
      user_id: newUserId,
      group_id: 8,
      role_id: 5,
    });
    return await generateAndUpdateMobileOtpInDb(mobileNumber);
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      msg: "Error creating user",
      error: error.message,
    };
  }
};

const loginWithMobileNumberQuery = async ({ language, lastNineDigits }) => {
  try {
    const { CccUserMasterfile } = setUpAssociationsCCC();

    const user = await CccUserMasterfile.findOne({
      where: {
        mobile_number: {
          [Op.like]: `%${lastNineDigits}`,
        },
      },
      attributes: ["user_id", "mobile_verified", "language", "mobile_number"],
    });

    if (user) {
      const {
        user_id,
        mobile_verified,
        language: langInDb,
        mobile_number,
      } = user;

      if (mobile_verified) {
        const mobile_otp = generateRandomNumberOfNDigits({
          n: 6,
          startsWith: 6,
        });
        console.log(mobile_otp);

        await sendSingleSmsHutch(
          mobile_number.slice(-9),
          `Your OTP for login is ${mobile_otp}`
        );

        if (language && langInDb !== language) {
          await updateLanguageByUserId(user_id, language);
        }

        await user.update({ mobile_otp, language });

        return {
          status: true,
          msg: "OTP has been sent to your mobile number",
        };
      } else {
        return await generateAndUpdateMobileOtpInDb(lastNineDigits);
      }
    } else {
      return await createNewUserWithMobileNumber(lastNineDigits, language);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send OTP - System Error: " + error.message);
  }
};

module.exports = {
  loginWithMobileNumberQuery,
};
