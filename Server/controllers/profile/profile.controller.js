const client = require("../../config/db");
const profileService = require("../../services/profile/service");
const bcrypt = require("bcryptjs");

const fetchUserDataByUserId = (client, userId, callback) => {
  client.query(
    "SELECT * FROM ccc_user_masterfile WHERE user_id = $1",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        callback({
          success: false,
          msg: "Error querying database for user data",
          error: err.message,
        });
      } else {
        if (results.rows.length === 0) {
          callback({
            success: false,
            msg: "User not found",
          });
        } else {
          const userData = results.rows[0];
          callback(null, {
            success: true,
            userData: userData,
          });
        }
      }
    }
  );
};

const getUserData = async (req, res) => {
  console.log("Profile Controller: getUserData");
  const { userId } = req.params;

  fetchUserDataByUserId(client, userId, (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      if (result.success) {
        const userData = result.userData;
        // Process user data
        res.send({
          success: true,
          data: {
            email: userData.email,
            nicNumber: userData.nic_number,
            userName: userData.username,
            licenseNumber: userData.license_number,
          },
        });
      } else {
        res.send({
          success: false,
          msg: "Invalid user",
        });
      }
    }
  });
};

const updateUserData = async (req, res) => {
  const { username, email, nicNumber, password, userId, licenseNumber } =
    req.body;
  const hashed_password = password ? await bcrypt.hash(password, 10) : null;
  try {
    await profileService.updateProfileInformationService({
      userId: userId,
      username: username,
      email: email,
      nicNumber: nicNumber,
      hashed_password: hashed_password,
      licenseNo: licenseNumber,
    });
    res.send({
      success: true,
      msg: "Successfully updated user profile",
    });
  } catch (error) {
    res.send({
      success: false,
      msg:
        error && error.message
          ? error.message
          : "Failed to update profile information",
      error: error,
    });
  }
};

const updateUserAppLanguage = async (req, res) => {
  const { language, userId } = req.body;

  client.query(
    "UPDATE ccc_user_masterfile SET language = $1 WHERE user_id = $2",
    [language, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send({
          success: false,
          msg: "Error updating user language",
          error: err.message,
        });
      } else {
        res.send({
          success: true,
          msg: "User language updated successfully",
        });
      }
    }
  );
};

module.exports = {
  getUserData,
  updateUserData,
  updateUserAppLanguage,
};
