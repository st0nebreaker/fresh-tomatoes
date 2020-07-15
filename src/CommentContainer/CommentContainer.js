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
      inputComment: ''
    };
  }

  componentDidMount = () => {
    this.fetchMovieComments();
  }

  fetchMovieComments = async () => {
    try {
      const data = await fetchMovieComments(this.state.movieID);
      this.setState({comments: data[this.state.movieID]});
    } catch (error){
      console.log(error);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  postComment = async (event) => {
    event.preventDefault();
    try {
      const receivedComments = await postNewComment(this.state.movieID, this.state.userID, this.state.inputComment, this.state.userName);
      this.setState({comments: receivedComments, inputComment: ''});
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    let commentCards;
    if (this.state.comments.length) {
      commentCards = this.state.comments.map((movie) => {
        return (
          <CommentCard 
            comment={movie.comment}
            userName={movie.user_name}
            date={movie.date}
            key={movie.date}
          />
        );
      });
    } else { commentCards = <div className='no-comments'>No comments</div>; }
  
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
    );
  }
}

export default CommentContainer;