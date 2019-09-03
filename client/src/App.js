import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from "./pages/Home";
import NavBar from "./components/Nav";
import NavBarAdmin from "./components/NavAdmin";
import NavBarDeveloper from "./components/NavDeveloper";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";
import Main from "./pages/Main";
import LoginScreen from "./pages/LoginScreen";
import Admin from "./pages/Admin";
import Report from "./pages/Report";
import con from "./utils/const";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)

    // Bind the this context to the handler function
    this.updateWhichNav = this.updateWhichNav.bind(this);

    // Set some state
    this.state = {
      whichNav: 1,
      name: ""
    };
  }

  // pass this function to the components to tell app which nav bar to load
  updateWhichNav = navType => {
    console.log("in update which nav bjt");
    switch (navType) {
      case con.ADMIN:
        console.log("in update which nav choose admin bjt ");
        this.setState({
          whichNav: con.ADMIN,
          name: sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName")
        });
        break;
      case con.DEVELOPER:
        console.log("in update which nav choose developer bjt");
        this.setState({
          whichNav: con.DEVELOPER,
          name: sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName")
        });
        break;
      default:
      case con.NOUSER:
        console.log("in update which nav choose nouser bjt");

        this.setState({ whichNav: con.NOUSER });
        break;

    }
    console.log(this.state.whichNav);

  }

  switchOnUser = () => {
    switch (this.state.whichNav) {
      default:
      case con.NOUSER:
        return <NavBar />
      case con.ADMIN:
        return <NavBarAdmin updateWhichNav={this.updateWhichNav} devName={this.state.name} />
      case con.DEVELOPER:
        return <NavBarDeveloper updateWhichNav={this.updateWhichNav} devName={this.state.name} />
    }
  }

  render() {
    return (
      <Router>
        <div>
          {this.switchOnUser()}
          <Container id="body">
            <Switch>
              <Route exact path="/" render={() => <Main updateWhichNav={this.updateWhichNav} />} />
              <Route exact path="/home" render={() => <Home updateWhichNav={this.updateWhichNav} />} />
              <Route exact path="/loginscreen" component={LoginScreen} />
              <Route exact path="/admin" render={() => <Admin updateWhichNav={this.updateWhichNav} />} />
              <Route exact path="/report" render={() => <Report updateWhichNav={this.updateWhichNav} />} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
