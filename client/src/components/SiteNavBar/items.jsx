import React, { useState } from "react";
import SecurityChallenges from "./securityChallenges";

const Items = () => {
  const [showSecurityChallenges, setShowSecurityChallenges] = useState(false);

  const toggleSecurityChallenges = () => {
    setShowSecurityChallenges(!showSecurityChallenges);
    setShowSolutions(false);
  };

  return (
    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      {/* Home */}
      <li>
        <a
          href="/"
          className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
          aria-current="page"
        >
          Home
        </a>
      </li>

      {/* About Us */}
      <li>
        <a
          href="/about-us"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          About Us
        </a>
      </li>

      {/* Services */}
      <li>
        <a
          href="/services"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Services
        </a>
      </li>

      {/* Solutions */}
      <li>
        <a
          href="/solutions"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Solutions
        </a>
      </li>

      {/* Compliance */}
      <li>
        <a
          href="/compliance"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Compliance
        </a>
      </li>

      {/* Cloud Security */}
      <li>
        <a
          href="/cloud-security"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Cloud Security
        </a>
      </li>

      {/* Security Challenges */}
      <li>
        <button
          onClick={toggleSecurityChallenges}
          className="flex justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span>Security Challenges</span>
          <svg
            className={`ml-2 h-4 w-4 ${
              showSecurityChallenges ? "transform rotate-90" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Sub-items for Security Challenges */}
        <SecurityChallenges showSecurityChallenges={showSecurityChallenges} />
      </li>

      {/* Contact Us */}
      <li>
        <a
          href="/contact-us"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Contact Us
        </a>
      </li>

      {/* Careers */}
      <li>
        <a
          href="/careers"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Careers
        </a>
      </li>

      {/* Terms & Conditions */}
      <li>
        <a
          href="/terms-and-conditions"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Terms and Conditions
        </a>
      </li>

      {/* Refund Policy */}
      <li>
        <a
          href="/refund-policy"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Refund Policy
        </a>
      </li>
    </ul>
  );
};

export default Items;
