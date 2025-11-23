import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonGrid = ({ buttons, basePath }) => {
  const navigate = useNavigate();

  if (!buttons?.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
      {buttons.map((data) => (
        <button
          onClick={() =>
            navigate(`${basePath}${data.button_routes}`, {
              state: {
                pageId: data.component_pages_id,
                buttonId: data.ccc_master_buttons_id,
              },
            })
          }
          key={data.component_pages_id}
        >
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
            {data.button_display_name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
