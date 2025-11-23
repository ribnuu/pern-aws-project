import React from "react";
import IntroContainer from "../components/introContainer";
import LeftSvgRightTextContainer from "../components/leftSvgRightTextContainer";
import RightSvgLeftTextContainer from "../components/rightSvgLeftTextContainer";

import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";

const TacklingPhishingAndBECAttacks = () => {
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Reduce the risk of falling victim to the latest social engineering scams"
        paragraphs={[
          "Phishing attacks target organisations of all sizes and are becoming increasingly prevalent, sophisticated and costly.",
          "Identifying, preventing and responding to phishing attacks should be a priority for all organisations, but doing so effectively requires a layered approach to security, encompassing robust perimeter controls, employee training, regular assessments and proactive network and endpoint monitoring.",
        ]}
      />

      <LeftSvgRightTextContainer
        svg={SvgOne}
        title="What is phishing?"
        paragraphs={[
          "Email phishing is a type of attack vector used by adversaries to trick users into performing adverse actions and/or divulging confidential information. Imitating communications from trusted individuals and businesses, spoof emails often appear legitimate and bait their targets into clicking malicious links and malware-laden attachments.",
          "Spear phishing, also known as whaling, is a highly targeted phishing attack designed to compromise a specific individual, usually a system administrator or high authority individual such as a C-level executive. Phishing attacks are also often conducted by voice (vishing) and mobile text message (smishing).",
        ]}
      />

      <RightSvgLeftTextContainer
        svg={SvgTwo}
        title="What is a BEC attack?"
        paragraphs={[
          "A Business Email Compromise (BEC) is a specialist type of phishing attack that is becoming increasingly prevalent. BEC phishing attacks are designed to impersonate senior executives and trick employees, customers or vendors into wiring payment for goods or services to alternate bank accounts. According to research from the FBI, BEC attacks accounted for half of the cyber-crime losses which took place in 2019.",
          "Distribution fraud is a closely related form of phishing attack whereby companies use fake domains to imitate well-known organisations and request quotations for high value goods. Once a quotation has been supplied, a fake purchase order is emailed to the supplier in the hope that goods will be shipped without payment being made.",
          "While the goal behind BEC attacks is commonly financial gain, other types of phishing attacks may have a broader focus, such as stealing credentials or other sensitive information.",
        ]}
      />
    </section>
  );
};

export default TacklingPhishingAndBECAttacks;
