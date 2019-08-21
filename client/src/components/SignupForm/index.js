import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/";
//import './style.css';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
      }
    
      submitRegister(e) {}
    
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
                    name="firstname"
                    className="login-input"
                    placeholder="First Name"/>
              </div>

              <div className="input-group" >
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    className="login-input"
                    placeholder="Last Name"/>
              </div>

              <div className="input-group">
                <label htmlFor="role">Role</label>
                <input
                    type="dropdown"
                    name="role"
                    className="login-input"
                    placeholder="Role"/>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    className="login-input" 
                    placeholder="Email"/>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    className="login-input"
                    placeholder="Password"/>
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