// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const axios = require("axios");
const client = require("../config/db");

// Function to authenticate with Hutch SMS API
const authenticateHutchSMSAPI = async () => {
  const apiUrl = process.env.HUTCH_SMS_PROVIDER_AUTH_URL;
  const username = process.env.HUTCH_SMS_PROVIDER_USER_NAME;
  const password = process.env.HUTCH_SMS_PROVIDER_PASSWORD;

  // Prepare data for API request
  const data = {
    username: username,
    password: password,
  };

  // Retrieve token data for Hutch provider from the database
  const tokenDataFromDb = await getDataForProviderFromDb("HUTCH");
  console.log(tokenDataFromDb);
  let newAccessToken = null;
  newAccessToken = await generateAccessTokenFromRefreshTokenForHutch(
    tokenDataFromDb[0].refresh_token
  );
  try {
    if (newAccessToken === "Unauthorized" || tokenDataFromDb.length <= 0) {
      // If no token data exists for Hutch provider in the database
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "X-API-VERSION": "v1",
        },
      });
      const { accessToken, refreshToken } = response.data;

      try {
        await upsertTokenData(accessToken, refreshToken, "HUTCH");
        // res.status(200).json({ message: 'Authentication of Hutch SMS Service Successful' });
        return accessToken;
      } catch (error) {
        console.error("Error making POST request:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
        // res.status(500).json({ error: 'Failed to Authenticate Hutch SMS Service' });
        return null;
      }
    } else {
      // If token data for Hutch provider already exists in the database
      try {
        await upsertTokenData(
          newAccessToken,
          tokenDataFromDb[0].refresh_token,
          "HUTCH"
        );
        // res.status(200).json({ message: 'Authentication of Hutch SMS Service Successful' });
        return newAccessToken;
      } catch (error) {
        console.error("Error making POST request:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
        // res.status(500).json({ error: 'Failed to Authenticate Hutch SMS Service' });
        return null;
      }
    }
  } catch (error) {
    // res.status(500).json({ error: error });
    return null;
  }
};

// Function to generate access token from refresh token for Hutch provider
const generateAccessTokenFromRefreshTokenForHutch = async (refreshToken) => {
  const renewTokenUrl = process.env.HUTCH_SMS_PROVIDER_SEND_RENEW_TOKEN_URL;
  try {
    const response = await axios.get(renewTokenUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-API-VERSION": "v1",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    if (error.response.data.error === "Unauthorized") {
      return "Unauthorized";
    }
    console.error("Error making POST request:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    return null;
  }
};

// Function to insert or update token data for a provider
const upsertTokenData = async (accessToken, refreshToken, providerName) => {
  const query = `
        INSERT INTO public.sms_provider_tokens (access_token, refresh_token, provider_name)
        VALUES ($1, $2, $3)
        ON CONFLICT (provider_name) DO UPDATE
        SET access_token = $1, refresh_token = $2
        RETURNING *;
    `;

  try {
    const { rows } = await client.query(query, [
      accessToken,
      refreshToken,
      providerName,
    ]);
    if (rows.length > 0) {
      console.log("Record updated for provider:", providerName);
    } else {
      console.log("Inserted new record for provider:", providerName);
    }
    console.log("Record:", rows[0]);
  } catch (error) {
    console.error("Error upserting data:", error.message);
  }
};

// Function to retrieve token data for a provider from the database
const getDataForProviderFromDb = async (providerName) => {
  const query = `
        SELECT * FROM public.sms_provider_tokens
        WHERE provider_name = $1;
    `;

  try {
    const { rows } = await client.query(query, [providerName]);
    console.log("Data for provider", providerName, ":", rows);
    return rows; // Return the retrieved data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return []; // Return an empty array if there's an error
  }
};

// Function to retrieve token data for a provider from the database
const getAccessTokenForHutchFromDB = async () => {
  const query = `
        SELECT access_token FROM public.sms_provider_tokens
        WHERE provider_name = $1;
    `;

  try {
    const { rows } = await client.query(query, ["HUTCH"]);
    return rows[0].access_token; // Return the retrieved data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null; // Return an empty array if there's an error
  }
};

// Function to generate access token from refresh token for Hutch provider
const sendSingleSmsHutch = async (mobileNumber, message) => {
  console.log(message);
  const token = await getAccessTokenForHutchFromDB();
  if (!token) {
    // When token is unavailable
    try {
      const newToken = await authenticateHutchSMSAPI();
      await executeSendSms(mobileNumber, message, newToken);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await executeSendSms(mobileNumber, message, token);
    } catch (error) {
      console.log("Error at here");
      console.log(error);
    }
  }
};

async function executeSendSms(mobileNumber, message, token) {
  mobileNumber = mobileNumber.slice(-9);
  const sendSmsUrl = process.env.HUTCH_SMS_PROVIDER_SEND_SMS_URL;
  try {
    const response = await axios.post(
      sendSmsUrl,
      {
        campaignName: "Eforce",
        mask: "Elite Cyber",
        numbers: `${mobileNumber}`,
        content: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "X-API-VERSION": "v1",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    // Retry sending the message after requesting a new token
    const newToken = await authenticateHutchSMSAPI();
    const response = await axios.post(
      sendSmsUrl,
      {
        campaignName: "Eforce",
        mask: "Elite Cyber",
        numbers: `${mobileNumber}`,
        content: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "X-API-VERSION": "v1",
          Authorization: `Bearer ${newToken}`,
        },
      }
    );
    return response;
    // return null;
  }
}

module.exports = {
  sendSingleSmsHutch,
};
