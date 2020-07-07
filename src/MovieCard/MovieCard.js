import React from 'react';
import './MovieCard.scss';
import { Link } from 'react-router-dom';

const MovieCard = ({ userID, title, averageRating, poster, id, userRatings }) => {
	let foundRating = null;
	// console.log(userRatings)
	if (userRatings) {
		if (userRatings.find(rating => rating.movie_id === id)) {
			foundRating = userRatings.find(rating => rating.movie_id === id).rating
		}
	}
	
	return (
		<section className='movie-card' id={id}>
			<section className='title-section'>
				<h3>{title}</h3>
			</section>
			<section className="rating-section">
				<p>
					{foundRating ? 
						<b className='user-rating-msg'>You rated {foundRating} </b> : 
						`Average Rating ${Math.floor(averageRating)}`}/10
				</p>
				{averageRating >= 5 && <img className="rating-img" src= 'https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png' alt= "Tomato" />}
				{averageRating < 5 && <img className="rating-img" src= 'https://i.pinimg.com/originals/58/e0/a9/58e0a9b572353c77bb1a4b3f802f4cb8.png' alt= "Green Paint Splatter" />}
			</section>
			<Link to={`/movie_details/${id}`} >
				<img src={poster} alt='movie poster' className='movie-poster' />
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