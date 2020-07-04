import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import GuestHome from '../GuestHome/GuestHome';
import UserHome from '../UserHome/UserHome';
import LoginPage from '../LoginPage/LoginPage';

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

	componentDidMount() {
		fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						movies: result.movies
					});
				},
				(error) => {
					this.setState({
						error
					})
				}
			)
	}

	getUsersRatings = (id) => {
		const url = `https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`;
		fetch(url)
		.then(res => res.json())
		.then(data => {
			this.setState({ userRatings: data.ratings })
		})
		.catch(error => console.log(error.message))
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
							getUsersRatings = {this.getUsersRatings} 
						/>} 
				/>
			</div>
		)
	}
}

export default App;
