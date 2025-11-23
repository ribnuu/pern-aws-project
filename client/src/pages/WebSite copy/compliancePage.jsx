// import * as React from "react";
// import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

// const CompliancePage = () => {
//   const [expanded, setExpanded] = React.useState(null);

//   const handleChange = (panel) => {
//     setExpanded(expanded === panel ? null : panel);
//   };

//   const sections = [
//     {
//       title: "GDPR",
//       content:
//         "The General Data Protection Regulation (GDPR) is a European regulation designed to improve and unify the way that organisations operating across the EU collect, handle, process and store personal data such as HR records and customer lists. Among the requirements of the GDPR is the need for organisations to improve information security and governance.",
//     },
//     {
//       title: "DPA 2018",
//       content:
//         "The Data Protection Act 2018 (DPA), which received Royal Assent in May 2018, is a comprehensive legal framework for UK data protection. It replaces the DPA 1998 to set new, clarified and modernised standards for safeguarding data in the digital world. The DPA 2018 is designed to govern the protection of personal data to the standards set by the EU’s General Data Protection Regulation (GDPR). It also covers general data, law enforcement data and national security data.",
//     },
//     {
//       title: "PCI DSS",
//       content:
//         "If your business processes card transactions, protecting this highly sensitive information should be a high priority. Failure to introduce and maintain appropriate payment security standards could result in your organisation receiving significant fines and suffering serious reputational damage. However, putting in place the range of controls needed to achieve compliance with the latest Payment Card Industry Data Security Standards (PCI DSS) can place a strain on your organisation. As a leading provider of managed security and assessment services, Elite Cyber Task Force can help your organisation to understand and implement the technical and operational controls needed to fulfil PCI requirements.",
//     },
//     {
//       title: "ISO 27001",
//       content:
//         "Achieving ISO/IEC 27001 certification demonstrates to customers, partners and other stakeholders that an organisation is committed to managing information safely and securely. The long road to an ISMS and ISO 27001 compliance can be daunting for any business. It can be difficult to understand and effectively prioritise the required compliance measures, particularly if in-house resources are stretched. As an award-winning provider of cyber security and consultancy services, Elite Cyber Task Force is well placed to help your organisation assess and improve its information security in line with ISO 27001 controls and demonstrate compliance with the GDPR and other regulatory requirements.",
//     },
//     {
//       title: "NIS Directive",
//       content:
//         "EU Directive 2016/1148, the Directive on the Security of Networks and Information Systems (the NIS Directive or Cyber Security Directive), came into force in July 2016 and was transposed into UK law as The Network and Information Systems Regulations 2018 (NIS Regulations) on 10 May 2018. With an increasing number of cyber threats targeting critical infrastructure, the importance of protecting operators of essential services, such as transportation, health, water and energy, has never been greater. The NIS Directive is designed to improve security and resilience across the European Union by ensuring that operators of essential services and digital services providers have the necessary controls in place to minimise security risk.",
//     },
//     {
//       title: "SWIFT CSP",
//       content:
//         "The SWIFT Customer Security Programme (CSP) is a framework designed to help financial institutions improve their cyber security posture. All SWIFT members must submit an annual self-attestation of compliance with the controls outlined in the framework. SWIFT conducts random inspections on its members to ensure that they have appropriate cyber security controls in place and reports any non-compliant organisations to industry regulators, such as the UK’s Financial Conduct Authority.",
//     },
//     {
//       title: "NHS DSP Toolkit",
//       content:
//         "The Data Security and Protection Toolkit (DSP Toolkit) is an online-self assessment tool that helps organisations within the NHS to benchmark their security against the National Data Guardian’s ten Data Security Standards (NDG Standards). The DSP Toolkit helps to ensure that robust data security and data privacy standards are in place across the healthcare sector and are aligned to the requirements of the General Data Protection Regulation (GDPR).",
//     },
//   ];

//   return (
//     <div className="container mx-auto p-5">
//       {sections.map((section, index) => (
//         <div key={index} className="my-4">
//           <div
//             className="bg-white shadow-lg rounded-lg p-5 cursor-pointer"
//             onClick={() => handleChange(index)}
//           >
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-700">
//                 {section.title}
//               </h2>
//               {expanded === index ? (
//                 <FaArrowAltCircleUp className="w-5 h-5 text-gray-700" />
//               ) : (
//                 <FaArrowAltCircleDown className="w-5 h-5 text-gray-700" />
//               )}
//             </div>
//           </div>
//           {expanded === index && (
//             <div className="bg-gray-50 shadow-inner rounded-lg p-5 mt-2">
//               <p className="text-gray-600">{section.content}</p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompliancePage;

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import * as React from "react";

