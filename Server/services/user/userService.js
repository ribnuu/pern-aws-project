const userQueries = require("./userQueries");

const getUserbyMobileNumber = async (mobileNumber) => {
  try {
    const user = await userQueries.getUserbyMobileNumberQuery(mobileNumber);
    return user;
  } catch (error) {
    console.error("Error fetching user by mobile number", error);
    throw error;
  }
};

const getUserNameByUserId = async (userId) => {
  try {
    const user = await userQueries.getUserNameByUserIdQuery(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user by mobile number", error);
    throw error;
  }
};

const getNUsersByCreatedAtDateService = async (count) => {
  try {
    const users = await userQueries.getNUsersByCreatedAtDateQuery(count);
    return users;
  } catch (error) {
    console.error("Error fetching n usrs by created at date", error);
    throw error;
  }
};

const searchUsersService = async (searchString) => {
  try {
    const users = await userQueries.searchUsersQuery(searchString);
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserbyMobileNumber,
  getUserNameByUserId,
  getNUsersByCreatedAtDateService,
  searchUsersService,
};
