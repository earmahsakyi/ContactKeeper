import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        message: '',
        user: null,
        email: '',
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load user
    const loadUser = async () => {
        //@todo - load token into global headers
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({ type: USER_LOADED, payload: res.data });
        }
        catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    //Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);
            localStorage.setItem('token', res.data.token);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();

        }
        catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })

        }
    }

    //Login user
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);
            localStorage.setItem('token', res.data.token);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();

        }
        catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })

        }
    }
    // Forgot Password
    const forgotPassword = async (email) => {
        try{
            dispatch({type: FORGOT_PASSWORD_REQUEST});
            const res = await axios.post('/api/users/forgot-password', {email})
            
            
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: {
                    message: res.data.message,
                    email: res.data.email,// Ensure this is correctly returned from the backend
                }
            });
        }
        catch (err) {
            let errorMessage = "Something went wrong. Please try again.";
        
            if (err.response) {
                const status = err.response.status;
        
                switch (status) {
                    case 400:
                        errorMessage = "Invalid request. Please check your input.";
                        break;
                    case 401:
                        errorMessage = "Unauthorized! Please log in.";
                        break;
                    case 403:
                        errorMessage = "Access denied. You don’t have permission.";
                        break;
                    case 404:
                        errorMessage = "Requested resource not found.";
                        break;
                    case 408:
                        errorMessage = "Request timeout. Please try again.";
                        break;
                    case 429:
                        errorMessage = "Too many requests. Slow down and try again later.";
                        break;
                    case 500:
                        errorMessage = "Server error! Please try again later.";
                        break;
                    case 503:
                        errorMessage = "Service unavailable. Please try again soon.";
                        break;
                    default:
                        errorMessage = err.response.data.message || errorMessage;
                }
            } else if (err.request) {
                // No response received (network error)
                errorMessage = "Network error! Please check your internet connection.";
            } else {
                // Unknown error
                errorMessage = err.message;
            }
        
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                payload: errorMessage,
            });
        }
        


    }
    // Reset Password
    const resetPassword = async (email, token, newPassword) => {
       
        try {
            dispatch({type: RESET_PASSWORD_REQUEST})

            const res = await axios.post('/api/users/reset-password', {email, token, newPassword})

            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: res.data.message
            });
        }
        catch (err) {
            let errorMessage = "Something went wrong. Please try again.";
        
            if (err.response) {
                const status = err.response.status;
        
                switch (status) {
                    case 400:
                        errorMessage = "Invalid request. Please check your input.";
                        break;
                    case 401:
                        errorMessage = "Unauthorized! Please log in.";
                        break;
                    case 403:
                        errorMessage = "Access denied. You don’t have permission.";
                        break;
                    case 404:
                        errorMessage = "Requested resource not found.";
                        break;
                    case 408:
                        errorMessage = "Request timeout. Please try again.";
                        break;
                    case 429:
                        errorMessage = "Too many requests. Slow down and try again later.";
                        break;
                    case 500:
                        errorMessage = "Server error! Please try again later.";
                        break;
                    case 503:
                        errorMessage = "Service unavailable. Please try again soon.";
                        break;
                    default:
                        errorMessage = err.response.data.message || errorMessage;
                }
            } else if (err.request) {
                // No response received (network error)
                errorMessage = "Network error! Please check your internet connection.";
            } else {
                // Unknown error
                errorMessage = err.message;
            }
        
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: errorMessage,
            });
        }
    };



    //logout
    const logout = () => dispatch({ type: LOGOUT });

    //Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS })


    return (
        <authContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            message: state.message,
            email: state.email,
            register,
            loadUser,
            login,
            logout,
            clearErrors,
            forgotPassword,
            resetPassword,


        }}>
            {props.children}
        </authContext.Provider>
    )

}
export default AuthState;