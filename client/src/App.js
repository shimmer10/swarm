import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Hometwo from "./pages/Hometwo";
import NavBar from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Main from "./pages/Main";
import LoginScreen from "./pages/LoginScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/homeTwo" component={Hometwo} />
          <Route exact path="/loginscreen" component={LoginScreen} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
