const posPoDetailsServices = require("../../services/po-screen/service");

const getSupplierController = async (req, res) => {
  const { poNumber } = req.params;

  try {
    const result = await posPoDetailsServices.getPoSupplierService(poNumber);
    res.status(200).send({ success: true, data: result.rows });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch supplier", message: error.message });
  }
};

const createPoDetailsController = async (req, res) => {
  try {
    const {
      po_number, // ✅ Matches frontend
      userId: customer_id, // 🔧 Match frontend `userId` to backend `customer_id`
      name: po_user, // 🔧 Match frontend `name` to backend `po_user`
      name: received_by_name, // 🔧 Match frontend `name` to backend `received_by_name`
      nic: received_by_nic, // 🔧 Match frontend `nic` to backend `received_by_nic`
      received_by_signature, // ✅ (Add this in frontend if needed)
      grand_total, // ✅ You can calculate this
      created_at, // ✅ Handle in frontend or auto-generate
      updated_at, // ✅ Handle in frontend or auto-generate
      supplierId: supplier_id, // ✅ Add in frontend if needed
      data, // ✅ Matches frontend `data` array
    } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: "PO details data is required" });
    }

    const newPoDetails = await posPoDetailsServices.createPoDetailsServices({
      po_number,
      customer_id,
      po_user,
      received_by_name,
      received_by_nic,
      received_by_signature,
      grand_total,
      created_at,
      updated_at,
      supplier_id,
      data,
    });

    res.status(201).send({ success: true, data: newPoDetails });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create PO details",
      message: error.message || "Something went wrong",
    });
  }
};

const searchPOcontroller = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const data = await posPoDetailsServices.searchPONumberBynumber(searchTerm);

    res
      .status(200)
      .send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search ponumber", message: error.message });
  }
};

//search po by po_number or date
const searchPoDetByPoNumberORDate = async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const results =
      await posPoDetailsServices.searchPoDetailsByPonumberORDate(searchTerm);
    res.status(200).send({
      success: true,
      data: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search PO", message: error.message });
  }
};

module.exports = {
  createPoDetailsController,
  searchPOcontroller,
  getSupplierController,
  searchPoDetByPoNumberORDate,
};
