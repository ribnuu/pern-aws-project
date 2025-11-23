// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ResetAppFilters,
//   HandleChangeAppFilters,
// } from "../store/app-filters/AppFiltersSlice";

// /**
//  * Custom hook to manage application filters.
//  *
//  * @param {Object} options - Options for the hook.
//  * @param {string} options.filterType - The type of filter being used.
//  * @returns {Object} - An object containing methods to update filters.
//  */
// const useAppFilters = ({ filterType, defaultFilters }) => {
//   const dispatch = useDispatch();

//   // Get the current filter type from the Redux store
//   const existingFilterType = useSelector(
//     (state) => state.appFiltersReducer.filterType
//   );

//   // // Resets filters if the filter type changes
//   // useEffect(() => {
//   //   if (filterType !== existingFilterType) {
//   //     console.log(
//   //       "Resetting the App Filters to the new filter type:",
//   //       filterType
//   //     );
//   //     dispatch(ResetAppFilters());
//   //     // Set default filters if they are provided
//   //     if (defaultFilters) {
//   //       updateFilter("batchUpdate", defaultFilters);

//   //       // Object.entries(defaultFilters).forEach(([key, value]) => {
//   //       //   dispatch(
//   //       //     HandleChangeAppFilters({
//   //       //       key,
//   //       //       value,
//   //       //     })
//   //       //   );
//   //       // });
//   //     }
//   //   }
//   // }, [filterType, existingFilterType, defaultFilters, dispatch]);

//   useEffect(() => {
//     // Ensure filters reset only when the filterType changes
//     if (filterType && filterType !== existingFilterType) {
//       console.log("Resetting filters to new filter type:", filterType);
//       dispatch(ResetAppFilters());

//       // Only set default filters if available
//       if (defaultFilters) {
//         updateFilter("batchUpdate", defaultFilters);
//       }
//     }
//   }, [filterType, existingFilterType, defaultFilters, dispatch]);

//   /**
//    * Updates the filter value based on the key.
//    * Handles both single updates and batch updates.
//    *
//    * @param {string} key - The key of the filter to update.
//    * @param {any} value - The new value for the filter.
//    */
//   const updateFilter = (key, value) => {
//     dispatch(
//       HandleChangeAppFilters({
//         key,
//         value,
//       })
//     );
//   };

//   return {
//     updateFilter,
//   };
// };

// export default useAppFilters;

// /*
// Example Usage:

// const { updateFilter } = useAppFilters({ filterType: "TrafficOffense" });

// // For single updates:
// updateFilter("username", "johnDoe");

// // For batch updates:
// updateFilter("batchUpdate", {
//   username: "johnDoe",
//   role: "admin",
// });
// */

// import { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ResetAppFilters,
//   HandleChangeAppFilters,
// } from "../store/app-filters/AppFiltersSlice";

// const useAppFilters = ({ filterType, defaultFilters }) => {
//   const dispatch = useDispatch();

//   // Get the current filter type from the Redux store
//   const existingFilterType = useSelector(
//     (state) => state.appFiltersReducer.filterType
//   );

//   // Reset filters if the filter type changes
//   // useEffect(() => {
//   //   if (filterType !== existingFilterType) {
//   //     console.log(
//   //       "Resetting the App Filters to the new filter type:",
//   //       filterType
//   //     );
//   //     dispatch(ResetAppFilters());

//   //     // Set default filters if they are provided
//   //     if (defaultFilters) {
//   //       updateFilter("batchUpdate", defaultFilters);
//   //     }
//   //   }
//   // }, [filterType, existingFilterType, defaultFilters, dispatch]);

//   useEffect(() => {
//     if (filterType !== existingFilterType) {
//       console.log(
//         "Resetting the App Filters to the new filter type:",
//         filterType
//       );
//       dispatch(ResetAppFilters());

//       // Set default filters if they are provided and not equal to current filters
//       if (defaultFilters) {
//         updateFilter("batchUpdate", defaultFilters);
//       }
//     }
//   }, [filterType, existingFilterType, dispatch, defaultFilters]);

//   /**
//    * Memoized function to update the filter value based on the key.
//    * Handles both single updates and batch updates.
//    */
//   const updateFilter = useCallback(
//     (key, value) => {
//       dispatch(
//         HandleChangeAppFilters({
//           key,
//           value,
//         })
//       );
//     },
//     [dispatch]
//   ); // Dependency only on dispatch

//   return {
//     updateFilter,
//   };
// };

// export default useAppFilters;

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetAppFilters,
  HandleChangeAppFilters,
} from "../store/app-filters/AppFiltersSlice";

const useAppFilters = ({ filterType, defaultFilters }) => {
  const dispatch = useDispatch();

  // Get the current filter type from the Redux store
  const existingFilterType = useSelector(
    (state) => state.appFiltersReducer.filterType
  );

  /**
   * Memoized function to update the filter value based on the key.
   * Handles both single updates and batch updates.
   */
  const updateFilter = useCallback(
    (key, value) => {
      dispatch(
        HandleChangeAppFilters({
          key,
          value,
        })
      );
    },
    [dispatch]
  );

  // Reset filters if the filter type changes
  useEffect(() => {
    if (filterType !== existingFilterType) {
      console.log(
        "Resetting the App Filters to the new filter type:",
        filterType
      );
      dispatch(ResetAppFilters());

      // Set default filters if they are provided
      if (defaultFilters) {
        updateFilter("batchUpdate", defaultFilters);
      }
    }
  }, [filterType, existingFilterType, dispatch, updateFilter, defaultFilters]);

  return {
    updateFilter,
  };
};

export default useAppFilters;
