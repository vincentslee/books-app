//import React, { Component } from "react";
import React from "react";
//import logo from "./logo.svg";
import "./App.css";
//import { Router } from "express";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";

function App() {
    return (
      <Router>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path="/" component = {Search} />
            <Route exact path="/saved" component = {Saved} />
            <Route component = {NoMatch} />
          </Switch>
        </div>
      </Router>
    );
}

export default App;
