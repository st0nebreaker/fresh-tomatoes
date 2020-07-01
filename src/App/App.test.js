import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
describe(('App'), () => {
  it('renders title to the page', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Decaying Ketchup/i);
    expect(linkElement).toBeInTheDocument();
  })
  it('renders Login button to the page', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  })
})

