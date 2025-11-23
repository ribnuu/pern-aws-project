import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-24">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Refund Policy
        </h2>

        {/* Refund Policy Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose lg:prose-xl max-w-none mb-8">
            <p>
              At Elite Cyber Task Force, we strive to ensure your satisfaction
              with our services. Should you require a refund, please review our
              policy below.
            </p>
            <p>
              If you are not entirely satisfied with your purchase, we're here
              to help. We offer a full refund within 30 days of your purchase.
              To be eligible for a refund, your request must be made directly
              through our customer support team. After 30 days, unfortunately,
              we can’t offer you a refund or exchange.
            </p>
            <p>
              Our refund policy aims to provide clarity and fairness to our
              customers. If you have any questions or concerns regarding our
              policy, please do not hesitate to contact us.
            </p>
          </div>
        </div>

        {/* Refund Policy Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Our Refund Policy Includes:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Full refund within 30 days of purchase for unused services.</li>
            <li>
              Refunds are processed within 5-7 business days after approval.
            </li>
            <li>
              Contact our customer support team to initiate a refund request.
            </li>
            <li>No refunds or exchanges after 30 days of purchase.</li>
            <li>Refund requests are subject to review and approval.</li>
          </ul>
        </div>

        {/* Additional Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Additional Information
          </h3>
          <p className="text-gray-700 mb-4">
            For more detailed information about our refund process or to
            initiate a refund request, please visit our{" "}
            <a href="/contact-us" className="text-blue-700 hover:underline">
              contact page
            </a>
            .
          </p>
          <p className="text-gray-700 mb-4">
            Elite Cyber Task Force reserves the right to modify this refund
            policy at any time. Any changes will be effective immediately upon
            posting the updated policy on this website.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-700 mb-4">
            If you have any questions or concerns regarding our refund policy,
            please
            <a
              href="mailto:ceo@eforce.lk"
              className="text-blue-700 hover:underline"
            >
              {" "}
              contact us
            </a>
            .
          </p>
          <p className="text-gray-700 mb-4">
            You may also reach out to us via phone at +94 777744006 during our
            business hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
