import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Register from "./register";
import Recipe from "./Recipe";
import Vote from "./Vote";
import Dashboard from './Dashboard/dashboard'

const PrivateRoute = ({ component: Component, ...rest }) => {
  let loggedIn = JSON.parse(localStorage.getItem("user"));
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && loggedIn.token && loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Vote} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/recipe" component={Recipe} />
        <PrivateRoute path='/dashboard' component={Dashboard}/>
      </Switch>
    );
  }
}

export default Routes;
