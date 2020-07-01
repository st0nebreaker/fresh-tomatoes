import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieContainer.css';

const MovieContainer = ({movies}) => {
	console.log(movies)
	const movieCards = movies.map((movie, i) => {
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

	return (
		<div className='movie-container'>
			{movieCards}
		</div>
	)
}

export default MovieContainer;