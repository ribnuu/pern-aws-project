import React from "react";
import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";
import IntroContainer from "../components/introContainer";

const InvestigatingAndReportingBreaches = () => {
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Identify and address breaches before they damage your business"
        paragraphs={[
          "According to government-backed research, a third of all UK businesses have experienced one or more cyber security breaches in the last year – a number that continues to grow. To minimise the risk of attacks and the damage and disruption they can cause, rapid response is vital.",
        ]}
      />

      <div className="bg-gray-700 py-12">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 mb-8 md:mb-0 md:pl-12">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Data breaches are increasingly costly
            </h3>
            <p className="text-gray-300 text-justify mb-4">
              While the immediate disruption caused by data breaches can be
              significant, less visible costs such as reputational damage, loss
              of competitive advantage, plus higher insurance premiums and
              regulatory fines, can result in a ninefold increase in the overall
              cost of attacks.
            </p>
            <p className="text-gray-300 text-justify mb-4">
              $3.9 million – the average cost of a data breach Ponemon
              Institute, 2019 Cost of Data Breach Study
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
              The benefits of Managed Detection and Response
            </h3>
            <p className="text-gray-700 text-justify mb-4">
              Obtaining the capability needed to proactively detect and respond
              to data breaches around-the-clock can be hugely complex and
              time-consuming. The technology required to identify the latest
              advanced threats is costly and qualified security personnel with
              the knowledge needed to utilise it are in short supply.
            </p>
            <p className="text-gray-700 text-justify mb-4">
              Kroll Responder, our award-winning Managed Detection and Response
              (MDR) service, helps your organisation overcome the challenges of
              day-to-day security monitoring, supplying certified security
              experts, leading detection technologies and cutting-edge threat
              intelligence for one cost-effective subscription.
            </p>
            <p className="text-gray-700 text-justify mb-4">
              Kroll Responder provides the detailed and actionable remediation
              guidance needed to shut down threats before they can cause
              significant financial and reputational damage
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
              Incident response on-demand
            </h3>
            <p className="text-gray-300 text-justify mb-4">
              In the event of your organisation experiencing a breach, Redscan’s
              CREST-accredited cyber incident response team can be called upon
              to help investigate and respond to the incident.
            </p>
            <p className="text-gray-300 text-justify mb-4">
              Our experienced Computer Security Incident Response Team (CSIRT)
              professionals are skilled at investigating cyber-attacks and
              mitigating their adverse effects. We utilise the latest digital
              forensic techniques to identify, where possible, the source and
              type of attack, how and to what extent it has propagated, and
              which systems, data and user accounts have been compromised.
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

export default InvestigatingAndReportingBreaches;
