const authServices = require("../../services/auth/service");

const loginWithMobileNumberController = async (req, res) => {
  try {
    console.log("Login Controller");
    const reqBody = req.body;
    const data = await authServices.loginWithMobileNumberService(reqBody);
    res.send({ success: true, ...data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to login with mobile number",
    });
  }
};

module.exports = {
  loginWithMobileNumberController,
};
