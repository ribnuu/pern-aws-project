import React from "react";

const ClientReviews = () => {
  const reviews = [
    {
      text: "The best cybersecurity service we've ever used. Their team helped us identify and fix critical vulnerabilities, ensuring our data remains secure.",
      client: "MR. ILYAS IFTHIKAR, DIALOG TELECOM",
    },
    {
      text: "Professional and efficient. Their incident response team acted quickly to mitigate damage and secure our systems during a recent breach.",
      client: "MR. MOHAMED FIRAZ, SYSTOLIC PVT LTD",
    },
    {
      text: "Their comprehensive security training has significantly improved our team's awareness and response to potential threats. Highly recommend their services.",
      client: "MR. ARSHAD AZAARD, TASAX PVT LTD",
    },
    {
      text: "With their 24/7 monitoring, we feel much more secure knowing that any suspicious activity will be detected and dealt with immediately.",
      client: "MR. ARKAM ILYAS, LARK HOLDINGS",
    },
    // {
    //   text: "Their penetration testing services were thorough and insightful, helping us strengthen our defenses against cyber attacks.",
    //   client: "Michael T., RetailGuard",
    // },
  ];

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg mt-16">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        What Our Clients Say
      </h3>
      <div className="flex flex-col md:flex-row gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <p className="text-gray-300">{`"${review.text}"`}</p>
            <p className="text-blue-400 mt-4">{`- ${review.client}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
