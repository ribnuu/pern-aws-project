import React, { useState } from "react";

const TestingCsReadiness = () => {
  const data = [
    {
      title: "Penetration Testing",
      desc: "CREST-approved pentesting engagements help identify hidden vulnerabilities in your infrastructure, applications, people and processes.",
    },
    {
      title: "Scenario-Based Testing",
      desc: "Performed by experienced red team ethical hackers, Scenario-Based Testing mirrors common cyber security threat scenarios to help validate the effectiveness of in-place controls and drive improvements to threat hunting, breach detection and incident response.",
    },
    {
      title: "Web Application testing",
      desc: "A specialist form of pen testing that assesses the security of web applications in order to identify vulnerabilities such as authentication, input validation and session management flaws.",
    },
    {
      title: "Vulnerability Assessment",
      desc: "Improve the effectiveness of your security management programmes by scanning your network to identify common weaknesses in your network infrastructure.",
    },
    {
      title: "ECTF Operations",
      desc: "In an intelligence-led Red Team Operation, our experts replicate modern adversarial techniques to test your organisation’s ability to detect and respond to a simulated cyber-attack.",
    },
    {
      title: "Social Engineering",
      desc: "Evaluate how your employees react to social engineering attempts by commissioning a simulated phishing assessment that leverages real-world approaches.",
    },
  ];

  const [expandedItems, setExpandedItems] = useState(
    new Array(data.length).fill(false)
  );

  const toggleItem = (index) => {
    const newExpandedItems = new Array(data.length).fill(false); // Create a new array to close all items
    newExpandedItems[index] = !expandedItems[index]; // Toggle the clicked item
    setExpandedItems(newExpandedItems); // Update state to reflect changes
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Elite Cyber Task Force Security Assessments
          </h2>
          <p className="mb-8">
            Elite Cyber Task Force’s cyber security assessment services are
            designed to help uncover weaknesses in organisation’s
            infrastructure, controls and processes before they are exploited by
            cybercriminals.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-100">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-start mb-4">
                <button
                  className={`flex items-center justify-center mr-2 focus:outline-none rounded-full bg-gray-300 w-8 h-8`}
                  onClick={() => toggleItem(index)}
                >
                  <svg
                    className={`w-4 h-4 text-red-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {expandedItems[index] ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </>
                    ) : (
                      <>
                        <line
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                        />
                        <line
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                        />
                      </>
                    )}
                  </svg>
                </button>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {expandedItems[index] && (
                    <ul className="pl-4 mt-2">
                      <li className="mb-2">{item.desc}</li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default TestingCsReadiness;
