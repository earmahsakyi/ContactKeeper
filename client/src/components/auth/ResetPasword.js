import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { setAlert } = alertContext;
    const { resetPassword, error, clearErrors, message, email } = authContext;

    useEffect(() => {
        if (message === 'Password reset successful') {
            setAlert('Password reset successful', 'success');
            localStorage.removeItem('resetEmail');
            navigate('/login');
        }

        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, navigate, message]);

    const [formData, setFormData] = useState({
        token: '',
        password: '',
        password2: ''
    });

    const { token, password, password2 } = formData;

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        
        // Get email from context or localStorage
        const userEmail = email || localStorage.getItem('resetEmail');
        
        if (!userEmail) {
            setAlert('Email not found. Please go back to forgot password page.', 'danger');
            return;
        }
        
        if (token === '' || password === '' || password2 === '') {
            setAlert('Please fill in all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            resetPassword(userEmail, token, password);
        }
    };

    return (
        <div className='form-container'>
            <h1>Reset <span className='text-primary'>Password</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='token'>Verification Code</label>
                    <input 
                        type='text' 
                        name='token' 
                        value={token} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter the 6-digit code from your email"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>New Password</label>
                    <input 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={onChange} 
                        required 
                        minLength='6'
                        placeholder="Enter new password (min 6 characters)" 
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input 
                        type='password' 
                        name='password2' 
                        value={password2} 
                        onChange={onChange} 
                        required 
                        minLength='6'
                        placeholder="Confirm your new password" 
                    />
                </div>
                <input 
                    type='submit' 
                    value='Reset Password' 
                    className='btn btn-primary btn-block' 
                />
            </form>
        </div>
    );
};

export default ResetPassword;