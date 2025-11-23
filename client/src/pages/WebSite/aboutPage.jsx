import React from "react";
import NetworkSvg from "../../assets/illustrations/network.svg";
import WebSvg from "../../assets/illustrations/webplatform.svg";
import CloudSvg from "../../assets/illustrations/cloud-computing.svg";
import WirelessSvg from "../../assets/illustrations/wireless-internet.svg";
import UsersSvg from "../../assets/illustrations/users-team.svg";
import MobileSecuritySvg from "../../assets/illustrations/mobile-security.svg";
import ProcessSvg from "../../assets/illustrations/process.svg";
import MindSvg from "../../assets/illustrations/mind.svg";
import ServiceSvg from "../../assets/illustrations/service.svg";
import TechnologySvg from "../../assets/illustrations/technology.svg";

const aboutUsData = [
  {
    title: "Our Team",
    subtitle:
      "Meet our dedicated team of cybersecurity experts committed to protecting your business from digital threats.",
    svg: UsersSvg,
  },
  {
    title: "Our Mission",
    subtitle:
      "Empower organizations with robust cybersecurity solutions tailored to their specific needs and challenges.",
    svg: ServiceSvg,
  },
  {
    title: "Our Values",
    subtitle:
      "Integrity, innovation, and excellence guide everything we do at Elite Cyber Task Force.",
    svg: MindSvg,
  },
  {
    title: "Our Vision",
    subtitle:
      "To be the leading cybersecurity partner, safeguarding businesses worldwide against cyber threats.",
    svg: NetworkSvg,
  },
  {
    title: "Why Choose Us?",
    subtitle:
      "Discover what sets Elite Cyber Task Force apart and why businesses trust us with their cybersecurity needs.",
    svg: CloudSvg,
  },
  {
    title: "Client Satisfaction",
    subtitle:
      "Our commitment to exceeding client expectations through reliable services and effective solutions.",
    svg: WirelessSvg,
  },
  {
    title: "Global Reach",
    subtitle:
      "Delivering cybersecurity solutions across borders to protect businesses on a global scale.",
    svg: WebSvg,
  },
  {
    title: "Innovation Hub",
    subtitle:
      "Driving innovation in cybersecurity with cutting-edge technologies and proactive strategies.",
    svg: MobileSecuritySvg,
  },
  {
    title: "Expert Guidance",
    subtitle:
      "Benefit from expert advice and guidance to navigate complex cybersecurity challenges.",
    svg: ProcessSvg,
  },
  {
    title: "Continuous Improvement",
    subtitle:
      "Dedicated to continuous improvement and staying ahead of evolving cyber threats.",
    svg: TechnologySvg,
  },
  {
    title: "Industry Leadership",
    subtitle:
      "Establishing leadership in cybersecurity through thought leadership and industry best practices.",
    svg: MindSvg,
  },
  {
    title: "Community Engagement",
    subtitle:
      "Active participation in community initiatives to promote cybersecurity awareness and education.",
    svg: ServiceSvg,
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutUsData.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg shadow-md p-6">
              {item.svg && (
                <div className="flex justify-center mb-4">
                  <item.svg className="w-16 h-16 text-blue-500" />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white mb-4">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
