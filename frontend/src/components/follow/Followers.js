import React, { Component } from 'react';
import "./follow.css";
import { Link } from "react-router-dom";
import FollowItem from './FollowItem';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {FaTimes} from 'react-icons/fa'

class Followers extends Component {

  render() {
     const {auth} = this.props;

     if (!this.props.showFollowers) {
       return null;
     }
     const {followers, followingList} = this.props;
     let content;
     if (followers.length > 0) {
       let filterFollowers = followers.filter((follow) => follow.user !== null);
       content = filterFollowers.map((follower) => {
         if (auth.user.id === follower.user._id) {
           return (
             <FollowItem
               key={follower.id}
               follow={follower}
               followingList={followingList}
               isCurrent={true}
             />
           );
         } else {
           return (
             <FollowItem
               key={follower.id}
               follow={follower}
               followingList={followingList}
               isCurrent={false}
             />
           );
         }
       });
     }
    return (
      <div className='first'>
        <div className='second'>
          <div className='third'>
            <div className='followers-container'>
              <h5>Followers </h5>
              <span>
                <Link onClick={() => window.location.reload(true)} className='X'>
                  <FaTimes />
                </Link>
              </span>
              <hr />

              <div className='container scrolling'>
                <div
                  className='row '
                >
                  {content}
                </div>
              </div>
              {/* followers-container ends */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ 
  auth: state.auth
});

export default connect(mapStateToProps)(Followers);
