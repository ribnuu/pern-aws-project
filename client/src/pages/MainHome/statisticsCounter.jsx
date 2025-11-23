import React from "react";

const StatisticsCounter = () => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg mt-16 text-center">
      <h3 className="text-xl font-semibold text-white mb-4">Our Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white text-3xl font-bold">200+</h4>
          <p className="text-gray-300">Clients Served</p>
        </div>
        <div>
          <h4 className="text-white text-3xl font-bold">500+</h4>
          <p className="text-gray-300">Projects Completed</p>
        </div>
        <div>
          <h4 className="text-white text-3xl font-bold">1000+</h4>
          <p className="text-gray-300">Vulnerabilities Fixed</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCounter;
