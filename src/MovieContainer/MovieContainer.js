import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieContainer.css';

const MovieContainer = ({appState}) => {
	let movieCards;

	movieCards = appState.movies.map((movie, i) => {
		return (
			<MovieCard
				title={movie.title}
				averageRating={movie.average_rating}
				poster={movie.poster_path}
				id={movie.id}
				userRatings={appState.userRatings}
				key={i}
			/>
		)
	})

	return (
		<div className='movie-container'>
			{movieCards}
		</div>
	)
}

export default MovieContainer;