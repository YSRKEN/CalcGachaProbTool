import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/ガチャ確率計算\/推定機/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
