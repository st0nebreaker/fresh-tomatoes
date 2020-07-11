const rootUrl = "https://rancid-tomatillos.herokuapp.com/api/v2/";

export const getAllMovies = async () => {
  const response = await fetch(`${rootUrl}movies`);
  const data = await response.json();
  return data;
};

export const getUserRatedMovies = async (id) => {
  const url = `${rootUrl}users/${id}/ratings`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const verifyLogin = async (givenEmail, givenPassword) => {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: givenEmail,
      password: givenPassword,
    }),
  };

  const response = await fetch(`${rootUrl}/login`, request);
  const data = await response.json();
  return data;
};

export const postRating = async (rating, movieID, userID) => {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      movie_id: movieID,
      rating: rating,
    }),
  };

  const response = await fetch(`${rootUrl}users/${userID}/ratings`, request);
  const data = await response.json();
  return data;
};

export const deleteRatingApi = async (userID, movieID) => {
  const url = `${rootUrl}users/${userID}/ratings/${movieID}`;
  const response = await fetch(url, {method: "DELETE"});
  const data = await response;
  return data;
};

export const fetchOneMovie = async (givenID) => {
	const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${givenID}`)
	const data = await response.json();
	return data;
}

export const getAllFavoritesApi = async () => {
  const response = await fetch("http://localhost:3001/api/v1/favorites");
  const data = await response.json();
  return data
}

export const getAllComments = async () => {
	const response = await fetch("http://localhost:3001/api/v1/comments");
	const data = await response.json();
	return data
}

export const fetchMovieComments = async (givenID) => {
	const response = await fetch(`http://localhost:3001/api/v1/comments/${givenID}`);
	const data = await response.json();
	return data
}

