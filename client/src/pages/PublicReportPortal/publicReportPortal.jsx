import React from "react";

const publicReportPortal = () => {
  const data = [
    {
      id: 1,
      incident: "Missing Person",
      photosAvailable: 1,
      documentsAvailable: 1,
      videosAvailable: 1,
      location: "Mount Lavinia Junction",
      reportedAt: "12-04-2022 12.03PM",
    },
    {
      id: 2,
      incident: "Number Plate Mismatch",
      photosAvailable: 0,
      documentsAvailable: 1,
      videosAvailable: 1,
      location: "Thummula Junction and Matara Main Road",
      reportedAt: "18-05-2022 04.00PM",
    },
    {
      id: 2,
      incident: "Black Listed Phone Activated",
      photosAvailable: 0,
      documentsAvailable: 0,
      videosAvailable: 0,
      location: "Airport",
      reportedAt: "18-05-2022 03.00AM",
    },
  ];
  return (
    <section className="mx-12 my-12">
      <div className="grid grid-cols-2 text-black gap-4">
        {data.map((data, index) => {
          let photos = "";
          if (data.photosAvailable === 1) {
            photos = (
              <div className="bg-green-300 text-green-900 p-1 px-4 rounded-md  border border-black">
                Photo(s) Available
              </div>
            );
          } else {
            photos = (
              <div className="bg-yellow-300 text-yellow-900 p-1 px-4 rounded-md  border border-black">
                Photo(s) Available
              </div>
            );
          }
          let videos = "";
          if (data.videosAvailable === 1) {
            videos = (
              <div className="bg-green-300 text-green-900 p-1 px-4 rounded-md  border border-black">
                Vidoes(s) Available
              </div>
            );
          } else {
            videos = (
              <div className="bg-yellow-300 text-yellow-900 p-1 px-4 rounded-md  border border-black">
                Vidoes(s) Available
              </div>
            );
          }
          let documents = "";
          if (data.documentsAvailable === 1) {
            documents = (
              <div className="bg-green-300 text-green-900 p-1 px-4 rounded-md  border border-black">
                Documents(s) Available
              </div>
            );
          } else {
            documents = (
              <div className="bg-yellow-300 text-yellow-900 p-1 px-4 rounded-md  border border-black">
                Documents(s) Available
              </div>
            );
          }
          return (
            <div className="bg-white p-4 rounded-xl grid grid-cols-12 gap-4 justify-around border border-black">
              <div className="my-auto col-span-6">
                <div className="text-xl text-red-500">
                  Type of incident:
                  {data.incident}
                </div>
                <div>Location of Incident :{data.location}</div>
                <div className="text-xs">
                  Time of Report:
                  {data.reportedAt}
                </div>
                <form>
                  <div className="my-2">
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" class="sr-only peer" />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span class="ml-3 text-sm font-medium text-gray-900">
                        Resolved
                      </span>
                    </label>
                  </div>
                </form>
              </div>
              <div className="flex flex-col gap-1 col-span-6">
                <div>{photos}</div>
                <div>{documents}</div>
                <div>{videos}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-24">
        This screen shows all the incidents reported by the public using the
        Report Incident Menu within the Citizen General Portal.
      </div>
    </section>
  );
};

export default publicReportPortal;
