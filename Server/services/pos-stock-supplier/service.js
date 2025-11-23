const posStockSupplierQueries = require("./queries");
const searchSupplierByIdOrName = async (searchTerm) => {
  try {
    const results =
      await posStockSupplierQueries.searchStockSupplierQuery(searchTerm);

    return results;
  } catch (error) {
    throw new Error(`Failed to fetch items by name or id ${error}`);
  }
};

const createSupplierService = async ({ supplierName, createdBy }) => {
  try {
    const results = await posStockSupplierQueries.createSupplierQuery({
      supplierName,
      createdBy,
    });
    return results.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchSupplierByIdOrName,
  createSupplierService,
};
