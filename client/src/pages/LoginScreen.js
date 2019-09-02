import React, { Component } from 'react';
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
//import Navbar from './Component/Navbar';
// import Row from 'react-bootstrap/Row';
import Login from '../components/LoginForm';
import Signup from '../components/SignupForm';
// import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './Login.css';


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: 'Signin'
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    console.log('selected' + key);
    this.setState({ key: key });

  }

  getNav() {
    console.log("in getNav");
    console.log(sessionStorage);
    if (sessionStorage.getItem("userID") === undefined) {
     return false;
  } else {
    return true;
  }
  }

  render() {
    return (
      <div align="center">
        <div className="box-container" align="left">
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
            <Tab eventKey="Signin" title="Sign-in">
              < Login  getNav={this.getNav} />
            </Tab>
            <Tab eventKey="Signup" title="Sign-up">
              <Signup />
            </Tab>

          </Tabs>

        </div>
      </div>

    )
  }
};


export default LoginScreen;