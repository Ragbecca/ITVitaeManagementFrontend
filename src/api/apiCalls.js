import axios from 'axios';

export const signupTeacher = (user) => {
    return axios.post('/manager/teachers/create', user);
};

export const signupManager = (user) => {
    return axios.post('/manager/managers/create', user);
};


export const login = (user) => {
    return axios.post('/login', {}, { auth: user });
};

export const createStudent = (student) => {
    return axios.post('/manager/students/create', student);
}

export const createGroup = (group) => {
    return axios.post('/manager/groups/create', group);
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

export function listTeachers() {
    return axios.get(`/teachers`);
};


export const getUser = (username) => {
    return axios.get(`/users/${username}`);
};

export const updateUser = (userId, body) => {
    return axios.put('/users/' + userId, body);
};