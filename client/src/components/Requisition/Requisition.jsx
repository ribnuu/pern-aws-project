import React, { useEffect, useState } from "react";

const requisition = () => {
  const [motorActive, setMotorActive] = useState(false);
  const [ImmigrationActive, setImmigrationActive] = useState(false);
  const [ExaminationActive, setExaminationActive] = useState(false);
  const [policeActive, setPoliceActive] = useState(false);
  const [trafficActive, setTrafficActive] = useState(false);

  return (
    <section className="py-4">
      <div className="mx-14 my-12 bg-white p-4 rounded-md border border-black ">
        <h1 className="text-gray-900 font-bold mx-auto  my-1 text-xl uppercase">
          DRE - Data Requisition Engine
        </h1>
        <div className="grid">
          <div
            className="border border-gray-950 rounded-md m-1 px-4 py-1 my-2"
            onClick={() => setMotorActive(!motorActive)}
          >
            <p className="text-gray-950 text-xl text-bold">Motor Department</p>
          </div>
          <div
            className="border border-gray-950 rounded-md m-1 px-4 py-1 my-2"
            onClick={() => setImmigrationActive(!ImmigrationActive)}
          >
            <p className="text-gray-950 text-xl  text-bold">
              Immigration Department
            </p>
          </div>
          <div
            className="border border-gray-950 rounded-md m-1 px-4 py-1 my-2"
            onClick={() => setExaminationActive(!ExaminationActive)}
          >
            <p className="text-gray-950 text-xl text-bold">
              Examination Department
            </p>
          </div>
          <div
            className="border border-gray-950 rounded-md m-1 px-4 py-1 my-2"
            onClick={() => setPoliceActive(!policeActive)}
          >
            <p className="text-gray-950 text-xl text-bold">
              {" "}
              Police Department
            </p>
          </div>
          <div
            className="border border-gray-950 rounded-md m-1 px-4 py-1 my-2"
            onClick={() => setTrafficActive(!trafficActive)}
          >
            <p className="text-gray-950 text-xl text-bold">
              {" "}
              Traffic Department
            </p>
          </div>
        </div>
      </div>
      <div className="mx-12 my-12 rounded-md">
        <div className="h-full text-gray-950 rounded-md md:grid gap-4 md:grid-cols-3 z-0 px-2 py-2">
          {motorActive && (
            <div className="bg-white p-2 flex flex-col gap-2 rounded-md">
              <div className="">
                <p className="text-xl font-extrabold border border-gray-950 rounded-md bg-white m-1 px-4 py-1 my-2">
                  Motor Department
                </p>
              </div>
              <div
                className="bg-white h-48 rounded-md home-scroll border border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-2"
              >
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  7476376376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  8976376376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  2003376376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  9976376554X
                </p>
              </div>
            </div>
          )}
          {ImmigrationActive && (
            <div className="bg-white p-2 flex flex-col gap-2 rounded-md">
              <div className="">
                <p className="text-xl font-extrabold border border-gray-950 rounded-md bg-white m-1 px-4 py-1 my-2">
                  Immigration Department
                </p>
              </div>
              <div
                className="bg-white h-48 rounded-md home-scroll border border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-2"
              >
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  8912276376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  9872376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  3210576376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  5674676376X
                </p>
              </div>
            </div>
          )}
          {ExaminationActive && (
            <div className="bg-white p-2 flex flex-col gap-2 rounded-md">
              <div className="">
                <p className="text-xl font-extrabold border border-gray-950 rounded-md bg-white m-1 px-4 py-1 my-2">
                  Examination Department
                </p>
              </div>
              <div
                className="bg-white h-48 rounded-md home-scroll border border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-1"
              >
                <p className="bg-gray-300 border border-gray-300 rounded-md hover:bg-gray-850 px-2 hover:text-green-500">
                  7896976376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  3459576376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  8765476376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                  5431676376X
                </p>
              </div>
            </div>
          )}
          {policeActive && (
            <div className="bg-white p-2 flex flex-col gap-2 rounded-md">
              <div className="">
                <p className="text-xl font-extrabold border border-gray-950 rounded-md bg-white m-1 px-4 py-1 my-2">
                  Police Department
                </p>
              </div>
              <div
                className="bg-white h-48 rounded-md home-scroll border border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-2 "
              >
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  7476376376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  5558376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  9124476376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  1236376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  1236376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  1236376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  1236376376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  1236376376X
                </p>
              </div>
            </div>
          )}
          {trafficActive && (
            <div className="bg-white p-2 flex flex-col gap-2 rounded-md">
              <div className="">
                <p className="text-xl font-extrabold border border-gray-950 rounded-md bg-white m-1 px-4 py-1 my-2">
                  Traffic Department
                </p>
              </div>
              <div
                className="bg-white h-48 rounded-md home-scroll border border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-2"
              >
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500 font-medium">
                  7890676376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  2345676376X
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  2003376376V
                </p>
                <p className="bg-gray-300 border border-gray-300 rounded-md px-2 hover:bg-gray-850 hover:text-green-500">
                  6547376376X
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          Data requisition requests is queued based on the department. Some
          departments may respond faster to the query. While some Departments
          are slower in response. That is why, we maintain individual queue for
          each department.
        </div>
      </div>
    </section>
  );
};

export default requisition;
