import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

import {FaTrash} from 'react-icons/fa';
import {Container, Row, Col} from 'react-bootstrap';

class CommentItem extends Component {
  
  onDeleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  
  render() {
    const {comment, auth, postId} = this.props;
    let deleteIcon;
    let avatar;
    avatar = (
        <Col md={2}>
          <Link to={`/profile/${comment.handle}`}>
            <img className='avatar-icon' src={comment.user.avatar} alt='Avatar'
           />
          </Link>
        </Col>
    );

    if (comment.user._id === auth.user.id)  {
      deleteIcon = (
        <Col type="button" md={2} onClick={this.onDeleteComment.bind(this, postId, comment._id)}>
          <div className='delete-post'>
            <FaTrash
              style={{
                fontSize: "1.5rem",
                float: "right",
                padding: "5px",
                marginTop: "15px",
                fontWeight: "lighter",
              }}
              className='fa fa-trash'
              aria-hidden='true'
            />
          </div>
        </Col>
      );
    }
    
    return (
      // <div className="container">
        <Row>      
        {avatar}
        <div className={`${comment.user._id === auth.user.id ? "col-md-8" : "col-md-10"}`}>
          <div id='col-space'>
            <Link to={`/profile/${comment.handle}`} className='handlename-post'>
              {comment.name}
            </Link>
            <span className='textStyle-comment'>
              &nbsp; {comment.text}
            </span>
          </div>
        </div>
        {deleteIcon}
      </Row>
      // </div>
      
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);

