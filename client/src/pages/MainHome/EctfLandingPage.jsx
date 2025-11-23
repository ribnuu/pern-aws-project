import React from "react";
import StatisticsCounter from "./statisticsCounter";
import ClientReviews from "./clientReviews";
import OurTeam from "./ourTeam";
import PricingPlans from "./pricingPlans";
import Faqs from "./faqs";
import { CallToAction } from "@mui/icons-material";

const EctfLandingPage = () => {
  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen mx-0">
        {/* Header or Navbar */}
        {/* <Header /> */}

        {/* Hero Section */}
        <header className="px-8 py-24 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-8">
            Elite Cyber Task Force
          </h1>
          <p className="text-lg text-center mb-12 max-w-2xl">
            We provide cutting-edge cybersecurity solutions to protect your
            business.
          </p>
          <div className="flex space-x-4">
            <a
              href="/services"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
            >
              Get Started
            </a>
            <a
              href="/about-us"
              className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-100 px-6 py-3 rounded-lg text-lg font-medium transition duration-300"
            >
              Learn More
            </a>
          </div>
        </header>

        {/* Features Section */}
        <section className="bg-gray-800 py-24">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Feature Card 1 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Penetration Testing
                </h3>
                <p className="text-gray-300">
                  Identify and mitigate vulnerabilities before they are
                  exploited.
                </p>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Incident Response
                </h3>
                <p className="text-gray-300">
                  Rapidly respond to cyber incidents to minimize damage and
                  recovery time.
                </p>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Cybersecurity Training
                </h3>
                <p className="text-gray-300">
                  Equip your team with the knowledge and skills to defend
                  against cyber threats.
                </p>
              </div>
              {/* Feature Card 4 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Risk Assessment
                </h3>
                <p className="text-gray-300">
                  Evaluate potential risks to your organization and implement
                  effective countermeasures.
                </p>
              </div>
              {/* Feature Card 5 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Threat Intelligence
                </h3>
                <p className="text-gray-300">
                  Stay ahead of cyber threats with real-time intelligence and
                  analysis.
                </p>
              </div>
              {/* Feature Card 6 */}
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Compliance Management
                </h3>
                <p className="text-gray-300">
                  Ensure your organization meets all relevant cybersecurity
                  regulations and standards.
                </p>
              </div>
            </div>

            {/* Statistics Counter */}
            <StatisticsCounter />

            {/* What Our Clients Say */}
            <ClientReviews />

            {/* Our Team */}
            <OurTeam />

            {/* Pricing Plans Section */}
            <PricingPlans />

            {/* FAQ's */}
            <Faqs />

            {/* Call to Action Banner */}
            <CallToAction />
          </div>
        </section>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default EctfLandingPage;
