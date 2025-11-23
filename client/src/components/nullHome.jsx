import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetNavigationState } from "../store/navigation/NavigationSlice";
import { getLandingPageButtonsByUserId } from "../apis/RightsApiService";
import {
  hideAppLoading,
  showAppLoading,
} from "../store/app-loading/AppLoadingSlice";

const NullHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const component_id = "1004000000000006";
  const [HomeMenuQuery] = useOutletContext();
  const [arrayList, setArrayList] = useState([]);
  const redirectUrl = useSelector(
    (state) => state.navigationReducer.redirectUrl
  );
  const [landingPageButtons, setLandingPageButtons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLandingPageButtonsByUSerId = useCallback(async (user_id) => {
    try {
      dispatch(showAppLoading());
      setIsLoading(true);
      const buttonByUserIdResponse = await getLandingPageButtonsByUserId(
        user_id
      );
      if (buttonByUserIdResponse.data.length > 0) {
        setLandingPageButtons(buttonByUserIdResponse.data);
        setArrayList(buttonByUserIdResponse.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      dispatch(hideAppLoading());
    }
  }, []);

  const handleHomeSearch = useCallback(
    (query) => {
      const searchQuery = query.toUpperCase();
      if (searchQuery.length > 0) {
        const filteredList = landingPageButtons.filter((item) =>
          item.button_display_name.toUpperCase().includes(searchQuery)
        );
        setArrayList(filteredList);
      } else {
        setArrayList(landingPageButtons);
      }
    },
    [landingPageButtons]
  );

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      fetchLandingPageButtonsByUSerId(user_id);
    }
  }, [fetchLandingPageButtonsByUSerId, component_id]);

  useEffect(() => {
    handleHomeSearch(HomeMenuQuery);
  }, [HomeMenuQuery, handleHomeSearch]);

  useEffect(() => {
    if (redirectUrl) {
      dispatch(ResetNavigationState());
      navigate(redirectUrl);
    }
  }, [redirectUrl, dispatch, navigate]);

  return (
    <section className="mx-5 pb-10">
      {arrayList.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
          {arrayList.map((data) => {
            const route = data.page_url;
            return (
              <button
                onClick={() =>
                  navigate(route, { state: { pageId: data.pages_id } })
                }
                key={data.pages_id}
              >
                <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
                  {data.component_name}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default NullHome;
