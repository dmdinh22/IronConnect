import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

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

// profile loading state
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

// clear profile state
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};
