import axios from 'axios';

export const signup = (user) => {
    return axios.post('/create-user', user);
}

export const login = (user) => {
    return axios.post('/login', {}, { auth: user });
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
            username + ':' + password
        )}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};