import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsItem from "./components/NewsItem";
import "./i18n";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem("savedArticles");
    return stored ? JSON.parse(stored) : [];
  });

  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [fontSize, setFontSize] = useState(() => parseFloat(localStorage.getItem("fontSize")) || 1.2);
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem("fontFamily") || "sans-serif");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [category, setCategory] = useState(() => localStorage.getItem("category") || "top");
  const [layoutWidth, setLayoutWidth] = useState(() => localStorage.getItem("layoutWidth") || "normal");
  const [showImages, setShowImages] = useState(() => localStorage.getItem("showImages") !== "false");

  useEffect(() => localStorage.setItem("darkMode", darkMode), [darkMode]);
  useEffect(() => localStorage.setItem("fontSize", fontSize), [fontSize]);
  useEffect(() => localStorage.setItem("fontFamily", fontFamily), [fontFamily]);
  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language, i18n]);
  useEffect(() => localStorage.setItem("category", category), [category]);
  useEffect(() => localStorage.setItem("layoutWidth", layoutWidth), [layoutWidth]);
  useEffect(() => localStorage.setItem("showImages", showImages), [showImages]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://newsdata.io/api/1/news", {
          params: {
            apikey: "pub_85166fb130a0c57ffe5dbe54623f347ba5a81",
            language,
            country: "rs",
            category,
          },
        });
        setArticles(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [language, category]);

  const handleSaveArticle = (article) => {
    const alreadySaved = savedArticles.some((a) => a.title === article.title);
    if (!alreadySaved) {
      const updated = [...savedArticles, article];
      setSavedArticles(updated);
      localStorage.setItem("savedArticles", JSON.stringify(updated));
    }
  };

  return (
    <div
      className={`container ${darkMode ? "dark" : ""}`}
      data-layout={layoutWidth}
      style={{ fontSize: `${fontSize}rem`, fontFamily }}
    >
      <header className="toolbar">
        <h1 tabIndex="0">{t("welcome")}</h1>
        <div className="controls">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? t("lightMode") : t("darkMode")}
          </button>

          <label>
            {t("fontSize")}:
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
            {t("fontFamily")}:
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </label>

          <label>
            {t("language")}:
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="sr">Srpski</option>
              <option value="de">Deutsch</option>
            </select>
          </label>

          <label>
            {t("category")}:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="top">{t("latest")}</option>
              <option value="business">{t("business")}</option>
              <option value="technology">{t("technology")}</option>
              <option value="sports">{t("sports")}</option>
              <option value="entertainment">{t("entertainment")}</option>
              <option value="health">{t("health")}</option>
              <option value="science">{t("science")}</option>
            </select>
          </label>

          <label>
            {t("layoutWidth")}:
            <select value={layoutWidth} onChange={(e) => setLayoutWidth(e.target.value)}>
              <option value="narrow">{t("narrow")}</option>
              <option value="normal">{t("normal")}</option>
              <option value="wide">{t("wide")}</option>
            </select>
          </label>

          <label>
            {t("showImages")}:
            <input type="checkbox" checked={showImages} onChange={() => setShowImages(!showImages)} />
          </label>
        </div>
      </header>

      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <>
          <ul className="news-list">
            {articles.map((article, index) => (
              <NewsItem
                key={index}
                article={article}
                language={language}
                showImages={showImages}
                onSave={handleSaveArticle}
              />
            ))}
          </ul>

          {savedArticles.length > 0 && (
            <>
              <h2>{t("savedArticles")}</h2>
              <ul className="news-list">
                {savedArticles.map((article, index) => (
                  <NewsItem
                    key={`saved-${index}`}
                    article={article}
                    language={language}
                    showImages={showImages}
                    onSave={() => {}}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;