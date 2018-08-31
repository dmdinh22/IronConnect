import axios from 'axios';
import { GET_ERRORS } from './types';

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
