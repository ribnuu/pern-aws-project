const {
  generateItemCode,
} = require("../../helpers/pos/generateItemCodeNumber");
const posItemInforServices = require("../../services/pos-item-info/service");

const createItemInformationController = async (req, res) => {
  const {
    item_det_id,
    item_name,
    item_category,
    item_sub_category,
    supplier,
    mrp,
    cost,
    created_by,
    maintain_stock,
    maintain_batch,
  } = req.body;

  try {
    const item_code = await generateItemCode();
    if (!item_code || item_code.length !== 8) {
      return res
        .status(500)
        .json({ error: "Failed to generate a valid item code:", item_code });
    }

    const newItemInfo =
      await posItemInforServices.createItemInformationServerce({
        item_det_id,
        item_code,
        item_name,
        item_category,
        item_sub_category,
        supplier,
        mrp,
        cost,
        created_by,
        maintain_stock,
        maintain_batch,
      });
    res.status(201).send({ success: true, data: newItemInfo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "faild to create item information:", message: error });
  }
};

// search Item by user
const SearchItemController = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const data = await posItemInforServices.searchItemsService(searchTerm);

    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch items", message: error.message });
  }
};

module.exports = {
  createItemInformationController,
  SearchItemController,
};
