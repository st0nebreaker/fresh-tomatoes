import React, { Component } from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			error: ''
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
			.catch(error => this.setState({error: error}))
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h2>Decaying Ketchup</h2>
					{/*TODO: add logo*/}
					<button>Login</button>
				</header>
				{this.state.error && <h2>{this.state.error}</h2>}
				<MovieContainer movies={this.state.movies} />
			</div>
		);
	}
}

export default App;
