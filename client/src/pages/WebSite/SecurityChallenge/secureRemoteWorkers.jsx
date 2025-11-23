import React from "react";

import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";
import IntroContainer from "../components/introContainer";
import LeftSvgRightTextContainer from "../components/leftSvgRightTextContainer";
import ExpandableBulletPoints from "../components/expandableBulletPoints";

const SecureRemoteWorkers = () => {
  const securityTipsForRemoteWorking = [
    {
      title: "Implement multifactor authentication across all accounts",
      desc: "",
    },
    {
      title: "Enable audit logging when using platforms such as Office 365",
      desc: "",
    },
    {
      title: "If bandwidth allows, encourage staff to use a VPN at all times",
      desc: "",
    },
    {
      title:
        "Ensure employee devices are protected with the latest endpoint security",
      desc: "",
    },
    {
      title: "Review the security and privacy settings of collaboration tools",
      desc: "",
    },
    {
      title: "Use DMARC and SPF to help identify email phishing attacks",
      desc: "",
    },
  ];

  const remoteWorkSecurityRisks = [
    {
      title: "Defending a vastly increased attack surface",
      description:
        "When employees work from home, an organisation’s traditional network perimeter is dissolved, meaning there is a much larger surface area to protect. This not only increases cyber risk, but also the workload of security teams.",
    },
    {
      title: "Perimeter security is less effective",
      description:
        "When employees work from home, devices no longer sit within the boundaries of a well-defined perimeter. This means that existing network security controls such as firewalls are unable to provide the same level of protection.",
    },
    {
      title: "Identity and access management",
      description:
        "When many different users and devices connect to a network from remote locations, it can be very difficult to know which access requests can be trusted. Amongst an increased level of noise, preventing and detecting unauthorised attempts to access networks, systems and data is a challenge.",
    },
    {
      title: "Reduced threat visibility",
      description:
        "When devices are used to access networks from remote locations, threat detection becomes even more challenging. Security teams often lack visibility of user and device behaviours, and also struggle to differentiate between regular and anomalous activity.",
    },
    {
      title: "Use of employee-owned devices",
      description:
        "When employees use a combination of business-owned and personal devices to access corporate networks, the task of identifying trusted devices becomes even harder. Many organisations have BYOD policies, but don’t ensure that information security policies are updated accordingly.",
    },
    {
      title: "Managing cloud security and applications",
      description:
        "When employees work from home, organisations are increasingly reliant on cloud platforms and SaaS applications to ensure staff remain productive and can collaborate effectively. It’s common for cloud workloads to be misconfigured and employees to use unapproved software.",
    },
  ];
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Mitigate the cyber security risks of remote working"
        paragraphs={[
          "Protecting your organisation against cyber threats when employees work outside the office can be daunting. Not only does remote working massively increase the surface of attack, it also renders many traditional controls, designed to protect workers inside the confines of a traditional network, ineffective.",
          "Read on to learn more about the challenges of home working security and how to reduce your cyber security risk.",
        ]}
      />

      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Remote working security risks
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remoteWorkSecurityRisks.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {/* {item.svg && (
                      <item.svg className="w-16 h-16 text-blue-500" />
                    )} */}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-100">
            Security tips for remote working
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpandableBulletPoints data={securityTipsForRemoteWorking} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default SecureRemoteWorkers;
