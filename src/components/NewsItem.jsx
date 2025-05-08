import React from 'react';

const NewsItem = ({ article, language, onSave, isSaved }) => {
  const handleReadAloud = () => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${article.title || ''}. ${article.description || article.content || ''}`
    );

    const langMap = {
      en: 'en-US',
      sr: 'sr-RS',
      de: 'de-DE'
    };

    utterance.lang = langMap[language] || 'en-US';

    speechSynthesis.speak(utterance);
  };

  const handleStopReading = () => {
    speechSynthesis.cancel();
  };

  return (
    <li className="news-item">
      <h2 tabIndex="0">{article.title}</h2>
      <p tabIndex="0">{article.description || article.content}</p>
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={handleReadAloud} aria-label="Read article aloud">🔊 Read Aloud</button>
        <button onClick={handleStopReading} aria-label="Stop reading" style={{ marginLeft: '0.5rem' }}>⏹ Stop</button>
        {!isSaved && onSave && (
          <button onClick={() => onSave(article)} aria-label="Save for later" style={{ marginLeft: '0.5rem' }}>
            💾 Save
          </button>
        )}
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', marginTop: '0.5rem' }}
      >
        Read More
      </a>
    </li>
  );
};

export default NewsItem;
