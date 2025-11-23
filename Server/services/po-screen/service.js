const poDetailsQueries = require("./query");

const getPoSupplierService = async (poNumber) => {
  try {
    const result = await poDetailsQueries.getPoSupplierQuery(poNumber);
    return result;
  } catch (error) {
    throw new Error(error.message || "Service failed to fetch supplier");
  }
};

const createPoDetailsServices = async (poData) => {
  try {
    const poHeader = await poDetailsQueries.createPoHeaderQuery(poData);

    const poDetails = await Promise.all(
      poData.data.map(async (item) => {
        const poDetail = await poDetailsQueries.createPoDetailsQuery({
          id: item.id,
          po_number: poData.po_number,
          item_code: item.itemCode,
          item_qty: item.quantity,
          mrp: item.mrp,
          cost_total: item.cost_total,
        });
        return poDetail;
      })
    );

    return { poHeader, poDetails };
  } catch (error) {
    console.error("Service Error:", error.message);
    throw new Error(error.message || "Service failed to create PO details");
  }
};

const searchPONumberBynumber = async (searchTerm) => {
  try {
    const results = await poDetailsQueries.searchPONumberQuery(searchTerm);
    return results;
  } catch (error) {
    throw new Error("Failed to fetch po number");
  }
};

//search po deatils by po_number or date
const searchPoDetailsByPonumberORDate = async (searchTerm) => {
  try {
    const resuls = await poDetailsQueries.searchPONumberBynumberOrDateQuery({
      searchTerm,
    });
    return resuls;
  } catch (error) {
    throw new Error("Failed to fetch po ");
  }
};

module.exports = {
  createPoDetailsServices,
  searchPONumberBynumber,
  getPoSupplierService,
  searchPoDetailsByPonumberORDate,
};
