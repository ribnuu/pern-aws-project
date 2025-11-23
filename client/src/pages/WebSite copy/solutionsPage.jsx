import React from "react";
import EnergySvg from "../../assets/illustrations/energy.svg";
import FinanceSvg from "../../assets/illustrations/finance.svg";
import FintechSvg from "../../assets/illustrations/fintech.svg";
import GovernmentSvg from "../../assets/illustrations/government.svg";
import HealthcareSvg from "../../assets/illustrations/healthcare.svg";
import LegalSvg from "../../assets/illustrations/legal.svg";
import ManufacturingSvg from "../../assets/illustrations/manufacturing.svg";
import MediaSvg from "../../assets/illustrations/media.svg";
import NonprofitSvg from "../../assets/illustrations/nonprofit.svg";
import PropertySvg from "../../assets/illustrations/property.svg";
import RetailSvg from "../../assets/illustrations/retail.svg";
import TechnologySvg from "../../assets/illustrations/technology.svg";
import TransportSvg from "../../assets/illustrations/transport.svg";

const Solutions = () => {
  const solutions = [
    {
      title: "Education",
      description:
        "In today’s changing threat landscape, protecting the confidentiality of sensitive information is just as important as providing a high standard of education. Education providers that fail to implement appropriate measures risk the theft of important research and the disclosure of student personal and financial information.",
      svg: GovernmentSvg,
    },
    {
      title: "Energy",
      description:
        "As a leader in the energy sector, you will undoubtedly be aware of high-profile cyber-attacks in your industry. But do you have confidence that you have the right controls and processes in place to prevent serious breaches? From power outages to disclosure of sensitive customer information, the impact of a cyber-attack could have a high cost to your business and to the people who rely on your services.",
      svg: EnergySvg,
    },
    {
      title: "Finance",
      description:
        "As a leader within a bank, hedge fund, wealth management firm or private equity house, you will already recognise the importance of cyber resilience and protecting the sensitive data your organisation holds. But how do you mitigate information security risks against the need to modernise IT systems and drive business initiatives? From customer data to banking records to proprietary research and trading algorithms, the valuable information held by institutions in the financial sector is at a constant risk of being targeted by cybercriminals.",
      svg: FinanceSvg,
    },
    {
      title: "Fintech",
      description:
        "As a leader in the fintech space, you will be well aware of the technology-driven innovation that is continuing to transform the financial services sector. Indeed, fintech is disrupting all sectors of the industry, from banking and payments to asset management and insurance. With more consumers and organisations embracing digital transformation, more data than ever becomes accessible in digital formats and this creates new security challenges for the fintech sector. Protecting confidential information, including personal and financial data, is of paramount importance to your continued success.",
      svg: FintechSvg,
    },
    {
      title: "Government",
      description:
        "Cybercrime poses a significant risk to organisations across the public sector. Whether it is disruption to critical infrastructure or the loss of confidential information, the consequences of a cyber-attack are severe for government organisations and the people that rely on them. As a public sector professional within a government department, agency or council, it is vital to take proactive steps to protect against the potential damage cyberattacks could cause.",
      svg: GovernmentSvg,
    },
    {
      title: "Healthcare",
      description:
        "As a leader within the healthcare industry, you will be well aware of the scale of cyber risk in healthcare – consistently among the most frequently targeted industries. Attacks on hospitals, health trusts, GP practices and other healthcare bodies have the potential to lead to the loss of sensitive patient data and disrupt the provision of vital services. Digital transformation in the sector is only making it more imperative for healthcare companies to respond proactively to the latest cyber security threats. Read on to learn how Elite Cyber Task Force can help your organisation to address these challenges.",
      svg: HealthcareSvg,
    },
    {
      title: "Legal",
      description:
        "As a professional in the legal sector, your reputation depends on being able to protect the highly sensitive and confidential information entrusted to you by your clients. But with attacks on legal firms on the rise, how do you ensure your organisation remains secure?",
      svg: LegalSvg,
    },
    {
      title: "Manufacturing",
      description:
        "As a leader in the manufacturing industry, you are accustomed to adapting to change. But it would be a mistake to view cybercrime as just another routine business challenge.",
      svg: ManufacturingSvg,
    },
    {
      title: "Media",
      description:
        "Your industry is fast-moving, but so are cybercriminals. Since Sony Pictures fell victim to a major data breach in 2014, concern has been growing about the risks of cybercrime to companies across the media sector. Are you confident that you have the right controls and processes in place to protect your organisation, partners and clients?",
      svg: MediaSvg,
    },
    {
      title: "Nonprofit",
      description:
        "When your organisation provides a vital lifeline for people and communities, the impact of a cyber-attack could be disastrous. With the third sector commonly viewed as an easy target by cybercriminals, it is essential to manage and mitigate the risks to the sensitive data you hold. In its report, The Road Ahead 2020, the NCVO highlights the urgent need for charities and not-for-profit organisations to take a proactive approach to addressing the risks of cybercrime. Phishing, ransomware, malicious insiders and other types of threats have the potential to inflict significant damage.",
      svg: NonprofitSvg,
    },
    {
      title: "Property",
      description:
        "As a leader within the property industry, you will undoubtedly be aware of the damage cyber-attacks can inflict on organisations within your sector. With the scale and sophistication of cybercrime increasing, attacks on housing building companies, estate agents, and housing associations have the potential to cause severe financial, operational and reputational damage. Are you doing enough to protect your business?",
      svg: PropertySvg,
    },
    {
      title: "Retail",
      description:
        "As a retailer, quickly adapting to customer trends is what makes your business successful. But are you prepared to respond effectively to fast-evolving cyber threats? 80% of retailers surveyed for the British Retail Consortium’s 2019 Retail Crime Survey said that they experienced an increase in cyber-attacks during the previous year. Data breaches, ransomware and denial of service attackers affect not only major retailers, but stores and ecommerce websites of all sizes.",
      svg: RetailSvg,
    },
    {
      title: "Technology",
      description:
        "Organisations in every industry sector use technology to improve efficiency and drive innovation and profitability, but the sheer pace of change can often lead to serious security considerations being overlooked. As a leader in the tech space, your customers depend on your products on a daily basis – on the assumption that their security won’t be put at risk. They also rely on you to put cyber security measures in place to protect your technology and the sensitive data it processes.",
      svg: TechnologySvg,
    },
    {
      title: "Transport",
      description:
        "As a leader within a transportation company, you will already recognise the importance of cyber resilience and protecting your cargo and passengers. New threats are constantly emerging. Whether your organisation operates across air, rail, road or sea, you need to ensure that threats to your organisation are identified and shut down before they impact operations.",
      svg: TransportSvg,
    },
    {
      title: "Telecommunications",
      description:
        "As a leader in the telecommunications industry, you are aware of the critical role that communication networks play in modern society. Cyber threats targeting telecom infrastructure can disrupt services, compromise customer data, and cause significant financial losses. Ensuring robust security measures are in place is essential to safeguarding against attacks that could cripple communication networks and harm your business's reputation.",
      svg: TechnologySvg,
    },
  ];

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Solutions
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <solution.svg className="w-16 h-16 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {solution.title}
                </h3>
                <p className="text-gray-700 mb-4">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
