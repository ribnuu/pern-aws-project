import React from "react";
import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";
import IntroContainer from "../components/introContainer";

const IdentifyingAndRespondingToThreats = () => {
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Hackers could already have a foothold in your network"
        paragraphs={[
          "It is vital to be aware of when your organisation is under attack. With government research suggesting that a third of all businesses in the UK experienced one or more cyber security breaches in the last year, building the ability to improve defences and obtain visibility of malicious activity before it results in damage and disruption is now more important than ever.",
          "Unfortunately, by the time most organisations first become aware that they have suffered a data breach, it is already too late. With attackers increasingly covert in their approach, critical assets and intellectual property may already have been compromised.",
        ]}
      />

      <div className="bg-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-6">
              The benefits of Managed Detection and Response
            </h3>
            <p className="text-gray-300 text-justify mb-4">
              With no silver bullet for preventing 100% of all attacks,
              mitigating your organisation’s cyber security risk requires the
              ability to identify attacks as soon as they occur.
            </p>
            <p className="text-gray-300 text-justify mb-4">
              Kroll Responder, our Managed Detection and Response service,
              supplies the skilled security experts, cutting-edge technology and
              up-to-the-minute industry intelligence needed to proactively hunt
              for and shut down cyber-attacks, 24/7.
            </p>
            <p className="text-gray-300 text-justify">
              Through continuous network and endpoint monitoring, deep threat
              investigation and the provision of clear, actionable remediation
              advice, Kroll Responder takes the strain off in-house teams and
              helps organisations to quickly level up their cyber security
              maturity.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <SvgOne className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>

      <div className="bg-gray-300 py-12 mt-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Address the weaknesses in your cyber security
            </h3>
            <p className="text-gray-700 text-justify mb-4">
              To reduce the risk of your organisation being compromised by
              criminal attackers, frequent assessment and appraisal of systems
              is needed to highlight vulnerabilities that could be routinely
              exploited.
            </p>
            <p className="text-gray-700 text-justify mb-4">
              Redscan’s range of cyber assessment services includes Penetration
              Testing and Red Team Operations to identify and help address
              security risks in networks, systems and applications.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <SvgTwo className="w-full max-w-xs md:max-w-md flex justify-center mb-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentifyingAndRespondingToThreats;
