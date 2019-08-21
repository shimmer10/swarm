import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/Nav";
import LoginScreen from "./pages/LoginScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/loginscreen" component={LoginScreen} />
        </Switch>
      </div>
    </Router>
  );
}  

export default App;
