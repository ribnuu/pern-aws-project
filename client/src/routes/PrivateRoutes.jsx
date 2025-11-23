import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // Check local storage for user_id and other auth data
  const isAuthenticated = Boolean(
    localStorage.getItem("user_id") &&
      localStorage.getItem("user_name") &&
      localStorage.getItem("session_token")
  );

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
