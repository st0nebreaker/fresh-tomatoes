import React, { Component } from "react";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import { postRating, deleteRatingApi, postFavorite, removeFavorite} from "../apiCalls/apiCalls";
class MovieCard extends Component {
  constructor(props) {
    super();
    this.state = {
      foundRating: null,
      rating: null,
      clicked: false,
      error: null,
      deleted: false
    };
    this.ratingButtons = this.createRadioButtons();
  }

  componentDidMount = () => {
    this.checkForUserRating();
  }

  submitRating = async (event) => {
    event.preventDefault();
    try {
      await postRating(Number(this.state.rating), this.props.id, this.props.userID);
      await this.props.getUsersRatings(this.props.userID);
      this.checkForUserRating();
      this.displayRatingForm();
    } catch (e){
      console.log(e);
    }
  }

  checkForUserRating = () => {
    if (this.props.userRatings) {
      if (this.props.userRatings.find((rating) => rating.movie_id === this.props.id)) {
        const foundRating = this.props.userRatings.find((rating) => rating.movie_id === this.props.id);
        this.setState({ foundRating: foundRating.rating });
      } else {
        this.setState({ foundRating: null });
      }
    } 
  }
  
  deleteRating = async () => {
    const ratingToDelete = this.props.userRatings.find(userRating => userRating.movie_id === this.props.id);
    try {
      await deleteRatingApi(this.props.userID, ratingToDelete.id);
      await this.props.getUsersRatings(this.props.userID);
      this.checkForUserRating();
    } catch (e) {
      console.log(e);
    }
  }
  
  addsFavorite = async (event) => {
    try {
      const { id } = event.target;
      await postFavorite(id, this.props.userID);
      this.props.getAllFavorites();
    } catch (e) {
      console.log(e);
    }
  }
  
  deleteFavorite = async (event) => {
    try {
      const { id } = event.target;
      await removeFavorite(id, this.props.userID);
      this.props.getAllFavorites();
    } catch (e) {
      console.log(e);
    }
  }
  
  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  displayRatingForm = () => {
    this.setState({clicked: !this.state.clicked});
  }
  
  createFavoriteBtn = () => {
    const userFavorites = this.props.usersFavorites.find(favorites => favorites.user_id === this.props.userID);
    const favoriteMovieIDs = userFavorites ? userFavorites.movie_ids : [];
    const favorited = (
      <button
        className="favorited"
        id={this.props.id}
        onClick={this.deleteFavorite}
      >
        ★
      </button>
    );
    const notFavorited = (
      <button
        className="not-favorited"
        id={this.props.id}
        onClick={this.addsFavorite}
      >
        ☆
      </button>
    );
    return favoriteMovieIDs.includes(this.props.id) ? favorited : notFavorited;
  } 
  
  createRadioButtons = () => {
    const radioButtons = [];
    for (let i = 1; i <= 10; i++) {
      radioButtons.push(
        <label htmlFor={i} className="radio-btn-label">
          <input
            className="radio-button"
            onChange={(event) => this.handleInputChange(event)}
            type="radio"
            id={i}
            name="rating"
            value={i}
          />
          {i}
        </label>
      );
    }
    return radioButtons;
  }
  
  createTomatoElement = () => {
    const tomato = 
      <img
        className="rating-img"
        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png"
        alt="Tomato"
      />;
    const greenPaint = 
      <img
        className="rating-img"
        src="https://i.pinimg.com/originals/58/e0/a9/58e0a9b572353c77bb1a4b3f802f4cb8.png"
        alt="Green Paint Splatter"
      />;
    if (this.state.foundRating) return this.state.foundRating >= 5 ? tomato : greenPaint;
    return this.props.averageRating >= 5 ? tomato : greenPaint;
  }
  
  render = () => { 
    return (
      <section className="movie-card-container" id={this.props.id}>
        <section className={this.state.clicked ? 'rating-form-container' : 'rating-form-container hide'}>
          <form className="rating-form">
            <div className="exit-btn" onClick={this.displayRatingForm}>x</div>
            <div className="inputs">{this.ratingButtons}</div>
            <button
              onClick={(event) => this.submitRating(event)}
              className="submit-rating-btn"
              aria-label="submit-button"
            >
              Submit
            </button>
          </form>
        </section>
        <section className={this.props.userID ? 'movie-card' : 'movie-card shorter'} id={this.props.id}>
          <section className="title-section">
            <h3>{this.props.title}</h3>
          </section>
          <section className="rating-section">
            <p>
              {this.state.foundRating ? (
                <b className="user-rating-msg">
                  Your Score: {this.state.foundRating}
                </b>
              ) : (
                `Audience Score: ${Math.floor(this.props.averageRating)}`
              )}
              /10{" "}
            </p>
            {this.createTomatoElement()}
          </section>
          <Link to={`/movies/${this.props.id}`}>
            <img
              src={this.props.poster}
              alt="movie poster"
              className="movie-poster"
            />
          </Link>
          {this.state.foundRating && (
            <section className="rating-button-section">
              <button
                className="delete-button"
                id="delete-button"
                onClick={this.deleteRating}
              >
                Delete score
              </button>
              {this.props.userID ? this.createFavoriteBtn() : null}
            </section>
          )}
          {!this.state.foundRating && this.props.userID && (
            <section className="rating-button-section">
              <button
                className="rating-button"
                onClick={this.displayRatingForm}
              >
                Add score
              </button>
              {this.props.userID ? this.createFavoriteBtn() : null}
            </section>
          )}
        </section>
      </section>
    );
  }
}
export default MovieCard;