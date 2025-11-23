import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import AppLoadingIndicator from "./components/AppLoadingIndicator/AppLoadingIndicator"; // Adjust path
import store from "./store/Store.js";
import "./index.css";
import { IntlProvider } from "react-intl";
import messages_en from "./lang/en.json";
import messages_si from "./lang/si.json";
import messages_ta from "./lang/ta.json";
import useSelectedLanguage from "./hooks/useSelectedLanguage"; // Import your custom hook

// Define your messages object
const messages = {
  en: messages_en,
  si: messages_si,
  ta: messages_ta,
};

const Root = () => {
  // Use the custom hook to get the selected language (locale)
  const { selectedLanguage } = useSelectedLanguage();

  // Set the default locale if selectedLanguage is undefined or invalid
  const locale = selectedLanguage || "en"; // Default to English if no language selected

  return (
    <Provider store={store}>
      <AppLoadingIndicator />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
      </IntlProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
