// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import App from "./App.jsx";
// // import "./index.css";
// // import { Provider } from "react-redux";
// // import store from "./store/Store.js";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   // <React.StrictMode>
// //   <Provider store={store}>
// //     <App />
// //   </Provider>
// //   // </React.StrictMode>
// // );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import App from "./App.jsx";
// import AppLoadingIndicator from "./components/AppLoadingIndicator/AppLoadingIndicator"; // Adjust path
// import store from "./store/Store.js";
// import "./index.css";
// import { IntlProvider } from "react-intl";
// import messages_en from "./lang/en.json";
// import messages_ta from "./lang/ta.json";

// const messages = {
//   en: messages_en,
//   ta: messages_ta,
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <AppLoadingIndicator />
//     <IntlProvider locale={"ta"} messages={messages["ta"]}>
//       <App />
//     </IntlProvider>
//   </Provider>
//   // </React.StrictMode>
// );

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux"; // Import useSelector
import App from "./App.jsx";
import AppLoadingIndicator from "./components/AppLoadingIndicator/AppLoadingIndicator";
import store from "./store/Store.js";
import "./index.css";
import { IntlProvider } from "react-intl";
import messages_en from "./lang/en.json";
import messages_si from "./lang/si.json";
import messages_ta from "./lang/ta.json";
import useSelectedLanguage from "./hooks/useSelectedLanguage"; // Import custom hook

// Define your messages object
const messages = {
  en: messages_en,
  si: messages_si,
  ta: messages_ta,
};

const Root = () => {
  const { selectedLanguage } = useSelectedLanguage(); // Get the selected language from the custom hook

  const languageReducer = useSelector((state) => state.appLanguageReducer); // Use useSelector here

  const [locale, setLocale] = useState(selectedLanguage || "en");

  // Whenever selectedLanguage changes, update the locale
  useEffect(() => {
    setLocale(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    if (languageReducer) {
      setLocale(languageReducer.selectedLanguage);
    }
  }, [languageReducer]);

  return (
    <>
      <AppLoadingIndicator />
      <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
      </IntlProvider>
    </>
  );
};

// Ensure <Provider> wraps the entire React tree
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
