import React from "react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Basic",
      price: "$99/month",
      features: [
        "Basic Vulnerability Assessment",
        "Network Security Monitoring",
        "Email Support",
        "Monthly Security Reports",
      ],
      description:
        "Ideal for small businesses looking to establish a basic cybersecurity posture.",
    },
    {
      name: "Standard",
      price: "$199/month",
      features: [
        "Advanced Vulnerability Assessment",
        "24/7 Network Security Monitoring",
        "Phone & Email Support",
        "Weekly Security Reports",
        "Threat Intelligence Feeds",
      ],
      description:
        "Perfect for growing businesses that need comprehensive security measures.",
    },
    {
      name: "Premium",
      price: "$399/month",
      features: [
        "Full Penetration Testing",
        "Dedicated Security Analyst",
        "24/7 Network and Endpoint Monitoring",
        "Phone, Email & On-site Support",
        "Daily Security Reports",
        "Threat Intelligence Feeds",
        "Incident Response Planning",
        "Security Awareness Training",
      ],
      description:
        "Best for large enterprises requiring top-notch security services and support.",
    },
  ];

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg mt-16">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Cybersecurity Pricing Plans
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <h4 className="text-white text-lg mb-4">{plan.name}</h4>
            <p className="text-white text-3xl mb-4">{plan.price}</p>
            <p className="text-gray-400 mb-4">{plan.description}</p>
            <ul className="text-gray-300 mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
