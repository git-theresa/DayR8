import React, { useState, useEffect, Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Note from "./components/pages/Note";
import "./App.css";
import {PrivateRoute} from './util/PrivateRoute';
import API from './util/API';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      username: "",
      password: ""
    };
    this.setUser = this.setUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  setUser(data) {
    this.setState({user: data})
  }

  setUsername(data) {
    this.setState({username: data})
    console.log(this.state.username)
  }

  setPassword(data) {
    this.setState({password: data})
    console.log(this.state.password)
  }

  signup() {
    console.log(this.state.username)
    API.signup({username: this.state.username, password: this.state.password})
      .then((res) => this.setUser(res.data.username))
      .catch((err) => console.log(err));
    }

  login() {
    console.log(this.state.username)
    API.login({username: this.state.username, password: this.state.password})
      .then((res) => this.setUser(res.data.username))
      .catch((err) => console.log(err));
    }

  // Creating methods to pass props to Route components, which we are unable to do normally inside of Router. - TM
  SignInPage = (props) => {
    return (
      <SignIn 
        user={this.state.user} login={this.login} setUsername={this.setUsername} setPassword={this.setPassword}
        {...props}
      />
    );
  }
  SignUpPage = (props) => {
    return (
      <SignUp 
      user={this.state.user} signup={this.signup} setUsername={this.setUsername} setPassword={this.setPassword}
        {...props}
      />
    );
  }
  NotePage = (props) => {
    return (
      <Note 
      user={this.state.user}
      // Insert props when we need them for doing cool stuff, such as flashing welcome messages to users using their username as a prop, etc - TM
        {...props}
      />
    );
  }

  render() {
    let user
    return (
      <>
        <Router>
          <NavBar />
            <Switch>
              <Route exact path="/" component={this.SignInPage} />
              <Route exact path="/signup" component={this.SignUpPage} />
              {/* PrivateRoute sends conditional user information to decide whether to render the route or send to signup page. Sign in page default sends to infinite loop, will need to troubleshoot - TM */}
              <PrivateRoute exact user={this.state.user ? (user=this.state.user) : (user=null)} path="/note" component={this.NotePage} />
            </Switch>
          <Footer />
        </Router>

      {/* I need the below lines for testing signup/signin - TM */}

      {/* {!this.state.user ? 
        (<>
          <NavBar />
          <SignIn login={this.login} setUsername={this.setUsername} setPassword={this.setPassword} />
        </>) : (
        <>
          <NavBar />
          <Note user={this.state.user} />
        </>)} */}

      {/* {!this.state.user ? (<SignUp signup={this.signup} setUsername={this.setUsername} setPassword={this.setPassword} />) : (<Note/>)} */}
      </>
    );
  }
}

export default App;
