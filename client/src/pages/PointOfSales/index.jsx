// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getButtonsByPageAndUserIdApi } from "../../apis/RightsApiService";
// import { useDispatch } from "react-redux";
// import {
//   hideAppLoading,
//   showAppLoading,
// } from "../../store/app-loading/AppLoadingSlice";

// const PointOfSales = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // Access current location state using useLocation hook from react-router-dom
//   const location = useLocation();
//   const pageId = location.state?.pageId;

//   // State to manage the selected button for navigation
//   const [selectedButton, setSelectedButton] = useState(null);
//   const [buttons, setButtons] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(showAppLoading());
//         const user_id = localStorage.getItem("user_id");
//         if (user_id && pageId) {
//           const response = await getButtonsByPageAndUserIdApi(user_id, pageId);
//           if (response && response.success) {
//             setButtons(response.data);
//           }
//         }
//       } catch (error) {
//         throw error;
//       } finally {
//         dispatch(hideAppLoading());
//       }
//     };
//     fetchData();
//   }, [pageId]);

//   return (
//     <section className="mx-5 pb-10">
//       {buttons.length > 0 && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
//           {buttons.map((data) => {
//             // const route = data.button_routes;
//             const route = `${location.pathname}${data.button_routes}`;
//             return (
//               <button
//                 onClick={() =>
//                   navigate(route, {
//                     state: {
//                       pageId: data.component_pages_id,
//                       buttonId: data.ccc_master_buttons_id,
//                     },
//                   })
//                 }
//                 key={data.component_pages_id}
//               >
//                 <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase">
//                   {data.button_display_name}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// };

// export default PointOfSales;

import React from "react";
import { useLocation } from "react-router-dom";
import ButtonGrid from "../../components/ButtonGrid/ButtonGrid";
import useFetchButtonsLandingPage from "../../hooks/useFetchButtonsLandingPage";

const PointOfSales = () => {
  const location = useLocation();
  const pageId = location.state?.pageId;

  const buttons = useFetchButtonsLandingPage(pageId);

  return (
    <section className="mx-5 pb-10">
      <ButtonGrid buttons={buttons} basePath={location.pathname} />
    </section>
  );
};

export default PointOfSales;
