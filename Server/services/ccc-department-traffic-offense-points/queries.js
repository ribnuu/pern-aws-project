const setUpAssociationsCCC = require("../../models/ccc");

const getTrafficOffensePointsByOffenseAndTrafficOffensePointsIdQuery = async ({
  offenseId,
  trafficOffensePointsId,
  attributes = ["id"],
}) => {
  try {
    const { DepartmentTrafficOffensePoints } = setUpAssociationsCCC();

    // Check that both parameters are provided
    if (!offenseId || !trafficOffensePointsId) {
      throw new Error(
        "Both offenseId and trafficOffensePointsId must be provided."
      );
    }

    // Fetch the relevant point from the database using both conditions
    const response = await DepartmentTrafficOffensePoints.findOne({
      where: {
        offense_id: offenseId, // Match offense_id
        id: trafficOffensePointsId, // Match traffic offense points ID
      },
      attributes: attributes,
    });

    return response; // Return the result, or null if not found
  } catch (error) {
    throw error; // Rethrow error for further handling
  }
};

module.exports = {
  getTrafficOffensePointsByOffenseAndTrafficOffensePointsIdQuery,
};
