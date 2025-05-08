import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsItem from './components/NewsItem';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Učitavanje podešavanja iz localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseFloat(localStorage.getItem('fontSize')) || 1.2;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Sačuvaj u localStorage svaki put kad se podešavanja promene
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Dohvati vesti iz API-ja kad se promeni jezik
  useEffect(() => {
    setLoading(true);
    axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: 'pub_85166fb130a0c57ffe5dbe54623f347ba5a81',
        language,
        country: 'rs',
        category: 'top'
      }
    })
    .then(res => {
      setArticles(res.data.results || []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [language]);

  return (
    <div
      className={`container ${darkMode ? 'dark' : ''}`}
      style={{ fontSize: `${fontSize}rem` }}
    >
      <header className="toolbar">
        <h1 tabIndex="0">Accessible News Reader</h1>

        <div className="controls">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>

          <label>
            🔠 Font Size:
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
            />
          </label>

          <label>
            🌍 Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="en">English</option>
              <option value="sr">Srpski</option>
              <option value="de">Deutsch</option>
            </select>
          </label>
        </div>
      </header>

      {loading ? <p>Loading...</p> : (
        <ul className="news-list">
          {articles.map((article, index) => (
            <NewsItem key={index} article={article} language={language} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
