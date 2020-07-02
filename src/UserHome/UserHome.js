import React, { Component } from "react";
import MovieContainer from '../MovieContainer/MovieContainer';
import { Link } from "react-router-dom";

const UserHome = ({appState}) => {

	let usersRatings = [];

	fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
	.then(res => res.json())
	.then(
		(result) => { usersRatings = result.ratings }
		)
		.catch(error => console.log(error.message))
		
		return (
			<>
				<header className="App-header">
						<h2>Decaying Ketchup</h2>
						<h3>Welcome, {appState.userName}!</h3>
				<Link to={`/login`}>
					<button>Logout</button>
				</Link>
				</header>
				{appState.error && <div className="error">Error: {appState.error.message}</div> }
				<MovieContainer appState={appState} usersRatings={usersRatings} />
			</>
	)
	
}

export default UserHome;