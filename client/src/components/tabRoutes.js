import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./DashboardTabs/Home";


class TabRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard/home" component={Home} />
        <Redirect from="/dashboard" to="/dashboard/home" />
      </Switch>
    );
  }
}

export default TabRoutes;
