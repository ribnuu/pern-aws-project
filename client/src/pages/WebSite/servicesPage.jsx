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

const servicesCardsData = [
  {
    title: "Network (Internal & External) Testing",
    subtitle:
      "Elite Cyber Task Force rigorously investigates your network to identify and exploit a wide range of security vulnerabilities. This enables us to establish if assets such as data can be compromised, classify the risks posed to your overall cyber security, prioritise vulnerabilities to be addressed, and recommend actions to mitigate risks identified.",
    svg: NetworkSvg,
  },
  {
    title: "Web Application Testing",
    subtitle:
      "Web applications play a vital role in business success and are an attractive target for cybercriminals. Elite Cyber Task Force ethical hacking services include website and web app penetration testing to identify vulnerabilities including SQL injection and cross-site scripting problems plus flaws in application logic and session management flows.",
    svg: WebSvg,
  },
  {
    title: "Cloud Penetration Testing",
    subtitle:
      "With specific rules of engagement set by each provider, cloud penetration testing is not straightforward. Our range of custom cloud security assessments can help your organisation overcome these challenges by uncovering and addressing vulnerabilities that could leave critical assets exposed.",
    svg: CloudSvg,
  },
  {
    title: "Wireless Testing",
    subtitle:
      "Unsecured wireless networks can enable attackers to enter your network and steal valuable data. Wireless penetration testing identifies vulnerabilities, quantifies the damage these could cause and determines how they should be remediated.",
    svg: WirelessSvg,
  },
  {
    title: "Social Engineering",
    subtitle:
      "People continue to be one of the weakest links in an organisation’s cyber security. Elite Cyber Task Force social engineering penetration testing service includes a range of email phishing engagements designed to assess the ability of your systems and personnel to detect and respond to a simulated attack exercise.",
    svg: UsersSvg,
  },
  {
    title: "Mobile Security Testing",
    subtitle:
      "Mobile app usage is on the rise, with more and more companies enabling customers to conveniently access their services via tablets and smartphones. Elite Cyber Task Force carries out in-depth mobile application assessments based on the latest development frameworks and security testing tools.",
    svg: MobileSecuritySvg,
  },
];

const webApplicationTestingBulletPoints = [
  {
    title: "Injection flaws",
  },
  {
    title: "Security misconfigurations",
  },
  {
    title: "Authentication weaknesses",
  },
  {
    title: "Database interaction errors",
  },
  {
    title: "Poor session management",
  },
  {
    title: "Input validation problems",
  },
  {
    title: "Broken access controls",
  },
  {
    title: "Flaws in application logic",
  },
];

const cloudPenetrationTestingBulletPoints = [
  {
    title: "Improved understanding of cloud security risks",
  },
  {
    title:
      "Clearer demonstration of commitment to security to external stakeholders",
  },
  {
    title: "Vulnerabilities fixed before they can be maliciously exploited",
  },
  {
    title: "Better prioritisation of future security investments",
  },
  {
    title: "Independent validation of cloud security controls",
  },
  {
    title: "Enhanced support of data security compliance mandates",
  },
];

const agilePenTestingBulletPonts = [
  {
    title:
      "Enhancing development sprint plans to include the appropriate level of security assessment required.",
  },
  {
    title:
      "Strategising “abuse cases” for every release through a rapid threat modelling exercise ahead of development.",
  },
  {
    title:
      "Validating countermeasures to the abuse cases, along with exploratory threat scenarios through an agile pen testing exercise post-development.",
  },
  {
    title:
      "Logging of any potential vulnerabilities directly on development platforms, such as JIRA, Azure DevOps, etc., for remediation.",
  },
  {
    title:
      "Validating the applied fix (remediation) by conducting an optional retesting exercise.",
  },
  {
    title:
      "Analysing vulnerability patterns, scoring, time to fix and other critical statistics and communicating program improvement.",
  },
];

const breachAndAttackSimulationData = [
  {
    title: "Flexibility",
    subtitle:
      "Our breach and attack simulations offer unparalleled flexibility, providing a tailored exercise that precisely meets your organization's unique needs. By customizing simulations to test specific vulnerabilities and response times, your team gains practical insights into real-world scenarios, enhancing readiness and resilience against cyber threats.",
    svg: MindSvg,
  },
  {
    title: "Assurance",
    subtitle:
      "With our breach and attack simulations, you can have confidence in measured adherence to your security standards and protocols. By simulating realistic attack vectors and evaluating your defenses comprehensively, you gain valuable insights into potential vulnerabilities and areas for improvement, ensuring your organization is well-prepared to detect, respond to, and mitigate cyber attacks.",
    svg: ProcessSvg,
  },
  {
    title: "Simulation",
    subtitle:
      "Experience scripted attack methods developed by our trusted advisors in our breach and attack simulations. By replicating sophisticated cyber threats and attack scenarios, these simulations provide a realistic environment to assess your team's readiness and capabilities, enabling proactive identification of weaknesses and vulnerabilities in your defenses.",
    svg: TechnologySvg,
  },
  {
    title: "Training",
    subtitle:
      "Track your team's progress and readiness through repeatable playbooks designed for effective learning and improvement in our breach and attack simulations. These simulations provide hands-on training that allows teams to practice responding to simulated cyber attacks, fostering continuous improvement in cybersecurity defenses and response capabilities.",
    svg: ServiceSvg,
  },
  {
    title: "Scalability",
    subtitle:
      "Our breach and attack simulations are scalable, accommodating organizations of all sizes. Whether you're a small startup or a large enterprise, our simulations can be tailored to your specific needs and scale as your cybersecurity requirements evolve.",
    svg: ProcessSvg,
  },
  {
    title: "Realism",
    subtitle:
      "Achieve realism in cybersecurity training with our breach and attack simulations, which replicate real-world scenarios and cyber threats. This realistic approach helps your team develop practical skills and responses to actual threats, enhancing overall preparedness and resilience.",
    svg: MindSvg,
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesCardsData.map((service, index) => (
            <div key={index} className="bg-gray-700 rounded-lg shadow-md p-6">
              {service.svg && (
                <div className="flex justify-center mb-4">
                  <service.svg className="w-16 h-16 text-blue-500" />
                </div>
              )}
              <h3 className="text-2xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-4">{service.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="mt-16">
          <SectionWithData
            title="Breach and Attack Simulation"
            data={breachAndAttackSimulationData}
          />
          {/* Uncomment and add more sections as needed */}
          {/* <SectionWithBulletPoints
          title="Web Application Testing"
          bulletPoints={webApplicationTestingBulletPoints}
        />
        <SectionWithBulletPoints
          title="Cloud Penetration Testing"
          bulletPoints={cloudPenetrationTestingBulletPoints}
        />
        <SectionWithBulletPoints
          title="Agile Penetration Testing"
          bulletPoints={agilePenTestingBulletPonts}
        /> */}
        </div>
      </div>
    </div>
  );
};

const SectionWithBulletPoints = ({ title, bulletPoints }) => {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <ul className="list-disc list-inside text-gray-700">
        {bulletPoints &&
          bulletPoints.map((point, index) => (
            <li key={index}>{point.title}</li>
          ))}
      </ul>
    </section>
  );
};

const SectionWithData = ({ title, data }) => {
  return (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-700 rounded-lg shadow-md p-6">
            {item.svg && (
              <div className="flex justify-center mb-4">
                <item.svg className="w-16 h-16 text-blue-500" />
              </div>
            )}
            <h4 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h4>
            <p className="text-gray-300">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;
