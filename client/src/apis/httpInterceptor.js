import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { BASE_URL } from "./endpoints";

const navigateToLogin = () => {
  localStorage.clear();
  secureLocalStorage.clear();
  const navigate = window.location.reload();
  navigate("/login");
};

const API_ENDPOINT = axios.create({
  baseURL: BASE_URL,
});

API_ENDPOINT.interceptors.request.use(async (config) => {
  const storedUserData = secureLocalStorage.getItem("user");
  const userId = localStorage.getItem("user_id");

  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const token =
    parsedUserData && parsedUserData.access_token
      ? parsedUserData.access_token
      : null;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (userId) {
    config.headers["user_id"] = userId;
  }
  return config;
});

API_ENDPOINT.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      console.log("Token epired. Dispatching an event or performing logout");

      //   Disable this feature for auth login requests
      if (!originalRequest.url.includes("api/auth/login")) {
        navigateToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default API_ENDPOINT;
