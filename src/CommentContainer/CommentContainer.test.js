import React from 'react';
import { postNewComment, fetchMovieComments } from "../apiCalls/apiCalls";
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentContainer from './CommentContainer';
jest.mock('../apiCalls/apiCalls');

const appState = {
	userID: 60,
	userName: 'Charlie',
	movieID: 475430,
	comments: [],
	inputComment: ''
}

describe('CommentContainer', () => {
	fetchMovieComments.mockResolvedValue({
		"475430": [
				{
						"user_id": 32,
						"comment": "This movie was awesome. I love Leo.",
						"user_name": "Dennis",
						"date": 1519211811670
				},
				{
						"user_id": 41,
						"comment": "Kept me on the edge of my seat. 98 minutes of wow.",
						"user_name": "Clark",
						"date": 1519211811670
				},
				{
						"user_id": 40,
						"comment": "Didn\t care for it",
						"user_name": "Bob",
						"date": 1519211811670
				}
		]
	});

	it('renders the comments on any given movie', async () => {
		const { getByText } = render(
			<MemoryRouter>
				<CommentContainer appState={appState} />
			</MemoryRouter>
		);
		
		const comment1 = await waitFor(() => getByText('This movie was awesome. I love Leo.'));
		const commenter1 = await waitFor(() => getByText('Dennis'));

		expect(comment1).toBeInTheDocument();
		expect(commenter1).toBeInTheDocument();
	});

	it('renders a comment form for logged in user', () => {
		const { getByText, getByPlaceholderText, getByRole } = render(
			<MemoryRouter>
				<CommentContainer appState={appState} />
			</MemoryRouter>
		);

		const inputPlaceholder = getByPlaceholderText('Write a comment...');
		const commentBtn = getByRole('button', {name: 'Post'});

		expect(inputPlaceholder).toBeInTheDocument();
		expect(commentBtn).toBeInTheDocument();

	});

	// it.skip('a new comment submitted will render to the page', async () => {
	// 	postNewComment.mockResolvedValue([
	// 		{
	// 				"user_id": 16,
	// 				"comment": "I believe in my voice, keyboard warrior",
	// 				"user_name": "Steve",
	// 				"date": 1594763731688
	// 		}
	// 	]);
	// 	const { debug, getByText, getByPlaceholderText, getByRole } = render(
	// 		<MemoryRouter>
	// 			<CommentContainer appState={appState} fetchData={jest.fn()} />
	// 		</MemoryRouter>
	// 	);

	// 	const commentInput = getByPlaceholderText('Write a comment...');
	// 	const commentBtn = getByText('Post');
	
	// 	fireEvent.change(commentInput, {target: {value: "I believe in my voice, keyboard warrior"}});
	// 	fireEvent.click(commentBtn);

	// 	const newComment = await waitFor(() => getByText("I believe in my voice, keyboard warrior"));
	// 	debug();
	// 	expect(newComment).toBeInTheDocument();
	// })
})