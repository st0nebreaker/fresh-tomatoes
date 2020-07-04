import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ userID, title, averageRating, poster, id, userRatings }) => {
	let foundRating = null;
	if (userRatings) {
		if (userRatings.find(rating => rating.movie_id === id)) {
			foundRating = userRatings.find(rating => rating.movie_id === id).rating
		}
	}
	
	return (
		<section className='movie-card' id={id}>
			<h3>{title}</h3>
			<p className={averageRating > 5 ? 'green-rating' : 'red-rating'}>
				{foundRating ? 
					`You Rated ${foundRating}` : 
					`Average Rating ${Math.floor(averageRating)}`}/10
			</p>
			<Link to={`/movie_details/${id}`} >
				<img src={poster} alt='movie poster' />
			</Link>
			{foundRating && 
				<section className="rating-button-section">
					<button className="rating-button">Delete rating</button>
				</section>
			}
			{!foundRating && userID && 
				<section className="rating-button-section">
					<button className="rating-button">Add rating</button>
				</section>
			}
		</section>
	)
}

export default MovieCard;