import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Main from "./pages/Main";
import LoginScreen from "./pages/LoginScreen";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/loginscreen" component={LoginScreen} />
          <Route exact path="/admin" component={Admin} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
