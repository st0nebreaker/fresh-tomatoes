import React, { Component } from "react";
import { Link } from "react-router-dom";
import './CommentCard.scss';

class CommentCard extends Component {
  constructor({comment, userName, date}) {
    super();
    this.state = {
      comment: comment,
      userName: userName,
      date: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date)
    }
  }

  render = () => {
    return (
      <section className='comment-card' id={this.state.date}>
        <section className='poster-info'>
          <p className='poster'>{this.state.userName}</p>
          <p className='date'>{this.state.date}</p>
        </section>
        <p className='comment-body'>{this.state.comment}</p>
      </section>
    )
  }
}

export default CommentCard;