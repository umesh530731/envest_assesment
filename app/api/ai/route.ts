import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { articles, symbols } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
  }

  // Prepare prompt for OpenAI
  const prompt = `You are a financial news analyst. For each news headline, analyze its likely impact on the following stock symbols: ${symbols.join(", ")}. For each headline, respond with one of: Positive impact, Neutral, or Negative impact, and a short reasoning.\n\nHeadlines:\n${articles.map((a: any, i: number) => `${i + 1}. ${a.title}`).join("\n")}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a financial news analyst.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.3,
      }),
    });
    const data = await response.json();
    const aiResult = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ analysis: aiResult });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze news.' }, { status: 500 });
  }
} 