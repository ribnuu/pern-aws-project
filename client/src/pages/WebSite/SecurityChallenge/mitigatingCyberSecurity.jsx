import React from "react";
import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";
import IntroContainer from "../components/introContainer";

const MitigatingCyberSecurity = () => {
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Detect and Respond to Cyber-Attacks Before They Cause Damage and Disruption"
        paragraphs={[
          "Any business that has experienced a data breach will understand only too well the damage and disruption they can cause. Just like in any critical situation, being able to respond quickly and effectively is vital.",
          "For most businesses, protecting data and assets from cybercriminals is a constant struggle. With threats only gaining in sophistication, preventing, detecting and responding to them is a huge challenge, particularly against a backdrop of rapid workplace digitalisation and budgetary constraints.",
        ]}
      />

      <div className="bg-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Protect your business with Managed Detection and Response
            </h3>
            <p className="text-gray-300 text-justify mb-4">
              While the use of firewalls and antivirus software may offer your
              business protection against common cyber threats, these systems
              are unable to shield against more advanced attack methods.
            </p>
            <p className="text-gray-300 text-justify mb-4">
              In the absence of a silver bullet, your organisation’s ability to
              proactively detect and respond to threats that breach the
              perimeter could mean the difference between swift, low-cost
              remediation and significant financial and reputational damage.
            </p>
            <p className="text-gray-300 text-justify">
              Ask yourself this: If an attack happened tomorrow, are you
              confident in your organisation’s ability to successfully detect
              and respond to it?
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* <img
              src="https://picsum.photos/400/300"
              alt="Illustrative Image"
              className="rounded-lg shadow-lg max-w-full"
            /> */}
            <SvgOne className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>

      <div className="bg-gray-300 py-12 mt-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Protect your business with Managed Detection and Response
            </h3>
            <p className="text-gray-700 text-justify mb-4">
              Kroll Responder, our Managed Detection and Response service,
              provides the skilled security experts, cutting-edge technology and
              up-to-the-minute industry intelligence needed to proactively hunt
              for and shut down cyber-attacks, 24/7.
            </p>
            <p className="text-gray-700 text-justify mb-4">
              Through continuous network and endpoint monitoring, deep threat
              investigation and the provision of clear, actionable remediation
              advice, Kroll Responder takes the strain off in-house teams and
              helps organisations to quickly level up their cyber security
              maturity.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <SvgTwo className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>

      <div className="bg-gray-700 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Stay on top of your organisation's security exposures
            </h3>
            <p className="text-gray-300 text-justify mb-4">
              Frequent assessment of security controls is important to ensure
              that defences remain effective at preventing and detecting
              attacks. Redscan’s cyber security assessment services help
              identify and address vulnerabilities across your organisation’s
              infrastructure.
            </p>
            <p className="text-gray-300 text-justify mb-4">
              From Vulnerability Assessments and Penetration testing to
              comprehensive Red Team Operations that simulate real-world
              attacks, Redscan can help to uncover and address gaps in your
              security.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <SvgOne className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MitigatingCyberSecurity;
