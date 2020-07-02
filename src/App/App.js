import React, { Component } from 'react';
//import MovieContainer from '../MovieContainer/MovieContainer';
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
			userName: null
		}
	}

	changeUserId = (givenUser) => {
		this.setState({
			userID: givenUser.id,
			userName: givenUser.userName
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

	render() {
		return (
			<div className="App">
				<Route exact path="/" render={() => <GuestHome appState={this.state} />} />
				<Route 
					exact 
					path="/login" 
					render={() => <LoginPage changeUserId={this.changeUserId} />} 
				/>
				<Route 
					exact 
					path='/users/:id' 
					render={() => <UserHome appState={this.state} />} 
				/>
			</div>
		)
	}
}

export default App;
