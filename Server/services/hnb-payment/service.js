require("dotenv").config();
const crypto = require("crypto");
const hnbPaymentQueries = require("./queries");
const {
  sendTrafficFinePaymentSuccessfulMesssageWithConfirmationCode,
} = require("../../helpers/ccc/trafficFineHelpers");

const HNB_PAYMENT_GATEWAY_SECRET_KEY =
  process.env.HNB_PAYMENT_GATEWAY_SECRET_KEY;

// Function to sign data
const sign = (params) => {
  return signData(buildDataToSign(params), HNB_PAYMENT_GATEWAY_SECRET_KEY);
};

// Function to generate HMAC SHA256 signature
const signData = (data, secretKey) => {
  return crypto.createHmac("sha256", secretKey).update(data).digest("base64");
};

// Function to build data string to be signed
const buildDataToSign = (params) => {
  const signedFieldNames = params["signed_field_names"].split(",");
  const dataToSign = signedFieldNames.map(
    (field) => `${field}=${params[field]}`
  );
  return commaSeparate(dataToSign);
};

// Function to join data fields with commas
const commaSeparate = (dataToSign) => {
  return dataToSign.join(",");
};

// Service to create signature
const createSignatureService = async (formData) => {
  try {
    const signature = sign(formData);
    return signature;
  } catch (error) {
    console.log("Error creating HNB payment signature", error);
    throw error;
  }
};

// Service to verify received signature
const notifyPaymentInfoService = async (reqBody) => {
  try {
    // Extract the signature and signed_field_names from the request
    const receivedSignature = reqBody.signature;
    const signedFieldNames = reqBody.signed_field_names.split(",");

    // Build the data string based on the received fields
    const dataToSign = signedFieldNames
      .map((field) => `${field}=${reqBody[field]}`)
      .join(",");

    // Recreate the signature using the same method
    const recreatedSignature = signData(
      dataToSign,
      HNB_PAYMENT_GATEWAY_SECRET_KEY
    );

    // Compare the received signature with the recreated signature
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(recreatedSignature),
      Buffer.from(receivedSignature)
    );

    console.log(reqBody);

    if (
      reqBody?.reason_code &&
      reqBody.reason_code === "100" &&
      reqBody?.decision &&
      reqBody.decision === "ACCEPT" &&
      reqBody?.req_transaction_uuid?.toString().startsWith("TFN")
    ) {
      await sendTrafficFinePaymentSuccessfulMesssageWithConfirmationCode({
        trafficOffenseReferenceNumber: reqBody.req_reference_number,
      });
    } else {
      console.error("Payment failed");
    }

    await hnbPaymentQueries.notifyPaymentInfoQuery(reqBody);
    if (isSignatureValid) {
      console.log("Signature is valid");
      return { success: true, message: "Signature is valid" };
    } else {
      console.log("Signature is invalid");
      return { success: false, message: "Signature is invalid" };
    }
  } catch (error) {
    console.log("Error verifying payment signature", error);
    throw error;
  }
};

module.exports = {
  createSignatureService,
  notifyPaymentInfoService,
};
