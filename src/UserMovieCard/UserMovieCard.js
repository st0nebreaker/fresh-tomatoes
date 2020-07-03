import React from 'react';
// import './MovieCard.css';

const UserMovieCard = ({ title, averageRating, poster, id, key, userRatings }) => {
	let foundRating = null;
	if (userRatings.find(rating => rating.movie_id === id)) {
		foundRating = userRatings.find(rating => rating.movie_id === id).rating
	}
	return (
		<section className='movie-card' id={id}>
			<h3>{title}</h3>
			<p>Rating: {`${foundRating}`}/10</p>
			<img src={poster} alt='movie poster' />
			<button>Add rating</button>
			<button>Edit rating</button>
		</section>
	)
}

export default UserMovieCard;