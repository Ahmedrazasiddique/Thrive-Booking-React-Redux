import axios from '../axios-instance';
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    LOGOUT_SUCCESS
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loginUser = userData => dispatch => {
    axios.post('login', userData)
        .then( res => {
            // Save to localStorage
            const { access_token } = res.data.data;
            // Set token to ls
            localStorage.setItem('jwtToken', access_token);
            // Set token to Auth header
            setAuthToken(access_token);
            dispatch(setCurrentUser());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.data
            })
        );
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('businessId');
    // Remove auth header for future requests
    setAuthToken(false);
    dispatch({
        type: LOGOUT_SUCCESS
    });
    // Set current user to {} which will set isAuthenticated to false
    //dispatch(setCurrentUser({}));
};
