import axios from 'axios';
import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER
} from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile')
        .then(response =>
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        )
        .catch(error =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};

// add meets
export const addMeets = (meetData, history) => dispatch => {
    axios
        .post('/api/profile/meets', meetData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// delete account/ profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        axios
            .delete('/api/profile')
            .then(result =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            )
            .catch(error =>
                dispatch({
                    type: GET_ERRORS,
                    payload: error.response.data
                })
            );
    }
};

// profile loading state
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// create profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        );
};

// clear profile state
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
