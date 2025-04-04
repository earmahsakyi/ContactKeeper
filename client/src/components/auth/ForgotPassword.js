import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const { setAlert } = alertContext;
    const { error, clearErrors, message, forgotPassword } = authContext;

    useEffect(() => {
        // Check if message is a string or an object
        if (typeof message === 'object' && message.message === 'Verification code sent successfully') {
            // Store email in localStorage for the reset password page
            if (message.email) {
                localStorage.setItem('resetEmail', message.email);
            } else {
                // If no email in response, store the one from the form
                localStorage.setItem('resetEmail', email);
            }
            setAlert('Verification code sent successfully', 'success');
            navigate('/reset-password');
        } else if (message === 'Verification code sent successfully') {
            // Store the email from the form
            localStorage.setItem('resetEmail', email);
            setAlert(message, 'success');
            navigate('/reset-password');
        } else if (message) {
            // Handle other string messages
            if (typeof message === 'string') {
                setAlert(message, 'info');
            }
        }

        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, message, navigate]);

    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        if (email === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            forgotPassword(email);
        }
    };

    return (
        <div className='form-container'>
            <h1>Forgot <span className='text-primary'>Password</span></h1>
            <p>
                Enter your email address and we will send you a verification code to reset your password.
            </p>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                        type='email' 
                        name='email' 
                        value={email} 
                        onChange={onChange} 
                        required 
                        placeholder="Enter your registered email"
                    />
                </div>
                <input 
                    type='submit' 
                    value='Send Code' 
                    className='btn btn-primary btn-block' 
                />
            </form>
        </div>
    );
};

export default ForgotPassword;