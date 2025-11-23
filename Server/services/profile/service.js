const profileQueries = require("./queries");

const updateProfileInformationService = async ({
  userId,
  username,
  email,
  nicNumber,
  hashed_password,
  licenseNo,
}) => {
  try {
    const data = await profileQueries.updateUserProfileQuery({
      userId: userId,
      username: username,
      email: email,
      nicNumber: nicNumber,
      hashed_password: hashed_password,
      licenseNo: licenseNo,
    });
  } catch (error) {
    console.error("Error updating profile information @ service", error);
    throw error;
  }
};

module.exports = {
  updateProfileInformationService,
};
