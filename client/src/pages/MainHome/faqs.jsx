import React from "react";

const Faqs = () => {
  const faqItems = [
    {
      question: "What is Penetration Testing?",
      answer:
        "Penetration testing involves simulating cyber attacks to identify and fix vulnerabilities in your systems. It helps in understanding the effectiveness of your security measures and ensures that your network and applications are secure against potential threats.",
    },
    {
      question: "How do you respond to incidents?",
      answer:
        "Our incident response team acts quickly to mitigate damage, recover systems, and secure data. We follow a structured process that includes identification, containment, eradication, recovery, and lessons learned to prevent future incidents.",
    },
    {
      question: "What training do you provide?",
      answer:
        "We offer comprehensive cybersecurity training for your team to help them defend against threats effectively. This includes phishing awareness, secure coding practices, incident response training, and regular security workshops to keep your staff up-to-date with the latest security trends.",
    },
    {
      question: "What is a Vulnerability Assessment?",
      answer:
        "A vulnerability assessment is a process of identifying, quantifying, and prioritizing vulnerabilities in your systems. It involves scanning your network and applications to find weaknesses that could be exploited by attackers and provides recommendations for remediation.",
    },
    {
      question: "How often should I conduct security assessments?",
      answer:
        "It is recommended to conduct security assessments at least annually or after any significant changes to your infrastructure. Regular assessments help in identifying new vulnerabilities and ensuring that your security measures are up-to-date and effective against emerging threats.",
    },
    {
      question: "What is Threat Intelligence?",
      answer:
        "Threat intelligence involves gathering and analyzing information about current and emerging threats. It helps organizations understand the threat landscape, predict potential attacks, and implement proactive security measures to defend against them.",
    },
  ];

  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg mt-16">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <details key={index} className="bg-gray-800 p-4 rounded-lg">
            <summary className="text-white cursor-pointer">
              {item.question}
            </summary>
            <p className="text-gray-300 mt-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
