import React, { Component } from "react";
import MovieContainer from '../MovieContainer/MovieContainer';
import { Link } from "react-router-dom";
import './UserHome.scss';

const UserHome = ({ appState, changeUserId, getUsersRatings, getAllFavorites, favorites}) => {
	return (
    <>
      <header className="App-header">
        <h1 className="title">
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/tomato-1640383-1391081.png"
            className="tomato-logo"
            alt="tomato logo"
          />
          Fresh Tomatoes
        </h1>
        <p className="welcome">
          Welcome, {appState.userName}!
          <Link to={`/`}>
            <button
              onClick={() => changeUserId({ id: null, userName: null })}
              className="logout-btn"
            >
              LOGOUT
            </button>
          </Link>
        </p>
        <div className="favorites">
          {!favorites && <Link to={`/favorites`}>
            <button className="view-favorites">
              View Favorites
            </button>
          </Link>}
          {favorites && <Link to={`/`}>
            <button className="view-favorites">
              View All
            </button>
          </Link>}
        </div>
      </header>
      {appState.error && (
        <div className="error">Error: {appState.error.message}</div>
      )}
      <MovieContainer
        appState={appState}
        getUsersRatings={getUsersRatings}
        getAllFavorites={getAllFavorites}
        favorites={favorites}
      />
    </>
  );
	
}
export default UserHome;