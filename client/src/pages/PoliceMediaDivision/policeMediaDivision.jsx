import React from "react";

const policeMediaDivision = () => {
  const data = [
    {
      headlines: "Protest",
      date: "28-03-2022",
      description: "Protest happening at the moment near Galle Face",
      body: "Road Blocks established at every corner",
    },
    {
      headlines: "Curfew in Western Province",
      date: "30-05-2023",
      description: "Police actively acting on this curfew",
      body: "Public are not allowed to roam around the city when a curfew is ongoing. They are adviced to remain indoors or immediately evacuate to their houses",
    },
  ];
  return (
    <section className="mx-12 my-12">
      <div className="bg-white rounded-md  border border-black p-4 my-4">
        <h1 className="uppercase text-xl text-black mx-2 my-4">News</h1>
        <div className="grid grid-cols-1  gap-4 my-4">
          {data.map((data) => (
            <div className="bg-gray-200 p-4 text-black text-sm w-102 rounded-md  border border-black space-between gap-6">
              <div className="">
                <div className="flex gap-2">
                  <div>Headline :</div>
                  <div>{data.headlines}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <div>Description :</div>
                <div>{data.description}</div>
              </div>
              <div className="flex gap-2">
                <div>Body / Details :</div>
                <div>{data.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        Anytime correct and accurate information for the public can be given via
        the app.. people don't have to panic And don't have to confuse which
        information is true Public can comment on the news or announcement the
        police makes
      </div>
    </section>
  );
};

export default policeMediaDivision;
