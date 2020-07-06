import React, { Component } from 'react';
import './App.scss';
import { withRouter, Route } from 'react-router-dom';
import GuestHome from '../GuestHome/GuestHome';
import UserHome from '../UserHome/UserHome';
import LoginPage from '../LoginPage/LoginPage';
import MovieDetails from '../MovieDetails/MovieDetails';
import { getAllMovies, getUserRatedMovies } from '../apiCalls/apiCalls';

class App extends Component {
	constructor() {
		super();
		
		let savedState = JSON.parse(localStorage.getItem('localStorageState'));
		this.state = {
			movies: [],
			error: null,
			userID: savedState.id || null,
			userName: savedState.userName || null,
			savedState: savedState || null,
			userRatings: []
		}
		if (this.savedState) this.getUsersRatings(this.savedState.id);
	}
	
	changeUserId = (givenUser) => {
		this.setState({
			userID: givenUser.id,
			userName: givenUser.userName,
			userRatings: [],
		})
		let localStorageState = JSON.stringify(givenUser);
		localStorage.setItem('localStorageState', localStorageState);
	}
	
	componentDidMount = () => {
		getAllMovies()
			.then(data => this.setState({movies: data.movies}))
			.catch(error => this.setState({error}));

		if (this.state.savedState && this.state.userID) {
			this.props.history.push(`/users/${this.state.userID}`);
		} else if (!this.state.userID) {
			this.props.history.push('/');
		}
	}

	getUsersRatings = (id) => {
		const url = `https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`;

		getUserRatedMovies(url)
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
							getUsersRatings={this.getUsersRatings} 
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
				{this.state.savedState && <Route 
					exact 
					path='/users/:id' 
					render={() =>
						<UserHome 
							appState={this.state} 
							changeUserId={this.changeUserId} 
							getUsersRatings={this.getUsersRatings} 
						/>}
				/>}
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

export default withRouter(App);
