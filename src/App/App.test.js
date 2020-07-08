import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getAllMovies } from '../apiCalls/apiCalls';

import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../apiCalls/apiCalls');

getAllMovies.mockResolvedValue(() => [
	{
			id: 475430,
			poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
			backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
			title: "Artemis Fowl",
			average_rating: 6.333333333333333,
			release_date: "2020-06-12"
	}
])

describe(('App'), () => {
	it('renders the landing page without breaking', () => {
		const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
		const linkElement = getByText(/Fresh Tomatoes/);
		expect(linkElement).toBeInTheDocument();
	})

	// it("should render a movie", async () => {
  //   const {getByText, findByText} = render(<BrowserRouter><App /></BrowserRouter>);

  //   const movieRating = await findByText('Average Rating')
  //   expect(movieRating).toBeInTheDocument();
  // });

  it('should render login button to page', () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
    const loginBtn = getByRole('button');
    expect(loginBtn).toBeInTheDocument();
  })

  it('when clicked, the login button should route to login page', () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
		const loginBtn = getByRole('button');
		fireEvent.click(loginBtn);

    expect(getByRole('link', {href: '/login'})).toBeInTheDocument();
	})
	
	// it('should fetch movies on page load', async () => {
  //   const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);

  //   // const linkeElement = await waitFor(() => getByText('Fresh Tomatoes'));
  //   // expect(linkeElement).toBeInTheDocument();

  //   const movieOne = await waitFor(() => getByText('Artemis Fowl')); 
  //   expect(movieOne).toBeInTheDocument();
    
  // });

  it("Should render the heading", () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
    const heading = getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
})

