import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe(('App'), () => {

  it('renders title to the page', () => {
    const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = getByText(/Decaying Ketchup/i);
    expect(linkElement).toBeInTheDocument();
  })

  it('renders Login button to the page', () => {
    const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  })

  it("Should render the heading", () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
    const heading = getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it('Should populate movie cards on page load', () => {
		const { getByText, getByRole, getByPlaceholderText } = render(<BrowserRouter><App /></BrowserRouter>);

		const movieTitle = getByText('Artemis Fowl');

		expect(movieTitle).toBeInTheDocument();
	})
})

