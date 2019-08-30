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
import "./App.css";

class App extends Component {
    state = {
        isLoggedIn: false,
        role: 'developer'
    }
componentDidMount() {
  console.log("trying..." + sessionStorage);
}
    getNav() {
      console.log(this.state.role);
      if (this.state.role === 'developer') {
        console.log("got in here");
       return <NavDeveloper />
      }
    }

    
  render() {  
  return (
    <Router>
      <div>
        <NavBar>{this.getNav()}</NavBar> 
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
}
};
export default App;
