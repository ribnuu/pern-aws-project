import React from "react";

const policeNotificationSystem = () => {
  const data = [
    {
      id: "1",
      img: "../../assets/notification-icon/alert.png",
      source: "Number Plate Mismatch",
      message: "Numbler Plate mismatch detected ",
      count: "1",
    },
    {
      id: "2",
      img: "facebook.png",
      source: "Abnormal Crowd Detection",
      message: "Anormal Crowd Detection at Galle Face",
      count: "3",
    },
    {
      id: "3",
      img: "copies.png",
      source: "Police Emergency Handler",
      message: "Birth Certificate Ready",
      count: "8",
    },
  ];
  return (
    <section className="mx-12 my-12">
      <div className="grid grid-cols-1 gap-4">
        {data.map((data) => {
          return (
            <div
              className="flex bg-white px-4 py-2 rounded-md  border border-black text-black justify-items-center"
              key={data.id}
            >
              <div className="grid grid-cols-12 gap-4 bg-gray-300 rounded-md  border border-black w-full justify-items-start  ">
                <img
                  src={alert}
                  className="w-4 h-auto mx-auto my-auto col-span-1"
                />
                <div className="flex flex-col col-span-11 my-2">
                  <div className="text-xl">{data.source}</div>
                  <div className="text-xs">{data.count} Notifications</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default policeNotificationSystem;
