import React, { Component } from "react";
import { Link } from 'react-router-dom';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.id}`)
            .then(response => response.json())
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
    }

    render() {
        return (
            <section className="movie-details" >
                <Link to={`/`} className='back-btn'> ◀ back </Link>
                <h1> {this.state.title} </h1>
                <h3> "{this.state.tagLine}" </h3>
                <img src={this.state.backDrop} alt="movie poster"/>
                <p> OVERVIEW: {this.state.overview} </p>
                <p>

                    Release Date: ${this.state.releaseDate}
                    Budget: ${this.state.budget}
                    Revenue: ${this.state.revenue}
                    Runtime: {this.state.runtime} Minutes
                    Genres: {this.state.genres}
                    Average Rating: {this.state.averageRating} /10
                </p>
            </section>
        )
    }
}

export default MovieDetails;
