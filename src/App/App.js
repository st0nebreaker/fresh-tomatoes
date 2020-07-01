import React, { Component } from 'react';
//import MovieContainer from '../MovieContainer/MovieContainer';
import './App.css';
import { Route } from 'react-router-dom';
import GuestHome from '../GuestHome/GuestHome';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			error: null
		}
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
				<Route exact path="/" render={() => <GuestHome appState={this.state}/>} />
				<Route exact path="/login" render={() => <LoginPage />} />
			</div>
		)
	}
}

export default App;
