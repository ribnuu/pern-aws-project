const departmenDriverOffenseMasterQueries = require("./departmenDriverOffenseMasterQueries");

const getTrafficOffenseMasterById = async (offenseId) => {
  try {
    const user =
      await departmenDriverOffenseMasterQueries.getTrafficOffenseMasterByIdQuery(
        offenseId
      );
    return user;
  } catch (error) {
    console.error("Error fetching user by mobile number", error);
    throw error;
  }
};

module.exports = {
  getTrafficOffenseMasterById,
};
