const client = require("../../config/db");
const { generalziedUpdateQuery } = require("../../utils/dbUtils");

const updateUserProfileQuery = async ({
  userId,
  username,
  email,
  nicNumber,
  hashed_password,
  licenseNo,
}) => {
  try {
    const updatedUserProfile = await generalziedUpdateQuery(
      "ccc_user_masterfile",
      {
        username: username,
        email: email,
        nic_number: nicNumber,
        license_number: licenseNo,
        password: hashed_password,
      },
      {
        user_id: userId,
      }
    );
    return updatedUserProfile;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateUserProfileQuery,
};
