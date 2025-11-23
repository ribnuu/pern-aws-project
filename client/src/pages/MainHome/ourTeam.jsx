import React from "react";

const OurTeam = () => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg mt-16">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Meet Our Team
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <img
            src="https://github.com/AhsanLozaa.png"
            alt="Team Member"
            className="rounded-full mx-auto mb-4 h-20 w-20 object-cover"
          />
          <h4 className="text-white">MR. AHSAN ILYAS</h4>
          <p className="text-gray-300">SOFTWARE DEVELOPER</p>
        </div>
        <div className="text-center">
          <img
            src="https://avatar.iran.liara.run/public/13"
            alt="Team Member"
            className="rounded-full mx-auto mb-4 h-20 w-20 object-cover"
          />
          <h4 className="text-white">MR. MITHSIRI DIAS</h4>
          <p className="text-gray-300">DIRECTOR</p>
        </div>
        <div className="text-center">
          <img
            src="https://avatar.iran.liara.run/public/86"
            alt="Team Member"
            className="rounded-full mx-auto mb-4 h-20 w-20 object-cover"
          />
          <h4 className="text-white">MRS. RUZNA AMANULLA</h4>
          <p className="text-gray-300">CHIEF FINANCIAL OFFICER</p>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
