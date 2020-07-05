import React from 'react';
import MovieContainer from '../MovieContainer/MovieContainer';
import {Link} from 'react-router-dom';
import './GuestHome.css';

const GuestHome = ({ appState }) => {
    return (
			<>
				<header className="App-header">
					<h2 className='title'>
					<img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png' className='tomato-logo' alt='tomato logo' />
					Fresh Tomatoes
					</h2>
				<Link to={`/login`}>
					<button className='login-btn'>LOGIN</button>
				</Link>
				</header>
				{appState.error && <div className="error">Error: {appState.error.message}</div> }
				<MovieContainer appState={appState} />
			</>
    )
}

export default GuestHome;