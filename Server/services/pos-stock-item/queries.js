const dbDukeClient = require("../../config/dbDuke");
const setUpAssociations = require("../../models/pos");
const { Op } = require("sequelize");

/**
 * Function to search for StockItemHeader records based on a single search term.
 * The search term is used to find matches in both item_code and item_name.
 * @param {string} searchTerm - The search term to search in item_code and item_name.
 * @returns {Promise<Array>} - A promise that resolves to an array of matching StockItemHeader records.
 */
const searchStockItemHeadersInTheCompanyQuery = async (searchTerm) => {
  try {
    const db_name = "pos_database_duke";
    const { StockItemHeader } = setUpAssociations(db_name);

    const results = await StockItemHeader.findAll({
      where: {
        [Op.or]: [
          { item_code: { [Op.iLike]: `%${searchTerm}%` } },
          { item_name: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    console.log("Search Results:", results);
    return results;
  } catch (error) {
    console.error("Error searching StockItemHeader:", error);
    throw error;
  }
};

module.exports = {
  searchStockItemHeadersInTheCompanyQuery,
};
