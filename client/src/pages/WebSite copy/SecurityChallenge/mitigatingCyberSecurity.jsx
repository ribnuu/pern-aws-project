import React from "react";

const MitigatingCyberSecurity = () => {
  return (
    <section className="bg-gray-800 py-24">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Our Approach to Mitigating Cybersecurity Risks
        </h2>
        <p className="text-gray-300 mb-12">
          We are dedicated to providing comprehensive cybersecurity solutions
          that safeguard your business from emerging threats.
        </p>
      </div>

      <div className="bg-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://picsum.photos/200/300"
              alt="Illustrative Image"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Our Mission: Protecting Your Business
            </h3>
            <p className="text-gray-300">
              At [Your Company Name], we prioritize your cybersecurity needs.
              Our mission is to provide innovative solutions and expert
              knowledge to mitigate cyber risks effectively. From penetration
              testing to incident response and cybersecurity training, we offer
              tailored services that ensure the security and resilience of your
              business operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MitigatingCyberSecurity;
