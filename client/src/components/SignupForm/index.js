import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from 'react-router-dom';
// import Form from "react-bootstrap/";
//import './style.css';

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      role: '',
      email: '',
      password: ''
    };
  }
  handleInputChange = event => {
    console.log('handle input change on signup: ' + event.target.name + ' ' + event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  submitRegister = event => {
    event.preventDefault();
    API.register(this.state)
      .then(res => {
        // all is good now go home
        window.location.href = '/home';
      })
      .catch(err => {
        this.setState({ error: err.message })
        window.location.href = '/authenticateFailure';
      });
  }

  render() {
    return (
      <div className="inner-container">
        <h2 align="center" className="header">
          Sign-up
            </h2>
        <div className="box">

          <div className="input-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="firstname"
              className="login-input"
              placeholder="First Name" />
          </div>

          <div className="input-group" >
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="lastname"
              className="login-input"
              placeholder="Last Name" />
          </div>

          <div className="input-group">
            <label htmlFor="role">Role</label>
            <input
              type="dropdown"
              onChange={this.handleInputChange}
              name="role"
              className="login-input"
              placeholder="Role" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="email"
              className="login-input"
              placeholder="Email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={this.handleInputChange}
              name="password"
              className="login-input"
              placeholder="Password" />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this
              .submitRegister
              .bind(this)}>Sign-up</button>
        </div>
      </div>
    );
  }
}

export default SignupForm;