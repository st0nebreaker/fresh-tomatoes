import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import GuestHome from '../GuestHome/GuestHome';
import UserHome from '../UserHome/UserHome';
import LoginPage from '../LoginPage/LoginPage';
import MovieDetails from '../MovieDetails/MovieDetails';

class App extends Component {
	constructor() {
		super();
		const savedStateJSON = localStorage.getItem('localStorageState');
		const savedState = JSON.parse(savedStateJSON);
		this.state = {
			movies: [],
			error: null,
			userID: savedState.id || null,
			userName: savedState.userName || null,
			userRatings: []
		}
		this.getUsersRatings(savedState.id) 
	}

	changeUserId = (givenUser) => {
		this.setState({
			userID: givenUser.id,
			userName: givenUser.userName,
			userRatings: [],
		})
		console.log(this.state)
		let localStorageState = JSON.stringify(givenUser);
		localStorage.setItem('localStorageState', localStorageState);
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
					render={() => {
						if (this.state.userID){
							return <UserHome 
								appState={this.state} 
								changeUserId={this.changeUserId} 
								getUsersRatings={this.getUsersRatings} 
							/>
						} else {
							return <GuestHome
						 		appState={this.state}
								getUsersRatings={this.getUsersRatings}
							/>
						}
					} 
						
					}
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
