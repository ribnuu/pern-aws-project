import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getButtonsByPageAndUserIdApi } from "../../apis/RightsApiService";
import { useDispatch } from "react-redux";
import {
  hideAppLoading,
  showAppLoading,
} from "../../store/app-loading/AppLoadingSlice";

const HomeButtonPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pageId = location.state?.pageId;

  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showAppLoading());
        const user_id = localStorage.getItem("user_id");
        if (user_id && pageId) {
          const response = await getButtonsByPageAndUserIdApi(user_id, pageId);
          if (response && response.success) {
            setButtons(response.data);
          }
        }
      } catch (error) {
        throw error;
      } finally {
        dispatch(hideAppLoading());
      }
    };
    fetchData();
  }, [pageId]);

  return (
    <section className="mx-5 pb-10">
      {buttons.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
          {buttons.map((data, index) => {
            const route = data.button_routes;

            // Combine fields to ensure a unique key
            const uniqueKey = `${data.ccc_master_buttons_id}-${index}`; // Append index as fallback

            return (
              <button
                onClick={() =>
                  navigate(route, {
                    state: {
                      pageId: data.component_pages_id,
                      buttonId: data.ccc_master_buttons_id,
                    },
                  })
                }
                key={uniqueKey} // Use the combined key
              >
                <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
                  {data.button_display_name}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default HomeButtonPage;
