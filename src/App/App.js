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
		this.state = {
			movies: [],
			error: null,
			userID: null,
			userName: null,
			userRatings: [],
			localStorage: null
		}
	}
	
	changeUserId = (givenUser) => {
		this.setState({
			userID: givenUser.id,
			userName: givenUser.userName,
			userRatings: [],
		});
	}
	
	componentDidMount = () => {
		this.verifyLoginLocalStorage();
		getAllMovies()
		.then(data => this.setState({movies: data.movies}))
		.catch(error => this.setState({error}));
		this.changeUrl();
	}

	changeUrl = () => {
		if (this.verifyLoginLocalStorage() || this.state.userID) {
			const id = this.state.userID || this.verifyLoginLocalStorage();
			this.props.history.push(`/users/${id}`);
		} else {
			this.props.history.push('/');
		}
	}

	verifyLoginLocalStorage = () => {
		let loggedUserId = JSON.parse(localStorage.getItem('loggedInUserId'));
		let loggedUserName = JSON.parse(localStorage.getItem('loggedInUserName'));
		let loggedRatings = JSON.parse(localStorage.getItem('loggedRatings'));
		this.setState({ userID: loggedUserId, userName: loggedUserName, userRatings: loggedRatings, localStorage: true});
		return loggedUserId;
	}
	
	componentDidUpdate = () => {
		let loggedUserId = JSON.stringify(this.state.userID);
		let loggedUserName = JSON.stringify(this.state.userName);
		let loggedRatings = JSON.stringify(this.state.userRatings);

		localStorage.setItem('loggedInUserId', loggedUserId);
		localStorage.setItem('loggedInUserName', loggedUserName);
		localStorage.setItem('loggedRatings', loggedRatings);
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
				{this.state.userID && <Route 
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
