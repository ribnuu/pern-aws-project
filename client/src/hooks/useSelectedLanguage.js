import { useState, useEffect } from "react";
import { updateLanguageInProfileApi } from "../apis/ProfileApiService";
import { useDispatch } from "react-redux";
import { setLanguage } from "../store/app-language/AppLanguageSlice";

// Custom hook to manage selected language in local storage
const useSelectedLanguage = (defaultLanguage = "en") => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  useEffect(() => {
    // Retrieve the stored language from local storage
    const storedLanguage = localStorage.getItem("selectedLanguage");

    // If a stored language is found, set it as the selected language
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    } else {
      // If no stored language is found, set the default language as English
      setSelectedLanguage(defaultLanguage);
      localStorage.setItem("selectedLanguage", defaultLanguage);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleUpdateLanguageInDb = async (lang) => {
    const userId = localStorage.getItem("user_id");
    dispatch(setLanguage(lang));
    if (userId) {
      const response = await updateLanguageInProfileApi({
        language: lang,
        userId: userId,
      });
      setSelectedLanguage(lang);
      localStorage.setItem("selectedLanguage", lang);
    }
  };

  const handleSelectLanguage = (lang) => {
    // Update selected language state
    setSelectedLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  // return [selectedLanguage, handleSelectLanguage, handleUpdateLanguageInDb];
  return { selectedLanguage, handleSelectLanguage, handleUpdateLanguageInDb };
};

export default useSelectedLanguage;
