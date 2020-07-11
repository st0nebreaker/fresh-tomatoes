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
			{commentCards}
		</div>
	)
}

export default CommentContainer;