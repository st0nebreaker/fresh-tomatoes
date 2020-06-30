import React from 'react';
// import MovieCard from './MovieCard';

const MovieContainer = ({movies}) => {
	console.log(movies)
	const movieCards = movies.map(movie => {
		return (
			<div> Hi</div>
		)
	})

	return (
		<div className='movie-container'>
			{movieCards}
		</div>
	)
}

export default MovieContainer;