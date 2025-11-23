const client = require("../../config/db");
const brcypt = require("bcrypt");
const userService = require("../../services/user/userService");
const { generateRandomNumberOfNDigits } = require("../../helpers/randomNumber");
const { sendSingleSmsHutch } = require("../../helpers/hutchSmsService");

const getNUsersByCreatedAtDateController = async (req, res) => {
  const { count } = req.body;
  try {
    const data = await userService.getNUsersByCreatedAtDateService(count);
    res.send({ success: false, data });
  } catch (error) {
    res.send({ success: false });
  }
};

const searchUsersController = async (req, res) => {
  const { searchString } = req.body;
  try {
    const data = await userService.searchUsersService(searchString);
    res.send({ success: false, data });
  } catch (error) {
    res.send({ success: false });
  }
};

const updateLanguageByUserId = (userId, language, callback) => {
  client.query(
    "UPDATE ccc_user_masterfile SET language = $1 WHERE user_id = $2",
    [language, userId],
    (err, updatedResult) => {
      if (err) {
        callback({
          status: false,
          msg: "Failed to update language - System Error",
          error: err.message,
        });
      } else {
        callback({
          status: true,
          msg: "Language updated successfully",
        });
      }
    }
  );
};

const updateUserRole = (client, userId, userRole, callback) => {
  // Update query to set user_role for a specific user_id
  const query = `
    UPDATE ccc_user_masterfile
    SET user_role = $1
    WHERE user_id = $2
  `;

  // Execute the query
  client.query(query, [userRole, userId], (err, result) => {
    if (err) {
      console.error("Error updating user role:", err);
      callback({
        success: false,
        msg: "Error updating user role",
        error: err.message,
      });
    } else {
      callback(null, {
        success: true,
        msg: "User role updated successfully",
      });
    }
  });
};

const updateUserGroup = (client, userId, userGroup, callback) => {
  // Update query to set user_group for a specific user_id
  const query = `
    UPDATE ccc_user_masterfile
    SET user_group = $1
    WHERE user_id = $2
  `;

  // Execute the query
  client.query(query, [userGroup, userId], (err, result) => {
    if (err) {
      console.error("Error updating user group:", err);
      callback({
        success: false,
        msg: "Error updating user group",
        error: err.message,
      });
    } else {
      callback(null, {
        success: true,
        msg: "User group updated successfully",
      });
    }
  });
};

const updateMobileVerified = (client, userId, mobileVerified, callback) => {
  // Update query to set mobile_verified for a specific user_id
  const query = `
    UPDATE ccc_user_masterfile
    SET mobile_verified = $1
    WHERE user_id = $2
  `;

  // Execute the query
  client.query(query, [mobileVerified, userId], (err, result) => {
    if (err) {
      console.error("Error updating mobile verified:", err);
      callback({
        success: false,
        msg: "Error updating mobile verified",
        error: err.message,
      });
    } else {
      callback(null, {
        success: true,
        msg: "mobile verified updated successfully",
      });
    }
  });
};

