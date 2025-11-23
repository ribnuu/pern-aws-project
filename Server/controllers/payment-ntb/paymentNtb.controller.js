const { default: axios } = require("axios");

const initiateCheckoutController = async (req, res) => {
  // const merchantId = process.env.MERCHANT_ID; // Store your merchant ID securely
  // const password = process.env.MERCHANT_PASSWORD; // Store your password securely

  const merchantId = "TEST9170360184";
  const password = "023f67f9fc14e1f01edc413976f86117";

  const authString = `merchant.${merchantId}:${password}`;
  const base64Auth = Buffer.from(authString).toString("base64");

  const data = {
    apiOperation: "INITIATE_CHECKOUT",
    interaction: {
      operation: "AUTHORIZE",
      merchant: {
        name: "Your Merchant Name", // Replace with your merchant name
      },
    },
    order: {
      currency: "LKR",
      amount: "100.00",
      id: "order_124", // Replace with your order ID
      description: "Test Order",
    },
  };

  try {
    const response = await axios.post(
      `https://nationstrustbankplc.gateway.mastercard.com/api/rest/version/72/merchant/${merchantId}/session`,
      data,
      {
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Basic ${base64Auth}`,
        },
      }
    );

    // Extract the session.id and successIndicator from the response
    const sessionId = response.data.session.id;
    const successIndicator = response.data.successIndicator;

    // Send session ID and success indicator to the frontend
    res.json({ sessionId, successIndicator });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to initiate checkout" });
  }
};

module.exports = {
  initiateCheckoutController,
};
