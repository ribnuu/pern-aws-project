const posGrnDetailsServices = require("../../services/pos-grn/service");

const createGrnDetailsController = async (req, res) => {
  try {
    const {
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
    } = req.body;

    const newGrnDetails = await posGrnDetailsServices.createGrnDetailsServices({
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
    });

    res.send({ success: true, data: newGrnDetails });
  } catch (error) {
    console.error("Failed to create GRN details:", error);
    res.status(500).json({
      error: "Failed to create GRN details",
      message: error.message || "Something went wrong",
    });
  }
};

//Serach GEN by GRN number or Date controller
const getGrnByNumberController = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    const results =
      await posGrnDetailsServices.getGRNByNumberServices(searchTerm);

    res.send({ success: true, data: results });
  } catch (error) {
    res.status(500).json({
      error: "Faild to fetch GRN ",
      message: error.message || "Somthing went wrong",
    });
  }
};

module.exports = {
  createGrnDetailsController,
  getGrnByNumberController,
};
