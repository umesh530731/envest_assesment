import { NextResponse } from 'next/server';

// You can use your own NewsAPI key here, or leave blank to mock data
export async function GET() {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=10&apiKey=${NEWS_API_KEY}`;

  try {
    if (NEWS_API_KEY) {
      const res = await fetch(NEWS_API_URL);
      const data = await res.json();
      // Filter for stock/market-related news if needed
      return NextResponse.json({ articles: data.articles });
    } else {
      // Mock data if no API key
      return NextResponse.json({
        articles: [
          { title: 'Sensex surges 500 points as markets rally', url: '#', description: 'Indian stock markets saw a sharp rise today...' },
          { title: 'RBI policy update: Impact on banking stocks', url: '#', description: 'The Reserve Bank of India announced...' },
          { title: 'IT sector stocks underperform amid global cues', url: '#', description: 'IT stocks faced headwinds as global markets...' },
        ],
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news.' }, { status: 500 });
  }
} 