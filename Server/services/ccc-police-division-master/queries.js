const { Op } = require("sequelize");
const setUpAssociationsCCC = require("../../models/ccc");

const searchPoliceDivisionQuery = async (searchTerm) => {
  try {
    const { PoliceDivisionMaster } = setUpAssociationsCCC();

    const policeDivisions = await PoliceDivisionMaster.findAll({
      where: {
        name: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive search
        },
      },
    });

    return policeDivisions;
  } catch (error) {
    console.error("Error searching police division:", error);
    throw error;
  }
};

module.exports = {
  searchPoliceDivisionQuery,
};
