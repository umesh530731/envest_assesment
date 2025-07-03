import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  url: string;
  description?: string;
}

const NewsSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError('Failed to load news.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section>
      <h2>General News</h2>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx} style={{ marginBottom: '1em' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer"><strong>{article.title}</strong></a>
            {article.description && <div>{article.description}</div>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection; 