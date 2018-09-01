import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register user
export const registerUser = (userData, history) => dispatch => {
    // hit api endpoint for testing - will be done in redux later
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        // set state of error object with response data
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// login - get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // save to localStorage
            const { token } = res.data;

            // set token to localStorage
            localStorage.setItem('jwtToken', token);

            // set token to Auth header
            setAuthToken(token);

            // decode token to get user data
            const decoded = jwt_decode(token);

            // set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
