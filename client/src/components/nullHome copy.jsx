import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetNavigationState } from "../store/navigation/NavigationSlice";
import { getUserButtonsRightsByUserIdAndComponentsIdApi } from "../apis/RightsApiService";

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

  const fetchButtonsByUserId = useCallback(async (user_id, component_id) => {
    const buttonByUserIdResponse =
      await getUserButtonsRightsByUserIdAndComponentsIdApi({
        user_id,
        component_id,
      });

    if (buttonByUserIdResponse.length > 0) {
      setLandingPageButtons(buttonByUserIdResponse);
      setArrayList(buttonByUserIdResponse);
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
      fetchButtonsByUserId(user_id, component_id);
    }
  }, [fetchButtonsByUserId, component_id]);

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
            const route =
              data.button_routes ||
              data.button_display_name.toLowerCase().substring(0, 3);
            return (
              <button
                onClick={() => navigate(route)}
                key={data.ccc_master_button_id}
              >
                <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
                  {data.button_display_name}
                </div>
              </button>
            );
          })}
          {/* <button onClick={() => navigate("/pmt")}>
            <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
              MAKE PAYMENT
            </div>
          </button> */}
        </div>
      )}
    </section>
  );
};

export default NullHome;
