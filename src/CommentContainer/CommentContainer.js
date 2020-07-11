import React from 'react';
import CommentCard from '../CommentCard/CommentCard';
import './CommentContainer.scss';

const CommentContainer = ({ appState }) => {
	const commentCards = appState.comments.map((movie) => {
		return (
			<CommentCard 
				comment={movie.comment}
				userName={movie.user_name}
				date={movie.date}
			/>
		)
	})

	return (
		<div className='comment-container'>
			{appState.userID && 
				<section className='comment-form comment-card'>
					<p className='username'>{appState.userName}</p>
					<form className='comment-form-container'>
						<input className='comment-input' placeholder='Write a comment...' />
						<button className='comment-btn'>Post</button>
					</form>
				</section>
			}
			{commentCards}
		</div>
	)
}

export default CommentContainer;