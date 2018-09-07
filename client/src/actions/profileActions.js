import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading()); //set loading state
    axios.get('/api/profile').then(response =>
        dispatch({
            type: GET_PROFILE,
            payload: response.data
        }).catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        )
    );
};

// profile loading state
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};
