import React from 'react';
// import './MovieCard.css';

const UserMovieCard = ({ title, averageRating, poster, id, key, usersRatings }) => {
	const foundRating = usersRatings.find(rating => rating.movie_id === id);

	return (
		<section className='movie-card' id={id}>
			<h3>{title}</h3>
			<p>Rating: {foundRating ? foundRating.rating : averageRating}/10</p>
			<img src={poster} alt='movie poster' />
			<button>Add rating</button>
			<button>Edit rating</button>
		</section>
	)
}

export default UserMovieCard;