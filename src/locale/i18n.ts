import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from './translations';

i18n.use(initReactI18next).init({
  resources: translations,
  compatibilityJSON: 'v3',
  lng: 'uk',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;