const createNewUserWithMobileNumber = (
  res,
  client,
  mobileNumber,
  language,
  callback
) => {
  client.query(
    "SELECT user_id FROM ccc_user_masterfile ORDER BY user_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
        callback({
          success: false,
          msg: "Error querying database for user ID",
          error: err.message,
        });
      } else {
        let newUserId = 1001000000000001; // Default to 1001000000000001 if no users exist
        if (results.rowCount > 0) {
          newUserId = parseInt(results.rows[0].user_id, 10) + 1;
        }
        // Insert new user
        client.query(
          "INSERT INTO ccc_user_masterfile (user_id, username, mobile_number, language, mobile_verified) VALUES ($1, $2, $3, $4, $5)",
          [newUserId, mobileNumber, mobileNumber, language, false], // here the mobile number is set as the username too
          async (err2, results2) => {
            if (err2) {
              console.error(err2);
              callback({
                success: false,
                msg: "Error creating user",
                error: err2.message,
              });
            } else {
              generateAndUpdateMobileOtpInDb(
                client,
                mobileNumber,
                (err, result) => {
                  if (err) {
                    res.send({
                      status: false,
                      msg: "Failed to send OTP - System Error",
                      error: err.message,
                    });
                  } else {
                    res.send({
                      status: true,
                      msg: "OTP has been sent to your mobile number",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

const generateAndUpdateMobileOtpInDb = (client, mobileNumber, callback) => {
  const mobileOtp = generateRandomNumberOfNDigits({ n: 6, startsWith: 6 });
  console.log(mobileOtp);
  const lastNineDigits = mobileNumber.slice(-9);
  client.query(
    "UPDATE ccc_user_masterfile SET mobile_otp = $1 WHERE RIGHT(mobile_number, 9) = $2",
    [mobileOtp, lastNineDigits],
    async (err, updatedResult) => {
      if (err) {
        console.error("Error updating mobile OTP:", err);
        callback({
          status: false,
          msg: "Failed to send OTP - System Error",
          error: err.message,
        });
      } else {
        // Send the otp through sms
        try {
          await sendSingleSmsHutch(
            lastNineDigits,
            `Your OTP for login is ${mobileOtp}`
          );
          callback(null, {
            status: true,
            msg: "OTP has been sent to your mobile number",
          });
        } catch (smsError) {
          console.error("Error sending SMS:", smsError);
          callback({
            status: false,
            msg: "Failed to send OTP via SMS",
            error: smsError.message,
          });
        }
      }
    }
  );
};

const generateSessionToken = async () => {
  const prefix = "1003"; // Prefix number
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // Last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month in two digits
  const date = currentDate.getDate().toString().padStart(2, "0"); // Date in two digits

  // Retrieve the last session token from the database (example implementation)
  const lastSessionToken = await fetchLastSessionTokenFromDatabase();
  let lastSixDigits = "000001"; // Default value for new year, month, or date
  if (lastSessionToken) {
    const lastYear = lastSessionToken.slice(4, 6);
    const lastMonth = lastSessionToken.slice(6, 8);
    const lastDate = lastSessionToken.slice(8, 10);

    if (lastYear === year && lastMonth === month && lastDate === date) {
      const lastIncrement = parseInt(lastSessionToken.slice(-6));
      const incrementedDigits = (lastIncrement + 1).toString().padStart(6, "0");
      lastSixDigits = incrementedDigits;
    }
  }

  const sessionToken = prefix + year + month + date + lastSixDigits;
  return sessionToken;
};

const fetchLastSessionTokenFromDatabase = () => {
  return new Promise((resolve, reject) => {
    client.query(
      "SELECT session_token FROM ccc_user_sessions ORDER BY session_token DESC LIMIT 1;",
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          const sessionToken = results.rows[0]?.session_token || null;
          resolve(sessionToken);
        }
      }
    );
  });
};

const insertSessionToken = async ({
  res,
  user_id,
  latitude,
  longitude,
  userResult,
}) => {
  // Used by -> login, registerAdvancedConfirmOtp, loginWithMobileNumberConfirmOtp
  try {
    const session_token = await generateSessionToken();
    const login_datetime = new Date();

    await client.query(
      "INSERT INTO ccc_user_sessions (user_id , login_location_latitude, login_location_longitude, login_datetime, auto_logout, session_token) VALUES ($1, $2, $3, $4 ,false, $5)",
      [user_id, latitude, longitude, login_datetime, session_token]
    );

    res.send({
      logged: true,
      status: "Success",
      session_token,
      results: userResult,
    });
  } catch (err2) {
    console.error(err2);
    res.send({
      logged: false,
      error: "An error occurred while inserting the session token",
    });
  }
};

const login = async (req, res) => {
  console.log("Login Controller");
  const formData = req.body.formData;
  const username = formData.username;
  const password = formData.password;
  const latitude = req.body.loginLatitude;
  const longitude = req.body.loginLongitude;
  const language = req.body.language;
  client.query(
    "SELECT * FROM ccc_user_masterfile WHERE username = $1 OR mobile_number = $2",
    [username, username],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        if (results.rows.length > 0) {
          brcypt.compare(
            password,
            results.rows[0].password,
            async (err, isMatch) => {
              if (err) {
              } else {
                const user_id = results.rows[0].user_id;
                const mobile_verified = results.rows[0].mobile_verified;
                const langInDb = results.rows[0].language;

                if (language && langInDb != language) {
                  updateLanguageByUserId(user_id, language, (result) => {});
                }

                if (!mobile_verified) {
                  res.send({
                    logged: false,
                    error:
                      "Mobile number is not verified, please verify to login",
                  });
                }
                if (isMatch) {
                  await insertSessionToken({
                    res: res,
                    user_id: user_id,
                    latitude: latitude,
                    longitude: longitude,
                    userResult: results,
                  });
                } else {
                  res.send({
                    logged: false,
                    error: "Invalid password",
                  });
                }
              }
            }
          );
        } else {
          res.send({ logged: false, error: "No user found" });
        }
      }
    }
  );
};

const loginWithMobileNumber = async (req, res) => {
  console.log("Login Controller");
  const { mobileNumber, language } = req.body;
  const lastNineDigits = mobileNumber.slice(-9);

  console.log("req.body", req.body);
  client.query(
    // "SELECT * FROM ccc_user_masterfile WHERE mobile_number = $1",
    "SELECT * FROM ccc_user_masterfile WHERE RIGHT(mobile_number, 9) = $1",
    [lastNineDigits],
    async (err, results) => {
      if (err) {
        console.error(err);
      } else {
        if (results.rows.length > 0) {
          const langInDb = results.rows[0].language;
          const user_id = results.rows[0].user_id;
          // 1. Check if the mobile_verified field ois True
          if (results.rows[0].mobile_verified === true) {
            // 1. Generate new mobile otp
            const mobile_otp = generateRandomNumberOfNDigits({
              n: 6,
              startsWith: 6,
            }); // NOTE -> mobile OTP starts with '6'
            console.log(mobile_otp);
            // 3. Send the otp to the user
            await sendSingleSmsHutch(
              results.rows[0].mobile_number.slice(-9),
              `Your OTP for login is ${mobile_otp}`
            );

            if (language && langInDb != language) {
              updateLanguageByUserId(user_id, language, (result) => {});
            }

            // "UPDATE ccc_user_masterfile SET mobile_otp = $1 WHERE RIGHT(mobile_number, 9) = $2",
            client.query(
              "UPDATE ccc_user_masterfile SET mobile_otp = $1, language = $2 WHERE RIGHT(mobile_number, 9) = $3",
              [mobile_otp, language, lastNineDigits],
              async (err, updatedResult) => {
                if (err) {
                  res.send({
                    status: false,
                    msg: "Failed to send OTP - System Error",
                    error: err.message,
                  });
                } else {
                  res.send({
                    status: true,
                    msg: "OTP has been sent to your mobile number",
                  });
                }
              }
            );
          } else {
            // Case when mobile number is not verified
            generateAndUpdateMobileOtpInDb(
              client,
              mobileNumber,
              (err, result) => {
                if (err) {
                  res.send({
                    status: false,
                    msg: "Failed to send OTP - System Error",
                    error: err.message,
                  });
                } else {
                  res.send({
                    status: true,
                    msg: "OTP has been sent to your mobile number",
                  });
                }
              }
            );
          }
        } else {
          // Case when mobile number is not found in the system at all - Follow the registraion process
          createNewUserWithMobileNumber(
            res,
            client,
            mobileNumber,
            language,
            (err, result) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    }
  );
};

const loginWithMobileNumberConfirmOtp = async (req, res) => {
  console.log("req.body", req.body);
  const { mobileNumber, otp, latitude, longitude } = req.body;
  const mobileOtpFromUser = parseInt(otp, 10);
  const lastNineDigits = mobileNumber.slice(-9);
  client.query(
    "SELECT * FROM ccc_user_masterfile WHERE RIGHT(mobile_number, 9) = $1",
    // "SELECT * FROM ccc_user_masterfile WHERE mobile_number = $1",
    [lastNineDigits],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          success: false,
          msg: "Error querying database",
          error: err.message,
        });
      } else {
        if (results.rowCount > 0) {
          row = results.rows[0];
          // results.rows.forEach(row => {
          if (
            row.mobile_otp === mobileOtpFromUser &&
            row.mobile_number.slice(-9) === lastNineDigits
          ) {
            if (!row.mobile_verified) {
              updateMobileVerified(client, row.user_id, true, () => {});
            }
            if (!row.user_group) {
              updateUserGroup(client, row.user_id, 8, () => {});
            }

            if (!row.user_role) {
              updateUserRole(client, row.user_id, 5, () => {});
            }

            await insertSessionToken({
              res: res,
              user_id: row.user_id,
              latitude: latitude,
              longitude: longitude,
              userResult: results,
            });
          } else {
            res.send({
              success: false,
              msg: "Invalid OTP",
              error: "Invalid OTP",
            });
          }
          // });
        } else {
          return res.status(500).send({
            success: false,
            msg: "No user registered with this mobile number",
            error: "No user registered with this mobile number",
          });
        }
      }
    }
  );
};

const logout = async (req, res) => {
  const session_token = req.body.sessiontoken;
  const logout_datetime = new Date();
  const latitude = req.body.logoutLatitude;
  const longitude = req.body.logoutLongitude;
  console.log(session_token);
  console.log(req.body);
  client.query(
    "UPDATE ccc_user_sessions SET logout_datetime = $1 , logout_location_latitude = $2 , logout_location_longitude=$3 WHERE session_token = $4",
    [logout_datetime, latitude, longitude, session_token],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ logged: false });
      }
    }
  );
};

const register = async (req, res) => {
  console.log("req.body", req.body);

  const formData = req.body.formData;
  const username = formData.username;
  const password = formData.password;
  const group_id = formData.group_id;
  const role_id = formData.role_id;
  // const newUserId = req.body.NewUserId
  const hashed_password = await brcypt.hash(password, 10);

  client.query(
    "SELECT user_id FROM ccc_user_masterfile ORDER BY user_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          success: false,
          msg: "Error querying database for user ID",
          error: err.message,
        });
      } else {
        let newUserId = 1001000000000001; // Default to 1001000000000001 if no users exist
        if (results.rowCount > 0) {
          newUserId = parseInt(results.rows[0].user_id, 10) + 1;
        }
        client.query(
          "SELECT * FROM ccc_user_masterfile WHERE username = $1",
          [username],
          (err, results) => {
            if (err) {
              console.error(err);
            } else {
              if (results.rowCount > 0) {
                res.send({
                  success: false,
                  msg: "User with the same username exists",
                  error: "User with the same username exists",
                });
              } else {
                client.query(
                  "INSERT INTO ccc_user_masterfile (user_id, username, password, user_group, user_role) VALUES ($1, $2, $3, $4, $5)",
                  [newUserId, username, hashed_password, group_id, role_id],
                  (err2, results2) => {
                    if (err2) {
                      console.error(err2);
                      return res.status(500).send({
                        success: false,
                        msg: "Error creating user",
                        error: err2.message,
                      });
                    } else {
                      res.send({
                        success: true,
                        msg: "User Created Successfully",
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};

const registerAdvanced = async (req, res) => {
  console.log("@ registerAdvanced func", req.body);

  const formData = req.body.formData;
  const password = formData.password;
  const mobileNumber = formData.mobileNumber;
  const hashed_password = await brcypt.hash(password, 10);
  // const nicNumber = formData.nic;
  // const email = formData.email;

  const mobile_otp = generateRandomNumberOfNDigits({ n: 6, startsWith: 6 }); // NOTE -> mobile OTP starts with '6'
  // const email_otp = generateRandomNumberOfNDigits({n: 6, startsWith: 5}); // NOTE -> email OTP start with '5'
  // return;

  client.query(
    "SELECT user_id FROM ccc_user_masterfile ORDER BY user_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          success: false,
          msg: "Error querying database for user ID",
          error: err.message,
        });
      } else {
        let newUserId = 1001000000000001; // Default to 1001000000000001 if no users exist
        if (results.rowCount > 0) {
          newUserId = parseInt(results.rows[0].user_id, 10) + 1;
        }

        client.query(
          "SELECT mobile_number FROM ccc_user_masterfile WHERE mobile_number = $1",
          [mobileNumber],
          (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).send({
                success: false,
                msg: "Error querying database",
                error: err.message,
              });
            } else {
              let mobileNumberExists = false;

              if (results.rowCount > 0) {
                results.rows.forEach((row) => {
                  if (row.mobile_number === mobileNumber) {
                    mobileNumberExists = true;
                  }
                });
              }

              if (mobileNumberExists) {
                let errorMsg = "Already in use: ";
                if (mobileNumberExists) {
                  errorMsg += "mobile number ";
                }
                console.log(errorMsg);
                return res.send({
                  success: false,
                  msg: errorMsg.trim(),
                  error: errorMsg.trim(),
                });
              } else {
                client.query(
                  "INSERT INTO ccc_user_masterfile (user_id, username, password, mobile_number, mobile_otp, mobile_verified) VALUES ($1, $2, $3, $4, $5, $6)",
                  [
                    newUserId,
                    mobileNumber,
                    hashed_password,
                    mobileNumber,
                    mobile_otp,
                    false,
                  ],
                  (err2, results2) => {
                    if (err2) {
                      console.error(err2);
                      return res.status(500).send({
                        success: false,
                        msg: "Error creating user",
                        error: err2.message,
                      });
                    } else {
                      // if (language && langInDb != language){
                      //   updateLanguageByUserId(user_id, language, (result) => {});
                      // }
                      return res.send({
                        success: true,
                        msg: "User Created Successfully",
                      });
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  );
};

const registerAdvancedConfirmOtp = async (req, res) => {
  console.log("req.body", req.body);
  const mobileNumber = req.body.mobileNumber;
  const mobileOtpFromUser = parseInt(req.body.otp, 10);
  const latitude = req.body.loginLatitude;
  const longitude = req.body.loginLongitude;

  client.query(
    "SELECT * FROM ccc_user_masterfile WHERE mobile_number = $1",
    [mobileNumber],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          success: false,
          msg: "Error querying database",
          error: err.message,
        });
      } else {
        if (results.rowCount > 0) {
          results.rows.forEach((row) => {
            if (
              row.mobile_otp === mobileOtpFromUser &&
              row.mobile_number === mobileNumber
            ) {
              // update the mobile_verified field to True
              client.query(
                "UPDATE ccc_user_masterfile SET mobile_verified = $1 WHERE user_id = $2",
                [true, row.user_id],
                async (err, updatedResult) => {
                  if (err) {
                    return res.status(500).send({
                      success: false,
                      msg: "Mobile number verification failed",
                      error: err.message,
                    });
                  } else {
                    await insertSessionToken({
                      res: res,
                      user_id: row.user_id,
                      latitude: latitude,
                      longitude: longitude,
                      userResult: results,
                    });
                  }
                }
              );
            } else {
              res.send({
                success: false,
                msg: "Invalid OTP",
                error: "Invalid OTP",
              });
            }
          });
        } else {
          return res.status(500).send({
            success: false,
            msg: "No user registered with this mobile number",
            error: "No user registered with this mobile number",
          });
        }
      }
    }
  );
};

const retrieveLastWorkstationRecord = (req, res) => {
  client.query(
    "SELECT * FROM ccc_workstation_master ORDER BY ccc_workstation_master_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const createWorkstation = async (req, res) => {
  const workstationName = req.body.workstationName;
  const idToSend = req.body.idToSend;
  client.query(
    "INSERT INTO ccc_workstation_master(workstation_id,workstation_name) VALUES($1,$2)  ",
    [idToSend, workstationName],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ success: true, msg: "Work Station Created Successfully" });
      }
    }
  );
};

const createRole = async (req, res) => {
  const { role_name, group_id } = req.body.formData;

  if (!role_name || !group_id) {
    res.send({ success: false, error: "Missing attribute" });
  } else {
    client.query(
      "INSERT INTO ccc_user_role(user_role_name, group_id) VALUES($1, $2)  ",
      [role_name, group_id],
      (err, results) => {
        if (err) {
          console.error(err);
        } else {
          res.send({ success: true, msg: "Role Created Successfully" });
        }
      }
    );
  }
};

const createGroup = async (req, res) => {
  const { group_name } = req.body.formData;
  client.query(
    "INSERT INTO ccc_user_group(user_group_name) VALUES($1)  ",
    [group_name],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send({ success: true, msg: "Group Created Successfully" });
      }
    }
  );
};

const getRoles = (req, res) => {
  client.query("SELECT * FROM ccc_user_role", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const getGroups = (req, res) => {
  client.query("SELECT * FROM ccc_user_group", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};
const getWorkstations = (req, res) => {
  client.query("SELECT * FROM ccc_workstation_master", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const updateUserGroupByUserId = (req, res) => {
  try {
    const { user_group_id, user_id } = req.body;
    console.log("Group " + user_group_id, "User(s) " + user_id);
    let i = 0;
    while (i < user_id.length) {
      let current_user_id = user_id[i];
      // console.log(
      //   current_user_id + " " + " user updated To Group " + user_group_id
      // );
      client.query(
        "UPDATE ccc_user_masterfile SET user_group = $1 WHERE user_id = $2",
        [user_group_id, current_user_id],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
          }
        }
      );
      i++;
    }
    res.send({ msg: "Success" });
  } catch (error) {
    console.error(error);
  }
};

const updateUserGroupByUserIdToNull = (req, res) => {
  const { user_id } = req.body;
  let i = 0;
  while (i < user_id.length) {
    let current_user_id = user_id[i];
    client.query(
      "UPDATE ccc_user_masterfile SET user_group = NULL WHERE user_id = $1",
      [current_user_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.rowCount);
        }
      }
    );
    i++;
  }
  res.send({ msg: "Success" });
};

const updateUserRoleByUserId = (req, res) => {
  try {
    const { user_role_id, user_id } = req.body;
    console.log("Role " + user_role_id, "User(s) " + user_id);
    let i = 0;
    while (i < user_id.length) {
      let current_user_id = user_id[i];
      // console.log(
      //   current_user_id + " " + " user updated To Role " + user_role_id
      // );
      client.query(
        "UPDATE ccc_user_masterfile SET user_role = $1 WHERE user_id = $2",
        [user_role_id, current_user_id],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(results.rowCount);
          }
        }
      );
      i++;
    }
    res.send({ msg: "Success" });
  } catch (error) {
    console.error(error);
  }
};

const updateUserRoleByUserIdToNull = (req, res) => {
  const { user_id } = req.body;
  let i = 0;
  while (i < user_id.length) {
    let current_user_id = user_id[i];
    client.query(
      "UPDATE ccc_user_masterfile SET user_role = NULL WHERE user_id = $1",
      [current_user_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.rowCount);
        }
      }
    );
    i++;
  }
  res.send({ msg: "Success" });
};

