import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getButtonsByPageAndUserIdApi } from "../apis/RightsApiService";
import {
  hideAppLoading,
  showAppLoading,
} from "../store/app-loading/AppLoadingSlice";

const useFetchButtonsLandingPage = (pageId) => {
  const [buttons, setButtons] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showAppLoading());
        const user_id = localStorage.getItem("user_id");
        if (user_id && pageId) {
          const response = await getButtonsByPageAndUserIdApi(user_id, pageId);
          if (response?.success) {
            setButtons(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching buttons:", error);
      } finally {
        dispatch(hideAppLoading());
      }
    };

    fetchData();
  }, [pageId, dispatch]);

  return buttons;
};

export default useFetchButtonsLandingPage;
