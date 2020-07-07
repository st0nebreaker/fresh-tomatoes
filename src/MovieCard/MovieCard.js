import React, { Component } from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import { postRating } from "../apiCalls/apiCalls"

class MovieCard extends Component {
	constructor({userID, title, averageRating, poster, id, userRatings, getUsersRatings}) {
		super()
		this.state = {
			foundRating: null,
			rating: null,
			clicked: false,
		}
		this.userID = userID
		this.title = title
		this.averageRating = averageRating;
		this.poster = poster;
		this.id = id;
		this.userRatings = userRatings;
		this.getUsersRatings = getUsersRatings;
	}

	componentDidMount = () => {
		if (this.userRatings) {
		  if (this.userRatings.find((rating) => rating.movie_id === this.id)) {
        	let foundRating = this.userRatings.find((rating) => rating.movie_id === this.id);
        	this.setState({ foundRating: foundRating.rating });
      		}
		}
	}

	handleClick = (event) => {
		event.preventDefault();
		postRating(Number(this.state.rating), this.id, this.userID);
		this.displayRatingForm();
		this.getUsersRatings(this.userID);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	displayRatingForm = () => {
		this.setState({clicked: !this.state.clicked});
	}

	render = () => {
		var className = this.state.clicked ? 'rating-form-container' : 'rating-form-container hide';
	
    return (
      <section className="movie-card-container" id={this.id}>
        <section className={className}>
          <div>
            <form className="rating-form">
              <div className="inputs">
                <label htmlFor="1">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="1"
                    name="rating"
                    value="1"
                  />
                  1
                </label>
                <label htmlFor="2">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="2"
                    name="rating"
                    value="2"
                  />
                  2
                </label>
                <label htmlFor="3">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="3"
                    name="rating"
                    value="3"
                  />
                  3
                </label>
                <label htmlFor="4">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="4"
                    name="rating"
                    value="4"
                  />
                  4
                </label>
                <label htmlFor="5">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="5"
                    name="rating"
                    value="5"
                  />
                  5
                </label>
                <label htmlFor="6">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="6"
                    name="rating"
                    value="6"
                  />
                  6
                </label>
                <label htmlFor="7">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="7"
                    name="rating"
                    value="7"
                  />
                  7
                </label>
                <label htmlFor="8">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="8"
                    name="rating"
                    value="8"
                  />
                  8
                </label>
                <label htmlFor="9">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="9"
                    name="rating"
                    value="9"
                  />
                  9
                </label>
                <label htmlFor="10">
                  <input
                    onChange={(event) => this.handleChange(event)}
                    type="radio"
                    id="10"
                    name="rating"
                    value="10"
                  />
                  10
                </label>
              </div>
              <button
                onClick={(event) => this.handleClick(event)}
                className="submit-rating-btn"
                aria-label="submit-button"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
        <section className="movie-card" id={this.id}>
          <section className="title-section">
            <h3>{this.title}</h3>
          </section>
          <section className="rating-section">
            <p>
              {this.state.foundRating ? (
                <b className="user-rating-msg">You rated {this.state.foundRating} </b>
              ) : (
                `Average Rating ${Math.floor(this.averageRating)}`
              )}
              /10
            </p>
            {this.averageRating >= 5 && (
              <img
                className="rating-img"
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png"
                alt="Tomato"
              />
            )}
            {this.averageRating < 5 && (
              <img
                className="rating-img"
                src="https://i.pinimg.com/originals/58/e0/a9/58e0a9b572353c77bb1a4b3f802f4cb8.png"
                alt="Green Paint Splatter"
              />
            )}
          </section>
          <Link to={`/movie_details/${this.id}`}>
            <img
              src={this.poster}
              alt="movie poster"
              className="movie-poster"
            />
          </Link>
          {this.state.foundRating && (
            <section className="rating-button-section">
              <button className="rating-button">Delete rating</button>
            </section>
          )}
          {!this.state.foundRating && this.userID && (
            <section className="rating-button-section">
							<button 
								className="rating-button"
								onClick={this.displayRatingForm}
							>Add rating
							</button>
            </section>
          )}
        </section>
      </section>
    );

}
};

export default MovieCard;
