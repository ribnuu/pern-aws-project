import React from "react";
import softwareEngineerImage from "../../assets/website-images/se.png"; // Example image import
import dataAnalystImage from "../../assets/website-images/da.png"; // Example image import

const CareersPage = () => {
  const jobs = [
    {
      title: "Software Engineer",
      location: "Colombo, Sri Lanka",
      description:
        "We are looking for a talented and motivated Software Engineer to join our team. You will work on cutting-edge technologies and collaborate with a dynamic team to develop innovative solutions.",
      responsibilities: [
        "Develop software solutions according to technical specifications.",
        "Collaborate with cross-functional teams to define, design, and ship new features.",
        "Write clean, scalable, and testable code.",
        "Participate in code reviews and provide constructive feedback.",
      ],
      qualifications: [
        "Bachelor’s degree in Computer Science or a related field.",
        "Proven experience as a Software Engineer or similar role.",
        "Proficiency in JavaScript, React.js, Node.js, and other relevant technologies.",
        "Strong problem-solving skills and ability to think creatively.",
        "Excellent communication and teamwork skills.",
      ],
      applyLink: "/contact-us", // Replace with actual application link
      image: softwareEngineerImage, // Replace with actual image import
    },
    {
      title: "Data Analyst",
      location: "Colombo, Sri Lanka",
      description:
        "We are seeking a Data Analyst to join our analytics team. You will analyze large datasets, generate insights, and contribute to data-driven decision-making.",
      responsibilities: [
        "Collect and analyze data to generate meaningful insights.",
        "Develop and maintain data pipelines and databases.",
        "Create visualizations and reports for stakeholders.",
        "Collaborate with teams to identify opportunities for data-driven improvements.",
      ],
      qualifications: [
        "Bachelor’s degree in Statistics, Mathematics, Computer Science, or a related field.",
        "Proven experience as a Data Analyst or similar role.",
        "Proficiency in SQL, Python, and data visualization tools (e.g., Tableau).",
        "Strong analytical and problem-solving skills.",
        "Ability to work independently and collaborate effectively.",
      ],
      applyLink: "/contact-us", // Replace with actual application link
      image: dataAnalystImage, // Replace with actual image import
    },
    // Add more job objects as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center mb-8">Join Our Team</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl md:text-2xl font-bold">{job.title}</h3>
                  <p className="text-sm md:text-base">{job.location}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-gray-800 mb-4">{job.description}</div>

              <div className="mb-4">
                <div className="text-gray-800 font-bold mb-2">
                  Responsibilities:
                </div>
                <ul className="list-disc list-inside">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="text-gray-800 font-bold mb-2">
                  Qualifications:
                </div>
                <ul className="list-disc list-inside">
                  {job.qualifications.map((qual, idx) => (
                    <li key={idx} className="text-gray-700">
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersPage;
