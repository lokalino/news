import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Accessible News Reader',
      language: 'Language',
      save: 'Save for later',
      read: 'Read aloud',
      loading: 'Loading...'
    }
  },
  sr: {
    translation: {
      welcome: 'Pristupačni Čitač Vesti',
      language: 'Jezik',
      save: 'Sačuvaj za kasnije',
      read: 'Pročitaj naglas',
      loading: 'Učitavanje...'
    }
  },
  de: {
    translation: {
      welcome: 'Barrierefreier Nachrichtenleser',
      language: 'Sprache',
      save: 'Für später speichern',
      read: 'Laut vorlesen',
      loading: 'Lade...'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;