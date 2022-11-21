import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AddManagerPage from '../pages/Manager/AddManagerPage';
import AddTeacherPage from '../pages/Manager/AddTeacherPage';
import * as apiCalls from '../api/apiCalls';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import TopBar from '../components/TopBar';
import Dashboard from '../pages/Dashboard';
import AuthenticatedRouteManager from '../components/AuthenticatedRouteManager';
import DashboardManager from '../pages/Manager/DashboardManager'
import Account from '../pages/Account';
import TeacherListPage from '../pages/Manager/TeacherListPage';
import AddStutendPage from '../pages/Manager/AddStudentPage';
import AddGroupPage from '../pages/Manager/AddGroupPage';

const actions = {
  postLogin: apiCalls.login,
  postSignupTeacher: apiCalls.signupTeacher,
  postSignupManager: apiCalls.signupManager,
  postStudent: apiCalls.createStudent,
  postGroup: apiCalls.createGroup
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
          <AuthenticatedRouteManager path="/manager/dashboard" exact component={DashboardManager} />
          <AuthenticatedRouteManager path="/manager/teachers" exact component={TeacherListPage} />
          <AuthenticatedRouteManager path="/manager/teachers/create" exact component={(props) => <AddTeacherPage {...props} actions={actions} />} />
          <AuthenticatedRouteManager path="/manager/managers/create" exact component={(props) => <AddManagerPage {...props} actions={actions} />} />
          <AuthenticatedRouteManager path="/manager/students/create" exact component={(props) => <AddStutendPage {...props} actions={actions} />} />
          <AuthenticatedRouteManager path="/manager/groups/create" exact component={(props) => <AddGroupPage {...props} actions={actions} />} />
          <AuthenticatedRoute path="/account" exact component={Account} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
