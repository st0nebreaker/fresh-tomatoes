import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, averageRating, poster, id }) => {
	return (
		<section className='movie-card' id={id}>
			<h3>{title}</h3>
			<p>Rating: {averageRating}/10</p>
			<img src={poster} alt='movie poster' />
		</section>
	)
}

export default MovieCard;