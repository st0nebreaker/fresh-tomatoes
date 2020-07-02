import React from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import {Link} from 'react-router-dom';

const GuestHome = ({ appState }) => {
    return (
			<>
				<header className="App-header">
						<h2>Decaying Ketchup</h2>
				<Link to={`/login`}>
					<button>Login</button>
				</Link>
				</header>
				{appState.error && <div className="error">Error: {appState.error.message}</div> }
				<MovieContainer appState={appState} />
			</>
    )
}

export default GuestHome;