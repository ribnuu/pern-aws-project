import React from "react";

const characterInfo = () => {
  return (
    <div className="mx-12 my-12 bg-white text-gray-950 gap-12 p-2 flex  rounded-lg">
      <div className="flex justify-between gap-16">
        <div className="border-2 rounded-lg">
          <img src="../img" className="w-48 h-48" />
        </div>
        <div className=" my-4">
          <div className="flex gap-2">
            <div>Name :</div>
            <div>Peter Cullen</div>
          </div>
          <div className="flex gap-2">
            <div>Age :</div>
            <div>52</div>
          </div>
          <div className="flex gap-2">
            <div>Address :</div>
            <div>189 , Railway Road , Kollupitiya</div>
          </div>
          <div className="flex gap-2">
            <div>Height :</div>
            <div>5'10 (177cm)</div>
          </div>
          <div className="flex gap-2">
            <div>Gender :</div>
            <div>Male</div>
          </div>
          <div className="flex gap-2">
            <div>Blood Type :</div>
            <div>O +</div>
          </div>
          <div className="flex gap-2">
            <div>Recent Criminal Record (if any) :</div>
            <div>No</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default characterInfo;
