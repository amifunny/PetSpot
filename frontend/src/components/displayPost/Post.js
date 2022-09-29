import React, { Component } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { connect } from "react-redux";
import { getPost, deletePost } from "../../actions/postActions";
import Moment from "react-moment"; 
import Spinner from "../common/Spinner";
import {addLike, removeLike, savePost, unsavePost} from "../../actions/postActions" 

import {BiArrowBack} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import {FaRegHeart, FaHeart, FaBookmark, FaRegBookmark, FaRegCommentDots} from 'react-icons/fa';
import {Container, Row, Col} from 'react-bootstrap';

class Post extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id, this.props.history);
  }

  goBack() {
    this.props.history.goBack();
  }
  onDeletePost(postId, history) {
    this.props.deletePost(postId, history);
  }

  render() {
    const {post, loadingPost} = this.props.post;
    console.log(post.user);
    const postId = this.props.match.params.id;
    
    let content;
    if (loadingPost || post === null) {
      content = <Spinner />
    } 
    if (post && post.user) {
      let deleteIcon;
    let alreadyLiked = false;
    if(post.likes !== undefined) {
    if(post.likes.filter(like => like.user === this.props.auth.user.id).length > 0)
    {
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
 
     if (post.user._id === this.props.auth.user.id) {
       deleteIcon = (
         <div
           type='button'
           className='delete-post'
           onClick={this.onDeletePost.bind(this, post._id, this.props.history)}
         >
           <FaTrash
             style={{
               fontSize: "2rem",
               float: "right",
               padding: "5px",
               marginTop: "-3px",
               fontWeight: "lighter",
             }}
             aria-hidden='true'
           />
         </div>
       );
     }
    const icons = (
      <div className="icons-div">
        {alreadyLiked === true ? (
          <div type='button' className='icons-post'>
            <FaHeart
              onClick={() => {
                this.props.removeLike(post._id);
              }}
              style={{ fontSize: "1.5em", color: "red" }}
              aria-hidden='true'
            />
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.addLike(post._id)}
            className='icons-post'
          >
            <FaRegHeart
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            />
          </div>
        )}
        {/* <div type='button' className='icons-post'>
          <FaRegCommentDots
            style={{ fontSize: "1.5em" }}
            aria-hidden='true'
          />
        </div>

        <div type='button' className='icons-post'>
          <i
            style={{ fontSize: "1.5em" }}
            className='far fa-user-circle'
            aria-hidden='true'
          ></i>
        </div> */}
        {alreadySaved === true ? (
          <div type='button' className='icons-post'>
            <FaBookmark
              onClick={() => {
                this.props.unsavePost(post._id);
              }}
              style={{ fontSize: "1.5em", color: "gold"  }}
              aria-hidden='true'
            />
          </div>
        ) : (
          <div type='button' className='icons-post'>
            <FaRegBookmark
              onnClick={() => {
                this.props.savePost(post._id);
              }}
              style={{ fontSize: "1.5em" }}
              aria-hidden='true'
            />
          </div>
        )}

        {/* delete post */}
        {deleteIcon}
      </div>
    );
    content = (
        <div className='child py-5'>
          <Row className="py-5">
            <Col>
              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <button className="px-4 py-3" onClick={this.goBack}>
                    <BiArrowBack className="mx-3" /> 
                    Back
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <div>
            <Row className="align-items-center justify-content-center">
              <Col md={5} className="d-flex justify-content-end px-0">
                <img
                  className='size-of-image'
                  src={post.image}
                />
              </Col>
              <Col md={5} className="px-0">
                {/*--------- Desktop description------------*/}
                <div className='style'>
                  <Link to={`/profile/${post.handle}`}>
                    <img className='avatar-icon' src={post.user.avatar} alt='Avatar' />
                  </Link>
                  <Link to={`/profile/${post.handle}`} className='name-of-account'>
                    {post.name}
                  </Link>
                  <hr style={{ marginBottom: "10px" }} />

                  {/*  post description & comments on post */}
                  <div>
                    <section className='row justify-content-center align-items-center'>
                      {/* <!-- post description start--> */}

                      <div className='col-lg-2'>
                        <Link to={`/profile/${post.handle}`}>
                          <img className='mt-0 avatar-icon' src={post.user.avatar} alt='Avatar' />
                        </Link>
                      </div>
                      <div className='col-lg-10'>
                        <div id='col-space'>
                          <Link className='handlename-post' to={`/profile/${post.handle}`}>
                            {post.name}
                          </Link>
                          <span className='textStyle-comment'>
                            &nbsp; {post.text}
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>
                   {/* <!-- post description end--> */}

                   {/* comments on post */}
                  <div className='comment-wrapper'>
                    <section>
                      <Comments comments={post.comments} postId={postId} 
                      // showAvatar={true}
                      />
                    </section>
                  </div>
                  
                  {/*--------- Footer ------------*/}
                  <div id='footer'>
                    <hr />
                    <section>
                      {/* Show like, save, delete icons */}
                      {icons}
                    </section>
                    <div className='post-textStyle-date'>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "1.4em",
                          color: "black",
                        }}
                      >
                        {post.likes && post.likes.length} Likes
                      </div>
                      <Moment format="D MMM YYYY">{post.date}</Moment>
                    </div>
                    <hr />
                    <AddComment postId={postId}/>
                  </div>
                
                </div>
                
            </Col>
            </Row>

          </div>
        </div>
      );
    }
  
    return (
      <div className='parent'>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, deletePost, addLike, removeLike, savePost, unsavePost })(Post);
