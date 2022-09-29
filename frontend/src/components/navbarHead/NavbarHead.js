import React, { Component } from "react";
import "./NavbarHead.css";
import logo from "../../img/logo.png";
import { Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Search from "../search/Search";
import spinner from "../common/spinner.gif";

import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { IoPawOutline } from 'react-icons/io5';
import { IoPawSharp } from 'react-icons/io5';

import { FaRegCompass } from 'react-icons/fa';
import { FaCompass } from 'react-icons/fa';


import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { MdPhotoLibrary } from 'react-icons/md';


export class NavbarHead extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      home: false,
      explore: false,
      gallery: false,
      avatarIcon: false,
    };
    this.logoutUserHandle = this.logoutUserHandle.bind(this);
  }

  logoutUserHandle(e) {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  }

  checkPathName(pathName) {
    if (pathName == "/home") {
      this.setState({
        home: true,
        explore: false,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/explore") {
      this.setState({
        home: false,
        explore: true,
        gallery: false,
        avatarIcon: false,
      });
    } else if (pathName == "/gallery") {
      console.log("hit gallery");
      this.setState({
        home: false,
        explore: false,
        gallery: true,
        avatarIcon: false,
      })
    } else if (pathName == "/profile" || pathName == "/current-profile") {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: true,
      })
    } else {
      this.setState({
        home: false,
        explore: false,
        gallery: false,
        avatarIcon: false,
      })
    }
  }

  componentDidMount() {
    const pathName = this.props.history.location.pathname;
    this.checkPathName(pathName);
  };
  
  componentWillReceiveProps(nextProps) {
    const pathName = nextProps.history.location.pathname;
    this.checkPathName(pathName);
  }
  
  render() {
    const {isAuthenticated, user} = this.props.auth;
    const { currentProfile } = this.props.profile;
    //Get real avatar of user from redux store
    const avatar = currentProfile ? currentProfile.user.avatar : spinner;
    const {home, explore, gallery, avatarIcon} = this.state;
    //Put all navbar contents into variable "navbar" 
    const navbar = (
      <Navbar
        expand="lg"
        className='navbar navbar-light'
        style={{ backgroundColor: "#cae1f3", padding: "0px" }}
      >
        <Container fluid className='container'>
          <Navbar.Brand className='navbar-brand' to=''>
            <img className='logo-navbar' alt='Petspot' src={logo} />
          </Navbar.Brand>

          {/* <div className='search d-none d-xl-block'>
            <span className='fa fa-search'></span>
            <input
              className='form-control form-control-sm'
              type='search'
              placeholder='Search..'
            />
          </div> */}

         <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse id="navbarScroll">
          <Nav
           className="mx-auto search-nav align-items-center justify-content-center">
            <Search/>
          </Nav>
          <Nav navbarScroll
           style={{ display:"flex", marginTop: "auto", marginBottom: "auto" }}>
            
           <Nav.Link className="mx-auto align-items-sm-center justify-content-sm-center">
            <Link to='/home' className="nav-icon">
                {!home && <IoPawOutline />}
                {home && <IoPawSharp />}
            </Link>
            
            <Link to='/explore' className="nav-icon">
              {!explore && <FaRegCompass />}
              {explore && <FaCompass />}
            </Link>

            <Link to='/gallery' className="nav-icon">
              {!gallery && <MdOutlinePhotoLibrary />}
              {gallery && <MdPhotoLibrary />}
            </Link>
          </Nav.Link>

          <Nav.Link className="mx-auto align-items-sm-center justify-content-sm-center">
            <Link to='/profile'>
              {!avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar' />}
              {avatarIcon && <img className='avatar navbarIcon' src={avatar} alt='Avatar'  style={{border: "1px solid black", padding: "1.5px"}}/>}
            </Link>
            
            <Link
              to='#'
              style={{ marginTop: "10px" }}
              onClick={this.logoutUserHandle}
            >
              <span className='navbarIcon' style={{ fontSize: "0.9em" }}>
                Log out
              </span>
            </Link>
          </Nav.Link>

          </Nav>
        </Navbar.Collapse>
        
        </Container>
      </Navbar>
    );
    return (
      <div>
        {isAuthenticated ? navbar : null}
      </div>
    );
  }
}
   
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { logoutUser })(withRouter(NavbarHead));
