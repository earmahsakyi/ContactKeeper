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
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../types'

const authReducer = (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token,
                user: action.payload.user

            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true,
                message: '',
                error: null,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: action.payload.message || action.payload,
                email: action.payload.email || '',

            }
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: action.payload,
                email: '',
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}
export default authReducer;