
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getAllMovies, getUserRatedMovies, getAllFavoritesApi } from "../apiCalls/apiCalls";

import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('../apiCalls/apiCalls');

getAllMovies.mockResolvedValue(() => {
    return { movies: [
      {
          id: 475430,
          poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
          backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
          title: "Artemis Fowl",
          average_rating: 6.333333333333333,
          release_date: "2020-06-12"
      }]
    }
  })

getUserRatedMovies.mockResolvedValue(() => {
  return {
    ratings: [
        {
            "id": 1331,
            "user_id": 60,
            "movie_id": 698783,
            "rating": 10,
            "created_at": "2020-07-13T00:20:31.257Z",
            "updated_at": "2020-07-13T00:20:31.257Z"
        }]
  }
});

getAllFavoritesApi.mockResolvedValue(() => {
  return [{
        "user_id": 60,
        "movie_ids": [
            475430,
            451184,
            554993,
            603
        ]
    }]
});

describe(('App'), () => {
	it('renders the landing page without breaking', () => {
		const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
		const linkElement = getByText(/Fresh Tomatoes/);
		expect(linkElement).toBeInTheDocument();
	})

	// it("should render a movie", async () => {
  //   const {getByText, debug} = render(<MemoryRouter><App /></MemoryRouter>);

  //   const movieRating = await waitFor(() => getByText("Artemis Fowl"));
  //   //const linkElement = getByText(/Fresh Tomatoes/);
  //   debug()
  //   expect(movieRating).toBeInTheDocument();

  // });

  it.skip('should render login button to page', () => {
    const { getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    const loginBtn = getByRole('button', {name: 'LOGIN'});
    expect(loginBtn).toBeInTheDocument();
  })

  it.skip('when clicked, the login button should route to login page', () => {
    const { getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
		const loginBtn = getByRole('button');
		fireEvent.click(loginBtn);

    expect(getByRole('link', {href: '/login'})).toBeInTheDocument();
	})
	
	// it.skip('should fetch movies on page load', async () => {
  //   const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);

  //   // const linkeElement = await waitFor(() => getByText('Fresh Tomatoes'));
  //   // expect(linkeElement).toBeInTheDocument();

  //   const movieOne = await waitFor(() => getByText('Artemis Fowl')); 
  //   expect(movieOne).toBeInTheDocument();
    
  // });

  it.skip("Should render the heading", () => {
    const { getByRole } = render(<BrowserRouter><App /></BrowserRouter>);
    const heading = getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
})

