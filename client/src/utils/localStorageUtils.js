// localStorageUtils.js
export const setSessionData = ({
  session_token,
  user_id,
  username,
  nic_number,
  selectedLanguage,
  mobileNumber,
}) => {
  localStorage.setItem("session_token", session_token);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("user_name", username);
  localStorage.setItem("nic_number", nic_number);
  localStorage.setItem("selectedLanguage", selectedLanguage);
  localStorage.setItem("mobileNumber", mobileNumber);
};

export const isLoggedIn = () => {
  const session_token = localStorage.getItem("session_token");
  return session_token !== null && session_token !== undefined;
};

// Get session data from localStorage
export const getSessionData = () => {
  const session_token = localStorage.getItem("session_token");
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("user_name");
  const nic_number = localStorage.getItem("nic_number");
  const selectedLanguage = localStorage.getItem("selectedLanguage");
  const mobileNumber = localStorage.getItem("mobileNumber");

  return {
    session_token,
    user_id,
    username,
    nic_number,
    selectedLanguage,
    mobileNumber,
  };
};
