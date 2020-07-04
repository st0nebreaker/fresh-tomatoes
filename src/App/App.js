import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import GuestHome from '../GuestHome/GuestHome';
import UserHome from '../UserHome/UserHome';
import LoginPage from '../LoginPage/LoginPage';
import MovieDetails from '../MovieDetails/MovieDetails';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			error: null,
			userID: null,
			userName: null,
			userRatings: []
		}
	}

	changeUserId = (givenUser) => {
		this.setState({
			userID: givenUser.id,
			userName: givenUser.userName,
			userRatings: [],
		})
	}

	componentDidMount = () => {
		const getAllMovies = async () => {
			const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies');
			const data = await response.json();
			return data;
		}

		getAllMovies()
			.then(data => this.setState({movies: data.movies}))
			.catch(error => this.setState({error}));
	}

	getUsersRatings = (id) => {
		const url = `https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`;
		const getUserRatedMovies = async () => {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		}

		getUserRatedMovies()
			.then(data => this.setState({ userRatings: data.ratings }))
			.catch(error => console.log(error.message));
	}

	render() {
		return (
			<div className="App">
				<Route 
					exact 
					path="/" 
					render={() =>
						<GuestHome
							appState={this.state}
							getUsersRatings = {this.getUsersRatings} 
						/>} 
				/>
				<Route 
					exact 
					path="/login" 
					render={() =>
						<LoginPage
							changeUserId={this.changeUserId}
							getUsersRatings={this.getUsersRatings}
						/>} 
				/>
				<Route 
					exact 
					path='/users/:id' 
					render={() => 
						<UserHome 
							appState={this.state} 
							changeUserId={this.changeUserId} 
							getUsersRatings={this.getUsersRatings} 
						/>} 
				/>
				<Route
					exact
					path='/movie_details/:id'
					render={ ({ match }) => {
						const { id } = match.params;
						const movieToRender = this.state.movies.find(movie => movie.id === parseInt(id));
						return <MovieDetails appState={this.state} {...movieToRender} />
					}}
				/>
			</div>
		)
	}
}

export default App;
