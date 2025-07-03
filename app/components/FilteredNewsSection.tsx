import React, { useState } from 'react';

interface Article {
  title: string;
  url: string;
  description?: string;
}

interface FilteredNewsSectionProps {
  symbols: string[];
  articles: Article[];
}

const FilteredNewsSection: React.FC<FilteredNewsSectionProps> = ({ symbols, articles }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!symbols.length) return null;

  // Simple filter: check if any symbol appears in title or description
  const filtered = articles.filter(article =>
    symbols.some(symbol =>
      article.title.toUpperCase().includes(symbol) ||
      (article.description && article.description.toUpperCase().includes(symbol))
    )
  );

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles: filtered, symbols }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        setError('No analysis returned.');
      }
    } catch (err) {
      setError('Failed to analyze news.');
    } finally {
      setLoading(false);
    }
  };

  if (!filtered.length) {
    return <section><h2>Filtered News</h2><div>No relevant news found for your portfolio.</div></section>;
  }

  return (
    <section>
      <h2>Filtered News</h2>
      <ul>
        {filtered.map((article, idx) => (
          <li key={idx} style={{ marginBottom: '1em' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer"><strong>{article.title}</strong></a>
            {article.description && <div>{article.description}</div>}
          </li>
        ))}
      </ul>
      <button onClick={handleAnalyze} disabled={loading} style={{ marginTop: '1em' }}>
        {loading ? 'Analyzing...' : 'Analyze Impact'}
      </button>
      {analysis && (
        <div style={{ marginTop: '1em', background: '#f6f6f6', padding: '1em', borderRadius: '6px' }}>
          <strong>AI Insights:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{analysis}</pre>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '1em' }}>{error}</div>}
    </section>
  );
};

export default FilteredNewsSection; 