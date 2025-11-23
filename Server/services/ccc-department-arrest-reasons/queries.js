const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const searchDepartmentArrestReasonsQuery = async (searchTerm) => {
  try {
    const { DepartmentArrestReasons } = setUpAssociationsCCC();

    const data = await DepartmentArrestReasons.findAll({
      where: {
        reason_description: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error searching department arrest reasons:", error);
    throw error;
  }
};

module.exports = {
  searchDepartmentArrestReasonsQuery,
};
