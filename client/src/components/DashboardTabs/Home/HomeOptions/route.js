import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";


import Candidates from './candidate';
import NewCandidate from './newCandidate'
import CandidateDetails from './candidateDetails'
import EditCandidate from './editCandidate'


// import S from './subNav1'


class Routes extends Component {
  render() {
    return (
      <Switch>
       
        <Route exact path="/dashboard/home/candidates/new" component={NewCandidate} />
        <Route exact path="/dashboard/home/candidates/:id" component={CandidateDetails} />
        <Route exact path="/dashboard/home/candidates/edit/:id" component={EditCandidate} />
        <Route path="/dashboard/home/candidates" component={Candidates} />
        <Redirect from='/dashboard/home' to='/dashboard/home/subnav1'/>
      </Switch>
    );
  }
}

export default Routes;
