const cccPoliceStationServices = require("../../services/ccc-police-station/service");

const searchPoliceStationController = async (req, res) => {
  try {
    const filters = req.query;
    const stations =
      await cccPoliceStationServices.searchPoliceStationService(filters);
    res.send({ success: true, data: stations });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search police station",
    });
  }
};

const assignPoliceOfficerToPoliceStationController = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdBy = req.headers.user_id;

    const data =
      await cccPoliceStationServices.assignPoliceOfficerToPoliceStationService(
        reqBody,
        createdBy
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to assign police officer to police station",
    });
  }
};

module.exports = {
  searchPoliceStationController,
  assignPoliceOfficerToPoliceStationController,
};
