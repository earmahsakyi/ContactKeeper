import React, { useContext } from 'react';
import {  Navigate } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    return isAuthenticated || loading ? (
        <Element {...rest} />
    ) : (
        <Navigate to='/login' />
    );
}

export default PrivateRoute
