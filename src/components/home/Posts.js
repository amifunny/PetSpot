import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { allPostsExceptCurrentUsers, getFollowingPosts } from '../../actions/postActions';
import SuggestionsBox from './SuggestionsBox';
import { Link } from 'react-router-dom';

import {Container, Row, Col} from 'react-bootstrap'
import CreatePostButton from '../displayPost/CreatePostButton'


class Posts extends Component {
  componentDidMount() {
    // this.props.allPostsExceptCurrentUsers();
    this.props.getFollowingPosts();
  }

  render() {
    const { posts, loadingPost } = this.props.post;
    let postContent;

    if (loadingPost) {
      postContent = <Spinner />;
    } else {
      if (posts.length > 0 ) {
        postContent = <PostFeed posts={posts} />;
      } else {
        postContent = (
          <div className="d-flex" style={{marginTop: "30px"}}>
            <span className='mx-auto'>
              <Link to="/explore">Follow</Link> more people to see posts<
            /span>
          </div>
        );
      }
    }

    return (
      <div className="feed">
        <Container>
          <Row className="py-5">
            <Col md={8}>
              <Row>
                <Col md={10} sm={12} style={{margin: "auto"}}>
                  <CreatePostButton />
                  {postContent}
                </Col>
              </Row>
            </Col>
            {/* Suggestions*/}
            <Col md={4}> 
              <SuggestionsBox />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { allPostsExceptCurrentUsers, getFollowingPosts })(Posts);
