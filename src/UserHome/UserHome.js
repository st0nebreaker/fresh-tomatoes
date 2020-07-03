import React, { Component } from "react";
import MovieContainer from '../MovieContainer/MovieContainer';
import { Link } from "react-router-dom";

const UserHome = ({ appState, getUsersRatings}) => {
	getUsersRatings(appState.userID);

	return (
		<>
			<header className="App-header">
				<h2>Decaying Ketchup</h2>
				<h3>Welcome, {appState.userName}!</h3>
			<Link to={`/`}>
				<button>Logout</button>
			</Link>
			</header>
			{appState.error && <div className="error">Error: {appState.error.message}</div> }
			<MovieContainer appState={appState} />
		</>
	)
	
}
export default UserHome;