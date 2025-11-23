import React from "react";

import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";
import IntroContainer from "../components/introContainer";
import LeftSvgRightTextContainer from "../components/leftSvgRightTextContainer";
import ExpandableBulletPoints from "../components/expandableBulletPoints";

const AcheivingGdprCompliance = () => {
  const data = [
    {
      title: "Article 5",
      description:
        "Personal data shall be processed in a manner that ensures appropriate security of the personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures.",
    },
    {
      title: "Article 32",
      description:
        "The ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services. A process for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures for ensuring the security of data processing.",
    },
    {
      title: "Article 33",
      description:
        "Robust procedures in place to detect and investigate personal data breaches, as well as report them within 72 hours to a relevant authority.",
    },
    // {
    //   title: "Article 35",
    //   description:
    //     "A Data Processing Impact Assessment (DPIA) of processing operations on the protection of personal data.",
    // },
  ];

  const exbp = [
    {
      title: "Improve resilience against cyber-attacks",
      desc: "",
    },
    {
      title: "Understand and minimise security risks",
      desc: "",
    },
    {
      title: "Rapidly detect and respond to malicious threats",
      desc: "",
    },
    {
      title: "Enhance security policies and employee awareness",
      desc: "",
    },
    {
      title: "Report breaches within the stipulated 72 hours",
      desc: "",
    },
    {
      title: "Demonstrate good practice with Cyber Essentials",
      desc: "",
    },
  ];
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Why it's vital to safeguard data"
        paragraphs={[
          "The General Data Protection Regulation (GDPR) is a European regulation designed to improve and unify the way that organisations operating across the EU collect, handle, process and store personal data such as HR records and customer lists. Among the requirements of the GDPR is the need for organisations to improve information security and governance.",
          "In the UK, the requirements of the GDPR are enshrined in the Data Protection Act 2018 (DPA).",
        ]}
      />
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            GDPR cyber security requirements
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {item.svg && (
                      <item.svg className="w-16 h-16 text-blue-500" />
                    )}
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

      <LeftSvgRightTextContainer
        svg={SvgOne}
        title="Who does the GDPR apply to and what data needs to be protected?"
        paragraphs={[
          "The GDPR applies to all organisations across the EU that process personal data, or handle and store information on a client’s behalf.",
          "The GDPR places obligations on both data ‘controllers’ and ‘processors’. Data controllers are defined as those who determine the purpose and manner in which data is processed, while data processors are defined as any third party, such as a cloud service provider, that undertakes data processing on behalf of the data controller",

          "Personal data is defined as ‘any information relating to an identified or identifiable natural person’. The GDPR expands the definition outlined in the DPA to also include online identifiers such as IP addresses and web cookies as well as biometric data such as fingerprints.",
        ]}
      />
      <section className="bg-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-100">
            How to minimise your cyber security risk for GDPR compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExpandableBulletPoints data={exbp} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AcheivingGdprCompliance;
