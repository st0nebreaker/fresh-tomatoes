import React, { Component } from 'react';
import CommentCard from '../CommentCard/CommentCard';
import './CommentContainer.scss';
import { postNewComment, fetchMovieComments } from "../apiCalls/apiCalls";

class CommentContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      movieID: props.appState.movieID,
      comments: props.appState.comments,
      userName: props.appState.userName,
      userID: props.appState.userID,
      inputComment: '',
    }
  }

  componentDidMount = () => {
    this.fetchMovieComments();
  }

  fetchMovieComments = () => {
    fetchMovieComments(this.state.movieID)
      .then(data => this.setState({ comments: data[this.state.movieID] }))
      .catch(error => console.log(error.message));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  postComment = async (event) => {
    event.preventDefault();
    return await postNewComment(this.state.movieID, this.state.userID, this.state.inputComment, this.state.userName)
      .then((data) => this.setState({comments: data, inputComment: ''}))
      .then(() => this.fetchMovieComments)
      .catch((error) => console.log(error.message));
  }

  render () {
    let commentCards;
    if (this.state.comments.length) {
      // let sortedCards = this.state.comments.sort((a, b) => b.date - a.date);
      commentCards = this.state.comments.map((movie) => {
        return (
          <CommentCard 
            comment={movie.comment}
            userName={movie.user_name}
            date={movie.date}
          />
        )
      })
    } else { commentCards = <div className='no-comments'>No comments</div>}
  
    return (
      <div className='comment-container'>
        {this.state.userID && 
          <section className='comment-form comment-card'>
            <p className='username'>{this.state.userName}</p>
            <form className='comment-form-container'>
              <input 
                className='comment-input' 
                placeholder='Write a comment...' 
                name='inputComment'
                value={this.state.inputComment}
                onChange={(event) => this.handleChange(event)}
                required
              />
              <button 
                className='comment-btn'
                onClick={(event) => this.postComment(event)}
              >
                Post
              </button>
            </form>
          </section>
        }

        {commentCards}
      </div>
    )
  }
}

export default CommentContainer;