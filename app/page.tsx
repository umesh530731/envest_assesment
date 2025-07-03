import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import NewsSection from "./components/NewsSection";
import PortfolioInput from "./components/PortfolioInput";
import FilteredNewsSection from "./components/FilteredNewsSection";

interface Article {
  title: string;
  url: string;
  description?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Smart News + Portfolio Insights</h1>
        <PortfolioInput onSubmit={setPortfolio} />
        {loading ? (
          <div>Loading news...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <NewsSection />
            <FilteredNewsSection symbols={portfolio} articles={articles} />
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
