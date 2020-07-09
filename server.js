const express = require('express');

const app = express();


app.use(express.json());

app.set('port', process.env.POST || 3001);

app.listen(app.get('port'), () => {
    console.log(`We are now listening on port ${app.get('port')}!`)
})
//app.locals.comments = [
// 	{movie_id: [		
// 		{id: 1, comment: 5828, user_name: 'Bob', data: Date.now()},
// 		{id: 1, comment: 5828, user_name: 'Bob', data: Date.now()},
// 		{id: 1, comment: 5828, user_name: 'Bob', data: Date.now()},]},
// ]
// app.locals.favorites = [
// 	{user_id: [
// 		{id: 1, movie_id: 5828},
// 		{id: 1, movie_id: 5828},
// 		{id: 1, movie_id: 5828},
// 	]},
// ]