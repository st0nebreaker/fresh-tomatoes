export const getAllMovies = async () => {
	const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies');
	const data = await response.json();
	return data;
}

export const getUserRatedMovies = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

export const verifyLogin = async (givenEmail, givenPassword) => {
	const request = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email: givenEmail,
			password: givenPassword
		})
	}

		const response = await fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", request);
		const data = await response.json();
		return data;
}