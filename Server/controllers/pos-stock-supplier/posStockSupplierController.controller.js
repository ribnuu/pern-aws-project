const posStockSupplierService = require("../../services/pos-stock-supplier/service");

const posStockSupplierController = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const data =
      await posStockSupplierService.searchSupplierByIdOrName(searchTerm);

    res
      .status(200)
      .send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search supplier", message: error.message });
  }
};

const posStockCeateSupplierController = async (req, res) => {
  const { supplierName, createdBy } = req.body;

  if (!supplierName || !createdBy) {
    return res
      .status(400)
      .json({ error: "supplierName and createdBy are required" });
  }

  try {
    const response = await posStockSupplierService.createSupplierService({
      supplierName,
      createdBy,
    });
    res.send({ success: true, data: response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create supplier", message: error.message });
    console.error("Failed to create supplier:", error);
  }
};

module.exports = {
  posStockSupplierController,
  posStockCeateSupplierController,
};
