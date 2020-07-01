import React, { Component } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import './App.css';

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
				<header className="App-header">
					<h2>Decaying Ketchup</h2>
					<button>Login</button>
				</header>
				{this.state.error && <div className="error">Error: {this.state.error.message}</div>}

				<MovieContainer movies={this.state.movies} />
			</div>
		)
	}
}

export default App;
