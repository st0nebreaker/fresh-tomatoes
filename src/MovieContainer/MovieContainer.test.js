import React from "react";
import ReactDOM from "react-dom";
import { getAllMovies } from "../apiCalls/apiCalls";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieContainer from "./MovieContainer";


// describe(('MovieContainer'), () => {
// 	it('renders the landing page without breaking', () => {
//         const appState = {}
//         const { getByText, debug } = render(<BrowserRouter><MovieContainer { appState, getUsersRatings, getAllFavorites, favorites }/></BrowserRouter>);
//         debug()
// 		// const linkElement = getByText(/Fresh Tomatoes/);
// 		// expect(linkElement).toBeInTheDocument();
//     })
// })