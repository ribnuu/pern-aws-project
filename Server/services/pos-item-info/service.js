const posItemInfoQueries = require("./queries");

const createItemInformationServerce = async ({
  item_det_id,
  item_code,
  item_name,
  item_category,
  item_sub_category,
  supplier,
  created_by,
  mrp,
  cost,
  maintain_stock,
  maintain_batch,
}) => {
  try {
    //create new record for stock_item_header table
    const newItemHeader = await posItemInfoQueries.createItemInfoQuery({
      item_code,
      item_name,
      item_category,
      item_sub_category,
      supplier,
      created_by,
      maintain_stock,
      maintain_batch,
    });

    //insert new record into stock_item_detail
    const newItemDetails = await posItemInfoQueries.createItemDetail({
      item_det_id,
      item_code,
      created_at: new Date(),
      mrp,
      cost,
      created_by,
    });
    return { newItemDetails, newItemHeader };
  } catch (error) {
    throw error;
  }
};

//search item by item_name or item_code Service
const searchItemsService = async (searchTerm) => {
  try {
    const result = await posItemInfoQueries.getItemsQueries(searchTerm);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch items");
  }
};

module.exports = {
  createItemInformationServerce,
  searchItemsService,
};
