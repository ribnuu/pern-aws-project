const posGrnDetailsQueries = require("./quires");

const createGrnDetailsServices = async ({
  data,
  grn_number,
  customer_id,
  bill_number,
  grn_user,
  received_by_name,
  received_by_nic,
  received_by_signature,
  grand_total,
  supplier_id,
}) => {
  try {
    // Create the new GRN header entry (once)
    const grnHeader = await posGrnDetailsQueries.createGrnHeaderQuery({
      grn_number,
      customer_id,
      bill_number,
      grn_user,
      received_by_name,
      received_by_nic,
      received_by_signature,
      grand_total,
      supplier_id,
    });

    // Iterate through each item in the data array
    const newGrnDetails = await Promise.all(
      data.map(async (item) => {
        // Check for existing GRN and Item code
        const existingBatch = await posGrnDetailsQueries.getHighestBatchCode({
          grn_number: item.grn_number,
          item_code: item.item_code,
        });

        // Determine new batch code
        const newBatchCode = existingBatch
          ? String(parseInt(existingBatch.batch_code) + 1).padStart(4, "0")
          : "001";

        // Create the new GRN details entry
        const grnDetail = await posGrnDetailsQueries.createGrnDetailsQuery({
          data: [{ ...item, batch_code: newBatchCode }],
        });

        return grnDetail;
      })
    );

    return { grnHeader, newGrnDetails };
  } catch (error) {
    console.error("Service Error:", error);
    throw new Error(
      typeof error === "string"
        ? error
        : error.message || "Service failed to create GRN details"
    );
  }
};

//servise for serach & fetch GRN byGRN Number or date
const getGRNByNumberServices = async (searchTerm) => {
  try {
    const results = await posGrnDetailsQueries.getGRNByNumberQuery({
      searchTerm,
    });

    return results;
  } catch (error) {
    console.log("Service Error:", error);
    throw new Error(
      typeof error === "string"
        ? error
        : error.message || "Service failed to create GRN details"
    );
  }
};

module.exports = {
  createGrnDetailsServices,
  getGRNByNumberServices,
};
