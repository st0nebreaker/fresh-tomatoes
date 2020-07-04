import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './MovieDetails.css';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
						userID: this.props.appState.userID,
						error: null,
            title: null,
            releaseDate: null,
            backDrop: null,
            overview: null,
            genres: null,
            budget: null,
            revenue: null,
            runtime: null,
            tagLine: null,
            averageRating: null
        }
    }

    componentDidMount() {
			const fetchOneMovie = async () => {
				const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.id}`)
				const data = await response.json();
				return data;
			}

			fetchOneMovie()
				.then(data => {
					this.setState({
							title: data.movie.title,
							releaseDate: data.movie.release_date,
							backDrop: data.movie.backdrop_path,
							overview: data.movie.overview,
							genres: data.movie.genres,
							budget: data.movie.budget,
							revenue: data.movie.revenue,
							runtime: data.movie.runtime,
							tagLine: data.movie.tagline,
							averageRating: data.movie.average_rating
					})
				})
				.catch(error => this.setState({error}));
    }

    render() {
			if (this.state.error) {
				return (
					<div className="error-message">{this.state.error.message}</div>
				)
			} else {
					return (
							<section className="movie-details" >
									{this.state.userID && <Link to={`/users/${this.state.userID}`} className='back-btn'> ◀ back </Link>}
									{!this.state.userID && <Link to={`/`} className='back-btn'> ◀ back </Link>}
									<section className='movie-img'>
										<section className='movie-titles'>
											<h1> {this.state.title} </h1>
											<h3> "{this.state.tagLine}" </h3>
										</section>
										<img src={this.state.backDrop} alt="movie poster"/>
									</section>
									<p><b>OVERVIEW:</b> {this.state.overview} </p>
									<ul>
											<li><b>Release Date</b>: {this.state.releaseDate}</li>
											<li><b>Budget</b>: ${this.state.budget}</li>
											<li><b>Revenue</b>: ${this.state.revenue}</li>
											<li><b>Runtime</b>: {this.state.runtime} Minutes</li>
											<li><b>Genres</b>: {this.state.genres}</li>
											<li><b>Average Rating</b>: {Math.floor(this.state.averageRating)} /10</li>
									</ul>
							</section>
					)
			}
    }
}

export default MovieDetails;
