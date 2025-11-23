// security.js
import CryptoJS from "crypto-js";

const SECRET_KEY =
  "0a519aa1b62f428d8117aec77488aaad84dedcfe96954d998c9c6458f8951934446cfa9235be4a9f97313fb05572bd9113184958590d44259e045830a26d3856ebf807f73e11499088fc2bdb71b874fb2cf6579a0d134299a731c8591f15316adb3d1e0af6764f21b1a946b9b9bfb06168ea2d4bc1254af69135b4ad830c74ff";

export const sign = (params) => {
  return signData(buildDataToSign(params), SECRET_KEY);
};

const signData = (data, secretKey) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(data, secretKey));
};

const buildDataToSign = (params) => {
  const signedFieldNames = params["signed_field_names"].split(",");
  const dataToSign = signedFieldNames.map(
    (field) => `${field}=${params[field]}`
  );
  return commaSeparate(dataToSign);
};

const commaSeparate = (dataToSign) => {
  return dataToSign.join(",");
};
