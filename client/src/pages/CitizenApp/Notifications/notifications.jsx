import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetReferenceNumber } from "../../../store/pay-traffic-fine-usng-reference/PayTrafficFineUsingReference";
import { markNotificationAsRead } from "../../../store/notifications/NotificationsSlice";

const notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notificationsReducer.notifications
  );
  const data = [
    {
      id: "1",
      img: "../../assets/notification-icon/alert.png",
      source: "Disaster Alert",
      message: "Tsunami Alert",
    },
    {
      id: "2",
      img: "facebook.png",
      source: "License Renewal",
      message: "License Renewal ready to collect",
    },
    {
      id: "3",
      img: "copies.png",
      source: "Birth Certificate Copies",
      message: "Birth Certificate Ready",
    },
  ];
  return (
    // <section className='mx-12 my-12'>
    <>
      <div className="mx-5 grid grid-cols-1 gap-2">
        {notifications.map((item) => {
          return (
            <>
              <button
                onClick={(e) => {
                  console.log(item.id);
                  console.log(item.id);
                  e.preventDefault();
                  dispatch(markNotificationAsRead(item.id));
                  dispatch(SetReferenceNumber(item.related_id));
                  navigate("/cgp/tfn", {
                    state: { refNoFromNavigate: item.related_id },
                  });
                }}
              >
                <div className="bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 text-left">
                  <>
                    <div>{item.title}</div>
                    <div className="text-sm">{item.message}</div>
                  </>
                </div>
              </button>
            </>
          );
        })}
        {data.map((data) => {
          return (
            <button>
              <div className="bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 text-left">
                <>
                  <div>{data.source}</div>
                  <div className="text-sm">{data.message}</div>
                </>
              </div>
            </button>
            // <div className='flex bg-white px-4 py-2 rounded-lg text-black justify-items-center'  key={data.id}>
            //     <div className='grid grid-cols-12 gap-4 bg-gray-300 rounded-lg w-full justify-items-start  '>
            //         <img src={alert} className='w-4 h-auto mx-auto my-auto col-span-1'/>
            //         <div className='flex flex-col col-span-11 my-2'>
            //             <div className='text-xl'>
            //                 {
            //                     data.source
            //                 }
            //             </div>
            //             <div className='text-xs'>
            //                 {
            //                     data.message
            //                 }
            //             </div>

            //         </div>
            //     </div>
            // </div>
          );
        })}
      </div>
    </>
    // </section>
  );
};

export default notifications;
