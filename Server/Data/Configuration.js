"use strict";

/*
 * Merchant configuration properties are taken from Configuration module
 */

// common parameters
const AuthenticationType = "http_signature";
const RunEnvironment = "apitest.cybersource.com";
const MerchantId = "ectfsandbox";

// http_signature parameters
const MerchantKeyId = "ectfsandbox";
const MerchantSecretKey = "2f784ca5853c362e85acf93578a78a2b";

// jwt parameters
const KeysDirectory = "Resource";
const KeyFileName = "ectfsandbox";
const KeyAlias = "ectfsandbox";
const KeyPass = "ectfsandbox";

//meta key parameters
const UseMetaKey = false;
const PortfolioID = "";

// logging parameters
const EnableLog = true;
const LogFileName = "cybs";
const LogDirectory = "log";
const LogfileMaxSize = "5242880"; //10 MB In Bytes
const EnableMasking = true;

/*
PEM Key file path for decoding JWE Response Enter the folder path where the .pem file is located.
It is optional property, require adding only during JWE decryption.
*/
const PemFileDirectory = "Resource/NetworkTokenCert.pem";

// Constructor for Configuration
function Configuration() {
  var configObj = {
    authenticationType: AuthenticationType,
    runEnvironment: RunEnvironment,
    merchantID: MerchantId,
    merchantKeyId: MerchantKeyId,
    merchantsecretKey: MerchantSecretKey,
    keyAlias: KeyAlias,
    keyPass: KeyPass,
    keyFileName: KeyFileName,
    keysDirectory: KeysDirectory,
    useMetaKey: UseMetaKey,
    portfolioID: PortfolioID,
    pemFileDirectory: PemFileDirectory,
    logConfiguration: {
      enableLog: EnableLog,
      logFileName: LogFileName,
      logDirectory: LogDirectory,
      logFileMaxSize: LogfileMaxSize,
      loggingLevel: "debug",
      enableMasking: EnableMasking,
    },
  };
  return configObj;
}

module.exports = Configuration;
