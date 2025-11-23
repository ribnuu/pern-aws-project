"use strict";

/*
 * Merchant configuration properties are taken from Configuration module
 */

// common parameters
const AuthenticationType = "http_signature";
const RunEnvironment = "apitest.cybersource.com";
const MerchantId = "ectfsandbox";

// http_signature parameters
const MerchantKeyId = "b92674b7-21df-4967-b45e-b43c1b336602";
const MerchantSecretKey =
  "84eb41437f054b67ae35ee3db01b1a9b745d9f5960bc42009d2d7a6b9ab953ed3dd438a825f149a2860f27a5445c482098da0e6c49a14667b4d51ea76a61ecdde59e6407d15b41aa87a4714c7cce2252e15a4d6d51604efeb9f3ccda976b5d584867e3c1860f40208c00786abc0060162c57de0413e1418d88f2df24a405d170";

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
