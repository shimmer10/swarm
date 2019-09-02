import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from "./pages/Home";
import NavBar from "./components/NavSignIn";
import NavDeveloper from "./components/NavDeveloper";
import NavScrumMaster from "./components/NavScrumMaster";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";
import Main from "./pages/Main";
import LoginScreen from "./pages/LoginScreen";
import Admin from "./pages/Admin";
import Session from "./pages/Session";
import Report from "./pages/Report";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.getNav = this.getNav.bind(this);
    this.state = {
        isLoggedIn: false
        
    }
  };

    getNav() {
      console.log("in here: " + this.isLoggedIn);
      console.log(sessionStorage);
      if (sessionStorage.userID == undefined) {
        this.setState({isLoggedIn: false})
      } else {
      this.setState({isLoggedIn: true}); 
      } 
       
      }
    

    
  render() {  
    if (this.state.isLoggedIn == true) {
      return (
    <Router>
      <div>
        <NavDeveloper />
        <Container id="body">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/loginscreen" component={() => <LoginScreen getNav={this.props.getNav} />} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/session" component={Session} />
            <Route exact path="/report" component={Report} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
      }
  else {
    return (
      <Router>
        <div>
          <NavBar />
          <Container id="body">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/loginscreen" component={() => <LoginScreen getNav={this.getNav} />} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/session" component={Session} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
  
    );
};
};
};
export default App;
