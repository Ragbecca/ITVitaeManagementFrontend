import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

class AuthenticatedRoute extends Component {

    render() {
        let localStorageData = localStorage.getItem('itvitae-management-auth');

        let persistedState = {
            id: 0,
            username: '',
            displayName: '',
            password: '',
            role: '',
            isLoggedIn: false
        };

        if (localStorageData) {
            try {
                persistedState = JSON.parse(localStorageData);
            } catch (error) {

            }
        }

        if (persistedState.isLoggedIn) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute