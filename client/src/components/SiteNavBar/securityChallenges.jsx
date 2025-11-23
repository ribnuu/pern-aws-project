import React from "react";

const SecurityChallenges = ({ showSecurityChallenges }) => {
  return (
    <ul
      className={`absolute mt-2 w-100 rounded-lg bg-white shadow-lg ${
        showSecurityChallenges ? "block" : "hidden"
      } z-10`}
    >
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/mtcs"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Mitigating cyber security
        </a>
      </li>
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/igrt"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Identifying and responding to threats
        </a>
      </li>
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/tcsr"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Testing cyber security readiness
        </a>
      </li>
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/mgcs"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Managing cloud security
        </a>
      </li>
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/igrb"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Investigating and reporting breaches
        </a>
      </li>
      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/pgam"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Protecting against malware
        </a>
      </li>

      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/tpba"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Tackling phishing and BEC attacks
        </a>
      </li>

      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/dait"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Defending against inisder threats
        </a>
      </li>

      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/agdc"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Achieving GDPR compliance
        </a>
      </li>

      <li className="border-b border-gray-200 last:border-b-0">
        <a
          href="/security-challenges/sgrw"
          className="block py-3 px-4 text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          Securing remote workers
        </a>
      </li>
    </ul>
  );
};

export default SecurityChallenges;
