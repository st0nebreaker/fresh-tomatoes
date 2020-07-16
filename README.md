# Fresh Tomatoes
### Contributors
- Becca Steinbrecher (GitHub: [b-stein](https://github.com/b-stein))
- Andy Tom (GitHub: [attom2](https://github.com/attom2))

## Abstract
This application is a rotten tomatoes clone. It supports user interactions through a multi-page experience.

The user has the capabilities to view all movies, select favorite movies, and view just those movies. They may view movie details such as release date and add comments to each movie.

The user may delete their score and the User Interface is updated seamlessly. 

## Learning Goals
- Reinforce React fundamentals
- Reinforce using React Router to create a multi-page user experience
- Reinforce component and asynchronous JS testing
- Work with and navigate a shared, persistent API using GET, POST, and DELETE requests

## Setup
**(1)

Clone down this repository to your local machine.

Once cloned, change into this repo's directy.

Run `npm install`.

Run `npm start`.

In your browser, navigate to `localhost:3000`.

**(2)

To enable the comment & favoriting feature on the app...

Clone down our [microserver repository](https://github.com/attom2/fresh-tomatoes-microserver) to your local machine.

--OR--

Run `git clone git@github.com:attom2/fresh-tomatoes-microserver.git`

Once cloned, change into this repo's directy.

Run `nodemon server.js`.

**(3)

View the application as a guest user, or login to experience for added functionality.

You can log in with the username: `charlie@turing.io` and password: `qwerty`.


## In Action

#### Viewing favorites and movie details
![](https://media.giphy.com/media/J3MgI9jbcc5bH9DuWr/giphy.gif)

#### Adding comments
![](https://media.giphy.com/media/PnnJn3Bq4RJlKkO2KI/giphy.gif)

#### Deleting and adding a movie rating
![](https://media.giphy.com/media/hrjgPy5yxUzPsNrO9i/giphy.gif)

#### Logging out, navigating to home from login page
![](https://media.giphy.com/media/lTdBWUuy3OBaDrOamM/giphy.gif)

#### Logging in with incorrect & correct fields
![](https://media.giphy.com/media/eiGo73mPT7cfRKWorx/giphy.gif)

### Wins
- Finishing the functionality of the project with time to spare
- Using a new technology, express, to set up interactions with node.js
- Using stateful class components to transfer data
- Adhering to RESTful design principles for routing

### Future Iterations..
- Write a more robust testing suite with more integration tests verifying user interaction.
- Finish error handling to print errors to the DOM.
- Upload microserver to heroku so data will persist 


## Technologies Used
- React & Router
- Jest & React-testing-library
- SCSS/SASS
- Fetch API

## Systems/Practices
- git/Version Control
- Project Board ([on Trello](https://trello.com/b/Wjx5Jq9x/rancid-tomatillos))
