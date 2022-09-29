import React, { Component } from 'react'
import CommentItem from './CommentItem';

class Comments extends Component {
  
  render() {
   
    let filterComments;
    if(this.props.comments) {
    filterComments = this.props.comments.filter(
      (comment) => comment.user !== null
    );
    
  
      filterComments = filterComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={this.props.postId}
          showDelete={this.props.showDelete}
        />
      ));
    }
    
    return <div>{filterComments}</div>;
  }
}

export default Comments
