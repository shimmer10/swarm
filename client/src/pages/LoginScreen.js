import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
//import Navbar from './Component/Navbar';
import Row from 'react-bootstrap/Row';
import Login from '../components/LoginForm';
import Signup from '../components/SignupForm';
import Button from 'react-bootstrap/Button';
import './Login.css';


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }

  showLogin() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showSignup() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
   

      render() {
        return (
        <div align="center">
          <div className="box-container" align="left">
            {this.state.isLoginOpen && <Login/>}
            {this.state.isRegisterOpen && <Signup/>}
          </div>

          <div className="box-controller">
            <div
              className={"controller " + (this.state.isLoginOpen
                ? "selected-controller"
                : "")}
                onClick={this
                .showLogin
                .bind(this)}>
                Sign-in
            </div>
            <div
            className={"controller " + (this.state.isRegisterOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showSignup
              .bind(this)}>
              Sign-up
            </div>

            
          </div>
         </div> 

        )
      }
    };     


export default LoginScreen;