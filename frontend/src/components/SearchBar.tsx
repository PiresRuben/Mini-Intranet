import React, { useState } from 'react';
import { SearchBox } from '@fluentui/react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (newValue: string) => {
    setQuery(newValue);
    if (newValue.length < 2) {
      setResults([]);
      return;
    }

    try {
      const [articlesRes, usersRes] = await Promise.all([
        fetch('http://localhost:5247/api/articles'),
        fetch('http://localhost:5247/api/users'),
      ]);
      const articles = await articlesRes.json();
      const users = await usersRes.json();

      const filtered = [
        ...articles.filter((a: any) =>
          a.title.toLowerCase().includes(newValue.toLowerCase())
        ).map((a: any) => ({ type: '📰', name: a.title })),
        ...users.filter((u: any) =>
          u.name.toLowerCase().includes(newValue.toLowerCase())
        ).map((u: any) => ({ type: '👤', name: u.name })),
      ];
      setResults(filtered);
    } catch (err) {
      console.error('Erreur recherche:', err);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <SearchBox
        placeholder="Rechercher un article, un collègue..."
        onChange={(_, newValue) => handleSearch(newValue || '')}
        styles={{ root: { maxWidth: 500, margin: '0 auto' } }}
      />
      {results.length > 0 && (
        <div style={{
          maxWidth: 500, margin: '5px auto', background: 'white',
          border: '1px solid #ddd', borderRadius: 4, padding: 8
        }}>
          {results.map((r, i) => (
            <div key={i} style={{ padding: '4px 0' }}>
              {r.type} {r.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}