const CompliancePage = () => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };
  const sections = [
    {
      title: "GDPR",
      content:
        "The General Data Protection Regulation (GDPR) is a European regulation designed to improve and unify the way that organisations operating across the EU collect, handle, process and store personal data such as HR records and customer lists. Among the requirements of the GDPR is the need for organisations to improve information security and governance.",
    },
    {
      title: "DPA 2018",
      content:
        "The Data Protection Act 2018 (DPA), which received Royal Assent in May 2018, is a comprehensive legal framework for UK data protection. It replaces the DPA 1998 to set new, clarified and modernised standards for safeguarding data in the digital world. The DPA 2018 is designed to govern the protection of personal data to the standards set by the EU’s General Data Protection Regulation (GDPR). It also covers general data, law enforcement data and national security data.",
    },
    {
      title: "PCI DSS",
      content:
        "If your business processes card transactions, protecting this highly sensitive information should be a high priority. Failure to introduce and maintain appropriate payment security standards could result in your organisation receiving significant fines and suffering serious reputational damage. However, putting in place the range of controls needed to achieve compliance with the latest Payment Card Industry Data Security Standards (PCI DSS) can place a strain on your organisation. As a leading provider of managed security and assessment services, Elite Cyber Task Force can help your organisation to understand and implement the technical and operational controls needed to fulfil PCI requirements.",
    },
    {
      title: "ISO 27001",
      content:
        "Achieving ISO/IEC 27001 certification demonstrates to customers, partners and other stakeholders that an organisation is committed to managing information safely and securely. The long road to an ISMS and ISO 27001 compliance can be daunting for any business. It can be difficult to understand and effectively prioritise the required compliance measures, particularly if in-house resources are stretched. As an award-winning provider of cyber security and consultancy services, Elite Cyber Task Force is well placed to help your organisation assess and improve its information security in line with ISO 27001 controls and demonstrate compliance with the GDPR and other regulatory requirements.",
    },
    {
      title: "NIS Directive",
      content:
        "EU Directive 2016/1148, the Directive on the Security of Networks and Information Systems (the NIS Directive or Cyber Security Directive), came into force in July 2016 and was transposed into UK law as The Network and Information Systems Regulations 2018 (NIS Regulations) on 10 May 2018. With an increasing number of cyber threats targeting critical infrastructure, the importance of protecting operators of essential services, such as transportation, health, water and energy, has never been greater. The NIS Directive is designed to improve security and resilience across the European Union by ensuring that operators of essential services and digital services providers have the necessary controls in place to minimise security risk.",
    },
    {
      title: "SWIFT CSP",
      content:
        "The SWIFT Customer Security Programme (CSP) is a framework designed to help financial institutions improve their cyber security posture. All SWIFT members must submit an annual self-attestation of compliance with the controls outlined in the framework. SWIFT conducts random inspections on its members to ensure that they have appropriate cyber security controls in place and reports any non-compliant organisations to industry regulators, such as the UK’s Financial Conduct Authority.",
    },
    {
      title: "NHS DSP Toolkit",
      content:
        "The Data Security and Protection Toolkit (DSP Toolkit) is an online-self assessment tool that helps organisations within the NHS to benchmark their security against the National Data Guardian’s ten Data Security Standards (NDG Standards). The DSP Toolkit helps to ensure that robust data security and data privacy standards are in place across the healthcare sector and are aligned to the requirements of the General Data Protection Regulation (GDPR).",
    },
  ];

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Compliance Standards
      </h1>
      {sections.length === 0 ? (
        <p className="text-center text-gray-600">
          No compliance standards available at the moment.
        </p>
      ) : (
        sections.map((section, index) => (
          <div key={index} className="my-4">
            <div
              className="bg-white shadow-lg rounded-lg p-5 cursor-pointer"
              onClick={() => handleChange(index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  {section.title}
                </h2>
                {expanded === index ? (
                  <ArrowUpward className="w-5 h-5 text-gray-700" />
                ) : (
                  <ArrowDownward className="w-5 h-5 text-gray-700" />
                )}
              </div>
            </div>
            {expanded === index && (
              <div className="bg-gray-50 shadow-inner rounded-lg p-5 mt-2">
                <p className="text-gray-600">{section.content}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CompliancePage;
