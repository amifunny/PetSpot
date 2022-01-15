import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import mobile from "../../img/mobile.png";
import axios from 'axios'
import classnames from 'classnames';
import "./login.css"; 
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from 'prop-types';

import {Container, Row, Col} from 'react-bootstrap'

class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
    // this.props.getCurrentProfile();
  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }
  
  componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/home');
      }
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
    }
  }
  
  render() {
    const { errors } = this.state;
    const { email, password } = this.state;
    const enabled = email.length > 0 && password.length > 0;
    return (
    <Container className='margin'>
      <Row className="justify-content-md-center py-5">
        <Col md="auto">
            <img className='mobile d-none d-xl-block d-md-block' src={mobile} />
        </Col>
        <Col md={4} className='align-items-center justify-content-center'>
          <div className='card'>
            <div className='card-body'>
              <img className='logo' src={logo} alt='petspot' />
              <br />
              <br />
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    id='myText'
                    className={classnames("form-input form-control", {
                      "is-invalid": errors.email,
                    })}
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames("form-input form-control", {
                      "is-invalid": errors.password,
                    })}
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                </div>

                <input
                  type='submit'
                  value='Log In'
                  disabled={!enabled}
                  // style={{
                  //   width: "265px",
                  //   height: "30px",
                  //   marginTop: "10px",
                  //   border: "None",
                  // }}
                  className='authButton'
                />
              </form>
              <br />
              <div>
                <hr id='one' />
                <span id='or'>OR</span>
                <hr id='two' />
              </div>
              <br />
              <p className='more-info'>
                Don't have an account? &nbsp;
                <span>
                  <Link to='/signup'>Sign up</Link>
                </span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

    );
  }
}

Login.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,  
});

export default connect(mapStateToProps, { loginUser, getCurrentProfile })(Login);