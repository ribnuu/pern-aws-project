import React from "react";
import awardOne from "../../assets/website-images/cybersecurity.png";
import awardTwo from "../../assets/website-images/infosec.png";
import awardThree from "../../assets/website-images/tech-award.jpg";

const AwardsPage = () => {
  const awards = [
    {
      id: 1,
      title: "Cybersecurity Excellence Award",
      category: "Best Security Team",
      year: 2023,
      image: awardOne,
    },
    {
      id: 2,
      title: "InfoSec Innovation Award",
      category: "Cyber Defense Strategy",
      year: 2022,
      image: awardTwo,
    },
    {
      id: 3,
      title: "Tech Leaders Award",
      category: "Innovation in Cyber Solutions",
      year: 2021,
      image: awardThree,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Awards and Recognitions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-64 object-contain object-center"
              />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  {award.title}
                </h3>
                <p className="text-sm text-gray-700 mb-2">{award.category}</p>
                <p className="text-sm text-gray-700">{award.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;
