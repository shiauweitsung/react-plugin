import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';
import en from './en.json';
import tw from './tw.json';

const resource = {
  en: {
    translation: en
  },
  tw: {
    translation: tw
  }
};

i18n
  .use(detector) // detected local language
  .use(backend) // lazy load
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resource,
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;
