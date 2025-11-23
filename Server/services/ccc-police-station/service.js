const policeStationQueries = require("./queries");

const searchPoliceStationService = async (filters) => {
  try {
    const { searchTerm, loadOnMount } = filters;
    // Convert loadOnMount string to boolean
    const isLoadOnMount = loadOnMount === "true";

    const response = await policeStationQueries.searchPoliceStationQuery({
      searchTerm: searchTerm,
      loadOnMount: isLoadOnMount,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const assignPoliceOfficerToPoliceStationService = async (
  reqBody,
  createdBy
) => {
  try {
    const { policeOfficerUserId, policeStationId } = reqBody;
    const response =
      await policeStationQueries.assignPoliceOfficerToPoliceStationQuery({
        policeOfficerId: policeOfficerUserId,
        policeStationId: policeStationId,
        createdBy: createdBy,
      });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchPoliceStationService,
  assignPoliceOfficerToPoliceStationService,
};
