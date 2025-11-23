const hnbPaymentService = require("../../services/hnb-payment/service");

const createSignatureController = async (req, res) => {
  try {
    const formData = req.body;
    const signature = await hnbPaymentService.createSignatureService(formData);
    res.json({
      signature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create hnb payment signature" });
  }
};

const notifyPaymentInfoController = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await hnbPaymentService.notifyPaymentInfoService(reqBody);
    res.json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "HNB notify payment info failed" });
  }
};

module.exports = {
  createSignatureController,
  notifyPaymentInfoController,
};
