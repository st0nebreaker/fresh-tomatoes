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
		<section className='movie-card-container' id={id}>
			<section className='rating-form-container hide'>
				<div><form className='rating-form'>
					<div className='inputs'>
						<label for="1">
						<input type="radio" id="1" name="rating-action" value="1" />1</label>
						<label for="2">
						<input type="radio" id="2" name="rating-action" value="2"/>2</label>
						<label for="3">
						<input type="radio" id="3" name="rating-action" value="3"/>3</label>
						<label for="4">
						<input type="radio" id="4" name="rating-action" value="4"/>4</label>
						<label for="5">
						<input type="radio" id="5" name="rating-action" value="5"/>5</label>
						<label for="6">
						<input type="radio" id="6" name="rating-action" value="6"/>6</label>
						<label for="7">
						<input type="radio" id="7" name="rating-action" value="7"/>7</label>
						<label for="8">
						<input type="radio" id="8" name="rating-action" value="8"/>8</label>
						<label for="9">
						<input type="radio" id="9" name="rating-action" value="9"/>9</label>
						<label for="10">
						<input type="radio" id="10" name="rating-action" value="10"/>10</label>
					</div>
					<button
            className="submit-rating-btn"
            aria-label="submit-button"
          >
            Submit
          </button>
				</form></div>
			</section>
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
		</section>
	)
}

export default MovieCard;