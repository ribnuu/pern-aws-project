import React from "react";
import hyperVImg from "../../assets/website-images/hyper-v.png";
import hybridCloudImg from "../../assets/website-images/hybrid-cloud.png";
import vmWareImg from "../../assets/website-images/vmware.png";
import gSuiteImg from "../../assets/website-images/g-suite.jpg";
import officeImg from "../../assets/website-images/office365.png";
import gcpImg from "../../assets/website-images/gcp.png";
import azureImg from "../../assets/website-images/azure.png";
import awsImg from "../../assets/website-images/aws.png";
import openStackImg from "../../assets/website-images/openstack.png";

const CloudSecurityPage = () => {
  const sections = [
    {
      title: "Hybrid Cloud",
      content:
        "Rapid digitalisation, an increasingly mobile workforce and the desire for speed and scalability have accelerated the pace of cloud adoption amongst businesses. However, as more organisations embrace cloud and hybrid cloud, they significantly expand the surface for cybercriminals to exploit. Hybrid cloud security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: hybridCloudImg,
    },
    {
      title: "AWS",
      content:
        "While moving workloads to Amazon Web Services offers a range of benefits, such as lowering IT costs and improving scalability and productivity, your organisation cannot afford to ignore the potential cyber security risks. AWS environments are commonly targeted by cybercriminals due to the large amounts of sensitive information they hold. Although the Amazon Shared Responsibility Model means that Amazon physically secures its infrastructure, AWS customers are responsible for securing the applications and data uploaded to it.",
      image: awsImg,
    },
    {
      title: "Azure",
      content:
        "If your organisation has moved or is moving workloads to Microsoft Azure, security must always be front-of-mind. While Azure offers a range of basic security controls, these alone will not be sufficient to protect your business. Azure cloud security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: azureImg,
    },
    {
      title: "GCP",
      content:
        "In recent years, Google Cloud Platform (GCP) has emerged as the popular choice for businesses in need of a scalable cloud hosting solution. Owing to the sensitive information they hold, however, GCP environments are commonly targeted by cybercriminals – meaning organisations should take appropriate steps to ensure data and applications are well protected. Cloud security in GCP is also important given Google’s security model, which dictates that security is a shared responsibility.",
      image: gcpImg,
    },
    {
      title: "Office-365",
      content:
        "As the world’s most widely used SaaS platform, Microsoft Office 365 is routinely targeted by cybercriminals. Securing applications and services such as OneDrive, SharePoint and Exchange should therefore be a high priority. Office 365 security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: officeImg,
    },
    {
      title: "G-Suite",
      content:
        "G Suite cloud applications such as Google Drive and Gmail help businesses to improve workforce productivity and collaboration. However, without appropriate mechanisms in place to protect and monitor G Suite environments, organisations risk exposing critical data and assets. G Suite cloud security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: gSuiteImg,
    },
    {
      title: "Hyper-V",
      content:
        "Hyper-V allows businesses to create and manage virtual machines on their infrastructure. Ensuring the security of these virtual environments is critical to prevent cyber attacks and data breaches. Hyper-V security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: hyperVImg,
    },
    {
      title: "VMWare",
      content:
        "VMWare provides powerful virtualization solutions for businesses of all sizes. However, securing these virtual environments is essential to protect sensitive data and maintain compliance with industry standards. VMWare security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: vmWareImg,
    },
    {
      title: "OpenStack",
      content:
        "OpenStack offers open-source software for building and managing cloud computing platforms. It provides a flexible and scalable infrastructure-as-a-service (IaaS) solution, but ensuring security across OpenStack deployments is crucial to safeguard sensitive data and maintain operational integrity. OpenStack security monitoring to improve threat visibility and help swiftly respond to attacks is an effective way to minimise cyber security risk and ensure compliance with the latest regulations and standards.",
      image: openStackImg,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cloud Security Solutions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-40 sm:h-56 object-contain"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudSecurityPage;
