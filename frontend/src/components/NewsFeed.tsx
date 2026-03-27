import React, { useState, useEffect } from 'react';
import { DocumentCard, DocumentCardTitle, DocumentCardDetails } from '@fluentui/react';

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('http://localhost:5247/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Erreur articles:', err));
  }, []);

  return (
    <div className="widget">
      <h2>Actualités</h2>
      {articles.length === 0 && <p>Chargement...</p>}
      {articles.map(article => (
        <DocumentCard key={article.id} style={{ marginBottom: 10, padding: 10 }}>
          <DocumentCardDetails>
            <DocumentCardTitle title={article.title} />
            <p style={{ margin: '5px 0', fontSize: 14, color: '#555' }}>
              {article.content}
            </p>
            <small style={{ color: '#888' }}>Par {article.author}</small>
          </DocumentCardDetails>
        </DocumentCard>
      ))}
    </div>
  );
}