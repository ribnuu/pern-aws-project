import React from "react";
import IntroContainer from "../components/introContainer";
import LeftSvgRightTextContainer from "../components/leftSvgRightTextContainer";
import RightSvgLeftTextContainer from "../components/rightSvgLeftTextContainer";

import SvgOne from "../../../assets/illustrations/mdr@1x.svg";
import SvgTwo from "../../../assets/illustrations/mss@1x.svg";

const DefendingAgainstInsiderThreats = () => {
  return (
    <section className="bg-gray-800 py-24 min-h-screen">
      <IntroContainer
        title="Identify and eliminate insider threats before they damage your business"
        paragraphs={[
          "Whether acting out of malice or negligence, insider threats pose a significant cyber security risk to all organisations. Data from Kroll’s quarterly Threat Landscape reports indicate that the rise in internal threats is showing no signs of slowing down, in many cases exacerbated post-pandemic.",
          "While the dangers posed by insider threats are becoming more widely recognised, not enough resources are being allocated to mitigate the risk they pose. As threat actors become more sophisticated and attacks continue to target employees, the human and technological defences of every organisation need to keep up.",
          "By understanding where and how insiders can facilitate an attack, leading to internal threats, companies can work to preempt, stall or mitigate attacks when employees cross the line from friend to foe.",
        ]}
      />

      <LeftSvgRightTextContainer
        svg={SvgOne}
        title="What is an insider threat?"
        paragraphs={[
          "Insider threats in cyber security are threats posed by individuals from within an organisation, such as current or former employees, contractors and partners. These individuals have the potential to misuse access to networks and assets to wittingly or unwittingly disclose, modify and delete sensitive information.",
          "Information at risk of being compromised could include details about an organisation’s security practices, customer and employee data, login credentials and sensitive financial records. The nature of internal threats means that traditional preventative security measures are often ineffective.",
        ]}
      />

      <RightSvgLeftTextContainer
        svg={SvgTwo}
        title="How to detect an insider threat"
        paragraphs={[
          "The best way to detect internal threats is to take proactive steps to protect your organisation.",
          "One essential aspect of defending against insider threats is to closely manage user account privileges, adopting a policy of least privilege. Ensure that you implement a device management policy and application control, particularly in light of the rise in hybrid working.",
          "Proactive network security and endpoint monitoring is vital for helping to identify and respond to internal threats before they cause disruption. It is also important to ensure that your organisation has an effective and comprehensive incident response plan in place.",
        ]}
      />
    </section>
  );
};

export default DefendingAgainstInsiderThreats;
