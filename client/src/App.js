import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Home from "./pages/Home";
import Hometwo from "./pages/Hometwo";
import NavBar from "./components/Nav";
import Footer from "./components/Footer";
import NoMatch from "./pages/NoMatch";
import Main from "./pages/Main";
import LoginScreen from "./pages/LoginScreen";
import Admin from "./pages/Admin";
import Session from "./pages/Session";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Container id="body">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/homeTwo" component={Hometwo} />
            <Route exact path="/loginscreen" component={LoginScreen} />
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

export default App;