const getUsers = (req, res) => {
  client.query("SELECT * FROM ccc_user_masterfile", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results);
    }
  });
};

const getNonUsersByRoles = (req, res) => {
  const role_id = req.body.role_id;
  client.query(
    "SELECT * FROM ccc_user_masterfile where user_role  != $1",
    [role_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const getUsersByRoles = (req, res) => {
  const role_id = req.body.role_id;
  client.query(
    "SELECT * FROM ccc_user_masterfile where user_role = $1",
    [role_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const getCurrentWorkstationUsers = (req, res) => {
  const workstation_id = req.body.workstation_id;
  client.query(
    "SELECT * FROM ccc_workstation_user where workstation_id = $1",
    [workstation_id],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

const updatePoliceStationByWorkStationId = (req, res) => {
  try {
    const { police_station_id, workstation_id } = req.body;
    console.log(
      "Police Station " + police_station_id,
      "User(s) " + workstation_id
    );
    let i = 0;
    while (i < workstation_id.length) {
      let current_user_id = workstation_id[i];
      // console.log(
      //   current_user_id + " " + " user updated To Role " + user_role_id
      // );
      client.query(
        "UPDATE ccc_workstation_master SET police_station_id = $1 WHERE workstation_id = $2",
        [police_station_id, current_user_id],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(results.rowCount);
          }
        }
      );
      i++;
    }
    res.send({ msg: "Success" });
  } catch (error) {
    console.error(error);
  }
};

const updatePoliceStationByWorkstationIdToNull = (req, res) => {
  const workstation_id = req.body.workstation_id;
  console.log(workstation_id);
  let i = 0;
  while (i < workstation_id.length) {
    let current_user_id = workstation_id[i];
    client.query(
      "UPDATE ccc_workstation_master SET police_station_id = NULL WHERE workstation_id = $1",
      [current_user_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results.rowCount);
        }
      }
    );
    i++;
  }
  res.send({ msg: "Success" });
};

const insertWorkStationUserByUserAndWorkStationId = (req, res) => {
  try {
    const { workstations, user_id } = req.body;
    let i = 0;
    while (i < workstations.length) {
      let current_work_station_id = workstations[i];
      client.query(
        "SELECT * FROM ccc_workstation_user WHERE user_id = $1 AND workstation_id = $2",
        [user_id, current_work_station_id],
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            if (results.rowCount == 0) {
              client.query(
                "INSERT INTO ccc_workstation_user (user_id,workstation_id) VALUES($1,$2)",
                [user_id, current_work_station_id],
                (err2, results2) => {
                  if (err2) {
                    console.log(err2);
                  }
                }
              );
            }
          }
        }
      );
      i++;
    }
    res.send({ msg: "Success" });
  } catch (error) {
    console.error(error);
  }
};

const updateWorkStationUserByUserAndWorkStationIdToNull = (req, res) => {
  const workstation_id = req.body.workstations;
  const user_id = req.body.user_id;
  let i = 0;
  while (i < workstation_id.length) {
    let current_workstation_id = workstation_id[i];
    client.query(
      "UPDATE ccc_workstation_user SET user_id = NULL WHERE workstation_id = $1 AND user_id = $2",
      [current_workstation_id, user_id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
    i++;
  }
  res.send({ msg: "Success" });
};

const getWorkstationsByUserId = (req, res) => {
  const user_id = req.body.user_id;
  client.query(
    "SELECT * FROM ccc_workstation_user WHERE user_id = $1",
    [user_id],
    (err, results) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
};

const retrieveLastUserRecord = (req, res) => {
  client.query(
    "SELECT * FROM ccc_user_masterfile ORDER BY user_id DESC LIMIT 1",
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = {
  login,
  register,
  registerAdvanced,
  getRoles,
  getUsers,
  getUsersByRoles,
  updateUserRoleByUserId,
  getNonUsersByRoles,
  updateUserRoleByUserIdToNull,
  getGroups,
  updateUserGroupByUserId,
  updateUserGroupByUserIdToNull,
  createWorkstation,
  createGroup,
  createRole,
  retrieveLastWorkstationRecord,
  logout,
  getWorkstations,
  getCurrentWorkstationUsers,
  updatePoliceStationByWorkStationId,
  updatePoliceStationByWorkstationIdToNull,
  getWorkstationsByUserId,
  insertWorkStationUserByUserAndWorkStationId,
  updateWorkStationUserByUserAndWorkStationIdToNull,
  retrieveLastUserRecord,
  registerAdvancedConfirmOtp,
  loginWithMobileNumber,
  loginWithMobileNumberConfirmOtp,
  getNUsersByCreatedAtDateController,
  searchUsersController,
};
