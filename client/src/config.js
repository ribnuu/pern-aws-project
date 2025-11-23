// config.js
export const getServerPort = async () => {
  try {
    const response = await fetch("/config.json");
    const config = await response.json();
    return config.serverPort;
  } catch (error) {
    console.error("Error fetching config:", error);
    throw error;
  }
};
