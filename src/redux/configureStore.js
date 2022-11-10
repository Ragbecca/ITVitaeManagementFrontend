import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as apiCalls from '../api/apiCalls';

const configureStore = (addLogger = false) => {

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
            apiCalls.setAuthorizationHeader(persistedState);
        } catch (error) {

        }
    }

    const middleware = addLogger
        ? applyMiddleware(thunk, logger)
        : applyMiddleware(thunk);

    const store = createStore(authReducer, persistedState, middleware);

    store.subscribe(() => {
        localStorage.setItem('itvitae-management-auth', JSON.stringify(store.getState()));
        apiCalls.setAuthorizationHeader(store.getState());
    });

    return store;
};

export default configureStore;