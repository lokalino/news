import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NewsItem = ({ article, language, showImages, onSave }) => {
  const { t } = useTranslation();
  const [zoomed, setZoomed] = useState(false);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(`${article.title}. ${article.description}`);
    utterance.lang = language || 'en';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const pause = () => speechSynthesis.pause();
  const resume = () => speechSynthesis.resume();
  const stop = () => speechSynthesis.cancel();
  const toggleZoom = () => setZoomed(!zoomed);

  return (
    <li className="news-item">
      <h2>{article.title}</h2>

      {showImages && article.image_url && (
        <img
          src={article.image_url}
          alt=""
          onClick={toggleZoom}
          className={zoomed ? 'zoomed' : ''}
        />
      )}

      <p>{article.description}</p>

      {article.source_id && (
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          📰 {article.source_id}
        </p>
      )}

      <div className="news-actions">
        <button onClick={speak}>🔊 {t('read')}</button>
        <button onClick={pause}>⏸ Pauziraj</button>
        <button onClick={resume}>▶️ Nastavi</button>
        <button onClick={stop}>⏹ Zaustavi</button>
        <button onClick={() => onSave(article)}>💾 {t('save')}</button>
      </div>
    </li>
  );
};

export default NewsItem;
