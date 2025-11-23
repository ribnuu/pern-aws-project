import { IntlProvider } from "react-intl";
import messages_en from "./lang/en.json";
import messages_ta from "./lang/ta.json";

const messages = {
  en: messages_en,
  ta: messages_ta,
};

const IntlManager = ({ children, locale }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {/* {children} */}
    </IntlProvider>
  );
};

export default IntlManager;
