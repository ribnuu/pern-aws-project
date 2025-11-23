import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBreadcrumbs } from "../../utils/getBreadcrumbs";
import { setBreadcrumbs } from "../../store/app-breadcrumb-slice/AppBreadCrumbSlice";

const Breadcrumbs = () => {
  const breadcrumbs = useSelector(
    (state) => state.appBreadCrumbReducer.breadcrumbs
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Update the breadcrumbs whenever the route changes
    const breadcrumbData = getBreadcrumbs(location.pathname); // Modify to return { label, path }
    dispatch(setBreadcrumbs(breadcrumbData)); // Store breadcrumbs in Redux
  }, [location, dispatch]);

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path); // Navigate to the breadcrumb's path
    }
  };

  return (
    <div className=" bg-gray-200">
      <nav
        className="text-sm text-gray-700 uppercase ml-4"
        style={{ fontSize: "10px" }}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={index}>
            {index > 0 && " > "}
            <span
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
              onClick={() => handleBreadcrumbClick(breadcrumb.path)} // Pass the path to the click handler
            >
              {breadcrumb.label}
            </span>
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
