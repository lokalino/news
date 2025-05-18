import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Accessible News Reader',
      language: 'Language',
      save: 'Save for later',
      read: 'Read aloud',
      loading: 'Loading news...',
      savedArticles: 'Saved Articles',
      lightMode: '🌞 Light Mode',
      darkMode: '🌙 Dark Mode',
      fontSize: 'Font Size',
      fontFamily: 'Font Family',
      category: 'Category',
      latest: 'Latest',
      business: 'Business',
      technology: 'Technology',
      sports: 'Sports',
      entertainment: 'Entertainment',
      health: 'Health',
      science: 'Science',
      layoutWidth: 'Layout Width',
      narrow: 'Narrow',
      normal: 'Normal',
      wide: 'Wide',
      showImages: 'Show Images',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop'
    }
  },
  sr: {
    translation: {
      welcome: 'Pristupačni Čitač Vesti',
      language: 'Jezik',
      save: 'Sačuvaj za kasnije',
      read: 'Pročitaj naglas',
      loading: 'Učitavanje vesti...',
      savedArticles: 'Sačuvane vesti',
      lightMode: '🌞 Svetli režim',
      darkMode: '🌙 Tamni režim',
      fontSize: 'Veličina fonta',
      fontFamily: 'Pismo',
      category: 'Tema',
      latest: 'Najnovije',
      business: 'Biznis',
      technology: 'Tehnologija',
      sports: 'Sport',
      entertainment: 'Zabava',
      health: 'Zdravlje',
      science: 'Nauka',
      layoutWidth: 'Širina',
      narrow: 'Usko',
      normal: 'Normalno',
      wide: 'Široko',
      showImages: 'Prikaži slike',
      pause: 'Pauziraj',
      resume: 'Nastavi',
      stop: 'Zaustavi'
    }
  },
  de: {
    translation: {
      welcome: 'Barrierefreier Nachrichtenleser',
      language: 'Sprache',
      save: 'Für später speichern',
      read: 'Laut vorlesen',
      loading: 'Lade...',
      savedArticles: 'Gespeicherte Artikel',
      lightMode: '🌞 Heller Modus',
      darkMode: '🌙 Dunkler Modus',
      fontSize: 'Schriftgröße',
      fontFamily: 'Schriftart',
      category: 'Kategorie',
      latest: 'Neueste',
      business: 'Wirtschaft',
      technology: 'Technologie',
      sports: 'Sport',
      entertainment: 'Unterhaltung',
      health: 'Gesundheit',
      science: 'Wissenschaft',
      layoutWidth: 'Layout-Breite',
      narrow: 'Schmal',
      normal: 'Normal',
      wide: 'Breit',
      showImages: 'Bilder anzeigen',
      pause: 'Pausieren',
      resume: 'Fortsetzen',
      stop: 'Stopp'
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
      escapeValue: false
    }
  });

export default i18n;
