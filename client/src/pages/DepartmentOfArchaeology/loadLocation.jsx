import React from "react";

const loadLocation = () => {
  const data = [
    {
      locationName: "Sigiriya",
      longitude: "7°57'14.99 N",
      latitude: "80°45'20.99 E",
      local_police_station: "Dambulla Police Station",
      local_stf_camp: "Dambull Stf Camp",
    },
    {
      locationName: "Bandiyamulla Tombstone",
      longitude: `7°05'07.1"N`,
      latitude: `80°00'32.3"E`,
      local_police_station: "Gampaha Police Station",
      local_stf_camp: "Gampaha Stf Camp",
    },
    {
      locationName: "Aradhana Gala",
      longitude: `8° 21′ 2.14″ N`,
      latitude: `80° 31′ 1″ E`,
      local_police_station: "Mihintale Police Station",
      local_stf_camp: "Mihintale Stf Camp",
    },
    {
      locationName: "Maninaga Mandiraya Monastery",
      longitude: `8°21'14.3"N`,
      latitude: `80°30'51.0"E`,
      local_police_station: "Mihintale Police Station",
      local_stf_camp: "Mihintale Stf Camp",
    },
    {
      locationName: "Rajagiri Kanda of Mihintale",
      longitude: `8°21'03.2"N`,
      latitude: `80°30'49.2"E1`,
      local_police_station: "Mihintale Police Station",
      local_stf_camp: "Mihintale Stf Camp",
    },
  ];
  return (
    <section className="mx-12 my-12">
      <div className="grid grid-cols-1 gap-2">
        {data.map((data) => {
          return (
            <div className="bg-white text-black p-2 rounded-xl flex flex-col">
              <div>{data.locationName}</div>
              <div>{data.latitude}</div>
              <div>{data.longitude}</div>
              <div>{data.local_police_station}</div>
              <div>{data.local_stf_camp}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default loadLocation;
