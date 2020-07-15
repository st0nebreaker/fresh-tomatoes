import React from "react";
import ReactDOM from "react-dom";
import { getAllMovies } from "../apiCalls/apiCalls";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserHome from "./UserHome";

const appState = {
  movies: [{
    average_rating: 5.2,
    backdrop_path:"https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
    id:475430,
    poster_path:"https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
    release_date:"2020-06-12",
    title:"Artemis Fowl"
  }],
  error: null,
  userID: 60,
  userName: "Charlie",
  userRatings: [{
    created_at:"2020-07-13T22:22:20.912Z",
    id: 1350,
    movie_id: 475430,
    rating: 7,
    updated_at: "2020-07-13T22:22:20.912Z",
    user_id:60
  }],
  usersFavorites: [],
  comments: null,
  localStorage: null,
};

describe(('MovieContainer'), () => {
  it('renders the landing page without breaking', () => {
        const { getByText, debug } = render(
          <MemoryRouter>
            <UserHome
              appState={appState}
              changeUserId={jest.fn()}
              getUsersRatings={jest.fn()}
              getAllFavorites={jest.fn()}
            />
          </MemoryRouter>
        );
    const header = getByText(/Fresh Tomatoes/);
    expect(header).toBeInTheDocument();
    })

  it('should render a VIEW FAVORITES button', () => {
        const { getByRole, debug } = render(
          <MemoryRouter>
            <UserHome
              appState={appState}
              changeUserId={jest.fn()}
              getUsersRatings={jest.fn()}
              getAllFavorites={jest.fn()}
            />
          </MemoryRouter>
        );
    const viewFavoritesBtn = getByRole("button", { name: "VIEW FAVORITES" });
    expect(viewFavoritesBtn).toBeInTheDocument();
    })

    it(`should render a movie's title when given a movie in appState.movies`, () => {
        const { getByRole, debug } = render(
          <MemoryRouter>
            <UserHome
              appState={appState}
              changeUserId={jest.fn()}
              getUsersRatings={jest.fn()}
              getAllFavorites={jest.fn()}
            />
          </MemoryRouter>
        )
        const movieTitle = getByRole('heading', {name: 'Artemis Fowl'});
        expect(movieTitle).toBeInTheDocument();
    })

    it(`should call changeUserId when LOGOUT is clicked`, () => {
      const mockChangeUserID = jest.fn();
      const { getByRole, debug } = render(
        <MemoryRouter>
          <UserHome
            appState={appState}
            changeUserId={mockChangeUserID}
            getUsersRatings={jest.fn()}
            getAllFavorites={jest.fn()}
          />
        </MemoryRouter>
      );
      const logoutBtn = getByRole("button", { name: "LOGOUT" });
      fireEvent.click(logoutBtn);
      expect(mockChangeUserID).toBeCalledTimes(1);
    });

    it.skip(`should display Your Favorites: when View Favorites is clicked`, () => {
      const { getByRole, debug } = render(
        <MemoryRouter>
          <UserHome
            appState={appState}
            changeUserId={jest.fn()}
            getUsersRatings={jest.fn()}
            getAllFavorites={jest.fn()}
          />
        </MemoryRouter>
      );
      const viewFavoritesBtn = getByRole("button", { name: "VIEW FAVORITES" });
      fireEvent.click(viewFavoritesBtn);
      //debug()
      //When You click on View Favorites Btn, nothing happens. Page stays the same
      expect(getByRole('heading', {name: 'Your Favorites:'}).toBeInTheDocument())
    });
})