import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AddUserPage from '../pages/AddUserPage';
import * as apiCalls from '../api/apiCalls';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import TopBar from '../components/TopBar';
import Dashboard from '../pages/Dashboard';
import AuthenticatedRouteManager from '../components/AuthenticatedRouteManager';

const actions = {
  postLogin: apiCalls.login,
  postSignup: apiCalls.signup
}

function App() {
  return (
    <div className='bg-blue-white d-flex flex-column h-100' id='inner-root'>
      <div className=''>
        <TopBar />
      </div>
      <div className="container-fluid px-xl-19 flex-grow-1">
        <Switch>
          <Route exact path="/" component={(props) => <LoginPage {...props} actions={actions} />} />
          <Route path="/login" exact component={(props) => <LoginPage {...props} actions={actions} />} />
          <AuthenticatedRoute path="/dashboard" exact component={Dashboard} />
          <AuthenticatedRouteManager path="/manager/create-user" exact component={(props) => <AddUserPage {...props} actions={actions} />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
