import React from "react";

import NetworkSvg from "../../../assets/illustrations/network.svg";
import WebSvg from "../../../assets/illustrations/webplatform.svg";
import CloudSvg from "../../../assets/illustrations/cloud-computing.svg";
import UsersSvg from "../../../assets/illustrations/users-team.svg";
import MindSvg from "../../../assets/illustrations/mind.svg";
import ServiceSvg from "../../../assets/illustrations/service.svg";
import SvgComponent from "../../../components/SvgComponent/svgComponent";

const ManagingCloudSecurity = () => {
  const data = [
    {
      title: "24/7 threat monitoring",
      desc: "Redscan’s CREST accredited Security Operations Centre (SOC) is staffed around-the-clock by experienced security professionals. Our analysts and engineers monitor your cloud security 24/7 to identify genuine incidents and provide the actionable guidance needed to remediate them.",
      svg: NetworkSvg,
    },
    {
      title: "Best-in-class detection tools",
      desc: "An agnostic approach to technology selection means Kroll Responder supplies the cloud detection tools that deliver the best security outcomes for your organisation.",
      svg: WebSvg,
    },
    {
      title: "Accelerated incident response",
      desc: "To facilitate incident response, Kroll Responder includes actionable remediation guidance, automated ‘events-based’ playbooks, and optional on-site support for priority incidents.",
      svg: CloudSvg,
    },
    {
      title: "Actionable mitigation guidance",
      desc: "Once a threat has been detected, Redscan SOC analysts facilitate rapid incident response by providing the remediation guidance your in-house teams needs to respond swiftly and effectively.",
      svg: UsersSvg,
    },
    {
      title: "Cloud security experts",
      desc: "If you’re considering moving your infrastructure to the cloud, you can rely on our managed cloud security service to support you every step of the way. Our experts are on hand to help ensure that your transition is as secure as possible.",
      svg: MindSvg,
    },
    {
      title: "Rapid service deployment",
      desc: "Elevate cloud security in just a matter of weeks. Through a highly efficient service on-boarding and tuning process, Kroll Responder can be up and running in no time and easily scale in line with operational needs.",
      svg: ServiceSvg,
    },
  ];

  return (
    <section className="bg-gray-800 py-12 sm:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col sm:flex-row items-center mb-8 sm:mb-0 sm:ml-2 sm:mr-2"
            >
              <div className="p-4">
                <SvgComponent
                  className="p-4"
                  svg={item.svg}
                  height="30px"
                  width="30px"
                />
              </div>
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagingCloudSecurity;
