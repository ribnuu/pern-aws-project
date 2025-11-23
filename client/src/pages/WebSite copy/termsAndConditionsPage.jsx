import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Terms and Conditions
        </h2>

        {/* Section: Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
          <p className="text-gray-700 mb-4">
            Welcome to the Elite Cyber Task Force website. If you continue to
            browse and use this website, you are agreeing to comply with and be
            bound by the following terms and conditions of use, which together
            with our privacy policy govern Elite Cyber Task Force's relationship
            with you in relation to this website.
          </p>
          <p className="text-gray-700 mb-4">
            The term 'Elite Cyber Task Force' or 'us' or 'we' refers to the
            owner of the website whose registered office is 43B Sirimal Mw,
            Dehiwela, Sri Lanka. The term 'you' refers to the user or viewer of
            our website.
          </p>
        </div>

        {/* Section: Usage Terms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Usage Terms</h3>
          <p className="text-gray-700 mb-4">
            The use of this website is subject to the following terms of use:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              You may not create a link to this website from another website or
              document without Elite Cyber Task Force's prior written consent.
            </li>
            <li>
              Your use of this website and any dispute arising out of such use
              of the website is subject to the laws of Sri lanka.
            </li>
            <li>
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offence.
            </li>
          </ul>
        </div>

        {/* Section: Changes to Terms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Changes to Terms</h3>
          <p className="text-gray-700 mb-4">
            Elite Cyber Task Force reserves the right to change these terms and
            conditions from time to time as it sees fit and your continued use
            of the site will signify your acceptance of any adjustment to these
            terms. You are advised to check this page periodically for updates.
          </p>
        </div>

        {/* Section: Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h3>
          <p className="text-gray-700 mb-4">
            In no event will Elite Cyber Task Force be liable for any loss or
            damage including without limitation, indirect or consequential loss
            or damage, or any loss or damage whatsoever arising from loss of
            data or profits arising out of, or in connection with, the use of
            this website.
          </p>
        </div>

        {/* Section: Governing Law */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Governing Law</h3>
          <p className="text-gray-700 mb-4">
            These terms and conditions are governed by and construed in
            accordance with the laws of [country] and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>

        {/* Section: Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, please{" "}
            <Link to="/contact-us" className="text-blue-700 hover:underline">
              contact us
            </Link>{" "}
            at ceo@eforce.lk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
