import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './MovieDetails.scss';

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
				<section className='movie-detail-page'>
					<header className="App-header">
						<h2 className='title'>
							<img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png' className='tomato-logo' alt='tomato logo' />
							Fresh Tomatoes
						</h2>
					</header>
					{this.state.userID && <Link to={`/`}><button className='back-btn'>◀ BACK</button></Link>}
					{!this.state.userID && <Link to={`/`}><button className='back-btn'>◀ BACK</button></Link>}
					<section className="movie-detail-container" >
							<section className='movie-img'>
								<section className='movie-titles'>
									<h1> {this.state.title} </h1>
									<p className='tagline'> "{this.state.tagLine}" </p>
								</section>
								<img src={this.state.backDrop} alt="movie poster" className='movie-backdrop' />
							</section>
							<p className='overview'>{this.state.overview} </p>
							<ul>
									<li><div className='label'><b>Release Date</b>: </div>
										<div className='value'>{this.state.releaseDate && this.state.releaseDate.replace('/', '-')}</div>
									</li>
									<li><div className='label'><b>Budget</b>: </div>
										<div className='value'>${this.state.budget && this.state.budget.toLocaleString()}</div>
									</li>
									<li><div className='label'><b>Revenue</b>: </div>
										<div className='value'>${this.state.revenue && this.state.revenue.toLocaleString()}</div>
									</li>
									<li><div className='label'><b>Runtime</b>: </div>
										<div className='value'>{this.state.runtime} minutes</div>
									</li>
									<li><div className='label'><b>Genres</b>: </div>
										<div className='value'>{this.state.genres && this.state.genres.map(genre => genre + ' ' )}</div>
									</li>
									<li><div className='label'><b>Audience Score</b>: </div>
										<div className='value'>{Math.floor(this.state.averageRating)} /10</div>
									</li>
							</ul>
					</section>
				</section>
			)
		}
    }
}

export default MovieDetails;
