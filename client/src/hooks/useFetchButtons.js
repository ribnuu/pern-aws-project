import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getButtonsByUserAndButtonIdApi } from "../apis/RightsApiService";
import { SetAppRightsSliceField } from "../store/app-rights/AppRightsSlice";
import {
  hideAppLoading,
  showAppLoading,
} from "../store/app-loading/AppLoadingSlice";

const useFetchButtons = (buttonId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showAppLoading());
        const user_id = localStorage.getItem("user_id");
        if (user_id && buttonId) {
          const response = await getButtonsByUserAndButtonIdApi(
            user_id,
            buttonId
          );
          if (response && response.success) {
            dispatch(
              SetAppRightsSliceField({
                field: "buttonsObj",
                value: response.data,
              })
            );

            if (response.data && Object.keys(response.data).length > 0) {
              const buttonFuncNamesArray = [];
              Object.keys(response.data).forEach((item) => {
                const obj = response.data[item];
                buttonFuncNamesArray.push(obj.button_function_name);
              });
              if (buttonFuncNamesArray.length > 0) {
                dispatch(
                  SetAppRightsSliceField({
                    field: "buttonFunctionNamesList",
                    value: buttonFuncNamesArray,
                  })
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching buttons:", error); // Better to log errors for debugging
      } finally {
        dispatch(hideAppLoading());
      }
    };

    fetchData();
  }, [buttonId, dispatch]); // Add dispatch to the dependency array

  // Optionally return anything useful, like status or data
};

export default useFetchButtons;
