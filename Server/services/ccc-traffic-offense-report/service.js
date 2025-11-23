const cccTrafficOffenseReportQueries = require("./queries");

const getLicenseInHandService = async (reqBody) => {
  try {
    const { userId, fromDate, toDate } = reqBody;
    const data = await cccTrafficOffenseReportQueries.getLicenseInHandQuery({
      policeOfficerId: userId,
      fromDate,
      toDate,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLicenseInHandService,
};
