import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
    .use(Backend) // if you load from external or local JSON files
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: { escapeValue: false },
        resources: {
            en: { translation: require("./i18n/en.json") },
            afr: { translation: require("./i18n/afr.json") },
            xh: { translation: require("./i18n/xh.json") },
            so: { translation: require("./i18n/st.json") }
        }
    });

export default i18n;
