import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { connect } from "react-redux";
import { getSuggestionList } from "../../actions/profileActions";
import Comments from "./Comments";
import AddComment from "./AddComment";
import Moment from "react-moment";
import { addLikePosts, removeLikePosts } from "../../actions/postActions";
import { savePosts, unsavePosts } from "../../actions/postActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import {FaRegHeart, FaHeart, FaBookmark, FaRegBookmark, FaRegCommentDots} from 'react-icons/fa'
import {Container, Row, Col} from 'react-bootstrap'

class PostItem extends Component {
  
  render() {
    const { post, loadingPost } = this.props;
    let comments = post.comments.filter(comment => comment.user !== null)
    
    let alreadyLiked = false;
    if (post.likes !== undefined) {
      if (
        post.likes.filter((like) => like.user === this.props.auth.user.id)
          .length > 0
      ) {
        alreadyLiked = true;
      }
    }
    let alreadySaved = false;
    if (post.saved !== undefined) {
      if (
        post.saved.filter((save) => save.user === this.props.auth.user.id)
          .length > 0
      ) {
        alreadySaved = true;
      }
    }
 
    const icons = (
      <div className="icons-div">
        {alreadyLiked === true ? (
          <div type='button' className='icons-post'>
            <FaHeart
              onClick={() => {
                this.props.removeLikePosts(post._id);
              }}
              style={{ fontSize: "1.5em", color: "red" }}
              aria-hidden='true'
            />
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.addLikePosts(post._id)}
            className='icons-post'
          >
            <FaRegHeart
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            />
          </div>
        )}
        <div type='button' className='icons-post'>
          <FaRegCommentDots
            style={{ fontSize: "1.5em" }}
            aria-hidden='true'
          />
        </div>
        {alreadySaved === true ? (
          <div type='button' className='icons-post'>
            <FaBookmark
              onClick={() => {
                this.props.unsavePosts(post._id);
              }}
              style={{ fontSize: "1.5em", color: "gold" }}
              aria-hidden='true'
            />
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.savePosts(post._id)}
            className='icons-post'
          >
            <FaRegBookmark
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            />
          </div>
        )}
      </div>
    );
    let content;
    if (loadingPost) {
      content = <Spinner />;
    } else {
      content = (
          <Row>
          <Col>
            <div
              className='post-card'
              style={{
                borderColor: "#D3D3D3",
                position: "relative",
              }}
            >
              <div
                //  className='card-header'
                // style={{ position: "relative" }}
              >
                <Link to={`/profile/${post.handle}`}>
                  <img className='avatar-icon' src={post.user.avatar} alt='Avatar' />
                </Link>
                <Link
                  to={`/profile/${post.handle}`}
                  className='name-of-account'
                >
                  {post.name}
                </Link>

                {/* <hr
                         style={{
                           marginBottom: "10px",
                         }}
                       /> */}
                <Link to={`/post/${post._id}`}>
                  {" "}
                  <img
                    className='card-img-top'
                    style={{
                      borderTop: "1px solid rgba(var(--b6a,219,219,219)",
                      marginTop: "20px",
                      borderRadius: "0",
                      height: "500px",
                      objectFit: "cover"
                    }}
                    src={post.image}
                  />{" "}
                </Link>

                {/*  post description & comments on post */}
                <div
                  // className='comment-wrapper'
                  style={{
                    // border: "0.8px solid rgb(211, 211, 211)",
                    borderTop: "transparent",
                  }}
                >
                  <div className='row'>
                    <section id='icons'>
                      {/* Show like, save icons */}
                      {icons}

                      <div className='textStyle-date'>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "1.4em",
                            color: "black",
                            marginLeft: "10px",
                          }}
                        >
                          {post.likes && post.likes.length} Likes
                        </div>
                      </div>
                    </section>
                    {/* <!-- post description start--> */}
                    <div className=' col-lg-10'>
                      <div id='col-space'>
                        <Link
                          className='handlename-post'
                          to={`/profile/${post.handle}`}
                        >
                          {post.name}
                        </Link>
                        <span className='textStyle-comment'>
                          &nbsp; {post.text}
                        </span>
                      </div>
                    </div>
                    {/* <!-- post description end--> */}
                    {/* comments on post */}

                    <Comments
                      comments={comments}
                      postId={post._id}
                      showAvatar={true}
                      showDelete={true}
                    />
                    <Moment format="D MMM YYYY" style={{paddingLeft: "25px", color: "grey", fontSize: "0.8rem"}}>{post.date}</Moment>
                  </div>
                  <hr />

                  <AddComment postId={post._id} />
                </div>
              </div>
            </div>

            
          </Col>
        </Row>
      );
    }
    return <div>{content}</div>;
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getSuggestionList,
  addLikePosts,
  removeLikePosts,
  savePosts,
  unsavePosts,
})(PostItem);
