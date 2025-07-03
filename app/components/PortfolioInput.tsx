import React, { useState } from 'react';

interface PortfolioInputProps {
  onSubmit: (symbols: string[]) => void;
}

const PortfolioInput: React.FC<PortfolioInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const symbols = input
      .split(',')
      .map(s => s.trim().toUpperCase())
      .filter(Boolean);
    onSubmit(symbols);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1em' }}>
      <label>
        Enter your stock symbols (comma-separated):
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. TCS, INFY, RELIANCE"
          style={{ marginLeft: '0.5em', width: '300px' }}
        />
      </label>
      <button type="submit" style={{ marginLeft: '1em' }}>Link Portfolio</button>
    </form>
  );
};

export default PortfolioInput; 