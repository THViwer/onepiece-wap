import React from 'react';
import {IntlProvider} from "react-intl";
import translations from "./i18n/locales"
import App from "./App";


function AppWrapper() {
    // get locale from url
    const locale = window.location.search.replace("?locale=", "") || "en";
    const messages = translations[locale];
    return (
        <IntlProvider defaultLocale={"EN"} locale={locale} key={locale} messages={messages}>
            <App/>
        </IntlProvider>
    );
}

export default AppWrapper;