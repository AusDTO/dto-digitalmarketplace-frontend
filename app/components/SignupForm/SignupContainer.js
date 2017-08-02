import React from 'react'
import { BrowserRouter as Router, withRouter, Switch, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import NotFound from '../shared/NotFound';

const DummyCreateUserPage = () => (
  <div>
    will replace this with real CreateUserPage  
  </div>
)

const Routes = ({match}) => (
  <Switch>
    <Route exact path={match.url} component={SignupForm} />    
    <Route path={`${match.url}/createuser/:tokenstring`} component={DummyCreateUserPage} />  
    <Route component={NotFound}/>
  </Switch>  
)

export default withRouter(Routes);