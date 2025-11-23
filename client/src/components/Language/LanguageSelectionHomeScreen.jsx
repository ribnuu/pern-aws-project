import React, { useState } from "react";

const LanguageSelectionHomeScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-3 text-sm gap-2  font-black mt-12">
        <button onClick={(e) => handleSelectLanguage("si")}>
          <div
            className={`border border-gray-900 rounded-md px-4 py-2 uppercase ${
              selectedLanguage === "si"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            සිංහල
          </div>
        </button>
        <button onClick={(e) => handleSelectLanguage("ta")}>
          <div
            className={`border border-gray-900 rounded-md px-4 py-2 uppercase ${
              selectedLanguage === "ta"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            தமிழ்
          </div>
        </button>
        <button onClick={(e) => handleSelectLanguage("en")}>
          <div
            className={`border border-gray-900 rounded-md px-4 py-2 uppercase ${
              selectedLanguage === "en"
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            English
          </div>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelectionHomeScreen;
