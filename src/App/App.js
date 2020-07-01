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
		fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movie')
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
		if (this.state.error) {
			return <div className="error">Error: {this.state.error.message}</div>
		} else {
			return (
				<div className="App">
					<header className="App-header">
						<h2>Decaying Ketchup</h2>
						<button>Login</button>
					</header>
					<MovieContainer movies={this.state.movies} />
				</div>
			)
		}
	}
}

export default App;
