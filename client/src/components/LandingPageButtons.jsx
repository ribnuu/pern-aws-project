import React from "react";
import PropTypes from "prop-types";

const LandingPageButtons = ({ arrayList, navigate }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
      {arrayList.map((data) => {
        const route = data.page_url;
        return (
          <button
            onClick={() =>
              navigate(route, { state: { pageId: data.pages_id } })
            }
            key={data.pages_id}
            className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
          >
            {data.component_name}
          </button>
        );
      })}
    </div>
  );
};

// PropTypes validation for the component
LandingPageButtons.propTypes = {
  arrayList: PropTypes.arrayOf(
    PropTypes.shape({
      pages_id: PropTypes.string.isRequired,
      page_url: PropTypes.string.isRequired,
      component_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default LandingPageButtons;
