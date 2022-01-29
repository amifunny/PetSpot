import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import Settings from "./Settings";
import Followers from "../follow/Followers";
import Following from "../follow/Following";
import { deleteAccount, getFollowingList } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import Spinner from "../common/Spinner";
import ProfilePostItem from "./ProfilePostItem";
import { getUserPosts } from "../../actions/postActions";
import ProfilePicture from "./ProfilePicture";

import { removeAvatar } from "../../actions/profileActions";

import {Container, Row, Col} from 'react-bootstrap';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showFollowers: false,
      showFollowing: false,
      change: false,
      posts: [],
      saved: false,
      postsIcon: true,
      savedIcon: false,
    };
  }
  showFollowersList = (e) => {
    this.setState({
      showFollowers: !this.state.showFollowers,
    });
  };
  showFollowingList = (e) => {
    this.setState({
      showFollowing: !this.state.showFollowing,
    });
  };
  showSettings = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };
  changeProfilePicture = (e) => {
    this.setState({
      change: !this.state.change,
    });
  };

  onDelete = (e) => {
    this.props.deleteAccount(this.props.history);
  };

  onRemove =(e) => {
    this.props.removeAvatar();
  }
  logoutUserHandle = (e) => {
    e.preventDefault();
    alert("Logging out..");
    this.props.history.push("/");
    this.props.logoutUser();
  };

  componentDidMount() {
    if (this.props.profile !== null && !this.props.loading && !this.props.loadingPost && this.props.userPosts) {
      this.setState({
        posts: this.props.userPosts,
        saved: false
      });
    }
  }

  getPosts() {
    this.setState({
      posts: this.props.userPosts,
      saved: false,
      postsIcon: true,
      savedIcon: false,
    });
  }

  getSavedPosts() {
    this.setState({
      posts: this.props.profile.saved,
      saved: true,
      postsIcon: false,
      savedIcon: true,
    });
  }
  
  render() {
    let profileContent;
    let following;
    let followers;
    const { profile, loading, followingList } = this.props;
    const { user } = this.props.auth;
    const { userPosts, loadingPost } = this.props;
    const {postsIcon, savedIcon} = this.state;
   if(profile.following.length > 0) {
     following = profile.following.filter(item => item.user !== null)
   } // filtering out deleted profiles
  if (profile.followers.length > 0) {
     followers = profile.followers.filter(item=> item.user !== null);
  }
    if (profile === null || loading || loadingPost || !userPosts) {
      profileContent = <Spinner />;
    } else {
      let savedTab;
      let addPostTab;
      if (user.id === profile.user._id) {
        addPostTab = (
          <Link to='/create-post' 
          style={{textDecoration:"none"}}
          className="profileTab">
            <i className='far fa-plus-square'>
              <span
                style={{
                  fontStyle: "normal",
                  marginLeft: "5px",
                  fontFamily: "sans-serif",
                }}
              >
                CREATE
              </span>
            </i>
          </Link>
        );
        savedTab = (
          <div type="button" onClick={this.getSavedPosts.bind(this)} className={`profileTab ${savedIcon ? "activeStyle" : ""}`}>
            <i className={`fa fa-bookmark-o ${savedIcon ? "activeTextStyle" : ""}`} aria-hidden='true' style={savedIcon ? {color: "black"}: {}}>
              <span style={{ fontStyle: "normal", marginLeft: "5px", fontFamily: "sans-serif" }}>
                SAVED
              </span>
            </i>
          </div>
        )
      }
      profileContent = (
        <Fragment>
        <div>

            {/*------------ Profile Header --------------*/}
            <Row className="justify-content-center align-items-center">

              <Col md={4}>
                <div className="d-flex justify-content-center align-items-center">
                  {user.id === profile.user._id ? (
                    <div>
                      <Link onClick={(e) => this.changeProfilePicture()}>
                        <img
                          className='profile-photo'
                          alt='profile-photo'
                          src={profile.user.avatar}
                        />
                      </Link>
                      <ProfilePicture
                        change={this.state.change}
                        close={this.changeProfilePicture}
                        remove={this.onRemove}
                      />
                    </div>
                  ) : (
                    <img
                      className='profile-photo'
                      alt='profile-photo'
                      src={profile.user.avatar}
                    />
                  )}
                </div>
              </Col>
              
              <Col  md={4}>

                <Col>
                  <div className='d-flex flex-column'>
                  <h2 className='HandleName'>
                    <Col>{profile.user.name}</Col>
                    <Col>
                    {user.id === profile.user._id && (
                      <span>
                        <Link
                          to='/edit-profile'
                          type='button'
                          className='btn profileButton'
                        >
                          Edit profile
                        </Link>
                        <Link onClick={(e) => this.showSettings()}>
                          <i
                            style={{ fontSize: "1.5rem", color: "black" }}
                            className='fas fa-cog'
                          ></i>
                        </Link>
                        <Settings
                          show={this.state.show}
                          close={this.showSettings}
                          onDelete={this.onDelete}
                          onLogout={this.logoutUserHandle}
                        />
                      </span>
                    )}
                    </Col>
                  </h2>
                  </div>
                </Col>

                <Col>
                <div className='textsize'>
                  <span>

                    {userPosts.length > 0 ? (
                      <Link to='#'>
                        <b>{userPosts.length}</b> posts
                      </Link>
                    ) : (
                      <Fragment>
                        {" "}
                        <b style={{ fontSize: "18px" }}>0</b>{" "}
                        <span style={{ fontSize: "18px" }}>posts</span>
                      </Fragment>
                    )}
                    &nbsp; &nbsp; &nbsp;&nbsp;
                    {profile.followers.length > 0 ? (
                      <Link onClick={(e) => this.showFollowersList()}>
                        <b>{followers.length}</b> followers
                      </Link>
                    ) : (
                      <Fragment>
                        <b style={{ fontSize: "18px" }}>0</b>{" "}
                        <span style={{ fontSize: "18px" }}>followers</span>
                      </Fragment>
                    )}
                    <Followers
                      showFollowers={this.state.showFollowers}
                      // followers={profile.followers}
                      followingList={followingList}
                      close={this.showFollowersList}
                      followers={followers}
                    />
                    &nbsp; &nbsp; &nbsp;
                    {profile.following.length > 0 ? (
                      <Link onClick={(e) => this.showFollowingList()}>
                        <b>{following.length}</b> following
                      </Link>
                    ) : (
                      <Fragment>
                        <b style={{ fontSize: "18px" }}>0</b>{" "}
                        <span style={{ fontSize: "18px" }}>following</span>
                      </Fragment>
                    )}
                    <Following
                      showFollowing={this.state.showFollowing}
                      // following={profile.following}
                      followingList={followingList}
                      close={this.showFollowingList}
                      following={following}
                    />
                  </span>
                </div>
              </Col>

              <Col>
                <p style={{ marginTop: "20px" }} className='profileName'>
                  {profile.handle}
                </p>
                <br />
                {profile.bio && (
                  <div
                    style={{
                      wordBreak: "break-word",
                      marginTop: "-30px",
                      fontWeight: "400",
                      fontStyle: "Roboto, Helvetica, Arial, sans-serif",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                  >
                    {profile.bio}
                  </div>
                )}
                {profile.website && (
                  <span>
                    <a
                      href={profile.website}
                      style={{ color: "rgba(var(--fe0,0,55,107),1)" }}
                    >
                      {profile.website}
                    </a>
                  </span>
                )}
              </Col>

              {/*------------ Social network Links -------------------*/}
              
              <Col>
                <span>
                  {profile.social && profile.social.facebook && (
                    <a href={profile.social.facebook}>
                      <i className='fa fa-facebook-square'></i>
                    </a>
                  )}
                  {profile.social && profile.social.youtube && (
                    <a href={profile.social.youtube}>
                      <i
                        className='fa fa-youtube-play youtube'
                        aria-hidden='true'
                      ></i>
                    </a>
                  )}
                  {profile.social && profile.social.twitter && (
                    <a href={profile.social.twitter}>
                      <i className='fa fa-twitter twitter' aria-hidden='true'></i>
                    </a>
                  )}
                </span>
              </Col>
            </Col>
            {/*</div>
          </div>*/}
          
          </Row>

        {/*------------- Tab Selection --------------*/}
          <Row className="mb-3">
            <Col>
            {/* <hr className='horizontalLine' /> */}
            <div className='profileTabs icons'>
              <div
                type='button'
                onClick={this.getPosts.bind(this)}
                className={`profileTab ${postsIcon ? "activeStyle" : ""}`}
              >
                <i
                  className='fa fa-picture-o'
                  aria-hidden='true'
                  style={postsIcon ? { color: "black" } : {}}
                >
                  <span style={{ fontStyle: "normal", marginLeft: "5px", fontFamily: "sans-serif" }}>
                    POSTS
                  </span>
                </i>
              </div>
              {addPostTab}
              {savedTab}
              
            </div>
            </Col>
          </Row>

        {/*------------- Post Tabs ---------------*/}
          <Row className="my-3">
          <Col>
          {this.state.posts.length > 0 ? (
            //  <Fragment>
            //    {userPosts.map(post => (
            //      <ProfilePostItem key={post._id} postItem={post} id={post._id} image={post.image}/>
            //    ))}
            //  </Fragment>
            <Fragment>
              <section className='row responsiveness hover-effect'>
                {/* <ProfilePostItem posts={userPosts} /> */}
                <ProfilePostItem
                  posts={this.state.posts}
                  saved={this.state.saved}
                />
              </section>
            </Fragment>
          ) : (
            <div
              className='HandleName'
              style={{ textAlign: "center", marginTop: "100px" }}
            >
              {" "}
              <div>
                <i class='fa fa-camera' aria-hidden='true'></i>
              </div>
              No Posts Yet
            </div>
          )}
          </Col>
          </Row>
        
        </div>
        </Fragment>
      );
    }
  
    return (
      <div className='py-5'>
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ 
  auth: state.auth
});

export default connect(mapStateToProps, {
  deleteAccount,
  logoutUser,
  getFollowingList,
  removeAvatar,
})(Profile);
