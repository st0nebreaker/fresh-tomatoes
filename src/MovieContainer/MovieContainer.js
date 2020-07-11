import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Link } from 'react-router-dom'
import './MovieContainer.css';

const MovieContainer = ({ appState, getUsersRatings, getAllFavorites, favorites }) => {
  let movies, movieCards;
  const user = appState.usersFavorites.find(user => user.user_id === appState.userID)

  if(!favorites) {
    movies = appState.movies
  } else {
    movies = appState.movies.filter(movie => user.movie_ids.includes(movie.id))
  }
  
  movieCards = movies.map((movie, i) => {
      return (
        <MovieCard
          userID={appState.userID}
          title={movie.title}
          averageRating={movie.average_rating}
          poster={movie.poster_path}
          id={movie.id}
          userRatings={appState.userRatings}
          key={i}
          getUsersRatings={getUsersRatings}
          usersFavorites={appState.usersFavorites}
          getAllFavorites={getAllFavorites}
        />
      );
  })

  if(!movies.length) {
    movieCards = (
    <div className="no-favorites-container">
    <Link to={`/`}><button className='back-btn'>◀ BACK</button></Link>
    <p>You currently have no favorites</p>
    </ div>
    )
  }
  return (
    <>
      {favorites && movies.length && <h3 className="your-favorites-title">Your Favorites:</h3>}
      <div className="movie-container">{movieCards}</div>;
    </>
  );
};

export default MovieContainer;