import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import UserMovieCard from '../UserMovieCard/UserMovieCard';
import './MovieContainer.css';

const MovieContainer = ({appState, usersRatings}) => {
	let movieCards;

	if (appState.userID) {
		movieCards = appState.movies.map((movie, i) => {
			return (
				<UserMovieCard
					title={movie.title}
					averageRating={movie.average_rating}
					poster={movie.poster_path}
					id={movie.id}
					key={i}
					usersRatings={usersRatings}
				/>
			)
		})
	} else {
		movieCards = appState.movies.map((movie, i) => {
			return (
				<MovieCard
					title={movie.title}
					averageRating={movie.average_rating}
					poster={movie.poster_path}
					id={movie.id}
					key={i}
				/>
			)
		})
	}

	return (
		<div className='movie-container'>
			{movieCards}
		</div>
	)
}

export default MovieContainer;