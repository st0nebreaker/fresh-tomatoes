import React, { Component } from 'react';
import MovieContainer from './MovieContainer';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
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
				}
			)
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h2>Decaying Ketchup</h2>
					{/*TODO: add logo*/}
					<button>Login</button>
				</header>
				<MovieContainer movies={this.state.movies} />
			</div>
		);
	}
}

export default App;
