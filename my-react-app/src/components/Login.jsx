import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from './supabaseClient';
import './Login.css';
import igLogo from '../images/iglogo.png';

function Login({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    user_handle: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.user_handle) formErrors.user_handle = 'User handle is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    try {
        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id, user_handle, password')
            .eq('user_handle', formData.user_handle)
            .single();

        if (profileError || !userProfile) {
            console.error('Profile fetch error:', profileError?.message || 'User not found');
            setErrors({ login: 'Invalid user handle or password. Please try again.' });
            return;
        }

        if (formData.password === userProfile.password) {
            setIsAuthenticated(true);
            // Store user ID in localStorage or state for use in ProfilePage
            localStorage.setItem('user_id', userProfile.id);
            navigate('/profile');
        } else {
            setErrors({ login: 'Invalid user handle or password. Please try again.' });
        }
    } catch (error) {
        console.error('Unexpected error:', error.message);
        setErrors({ login: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <div className="login-container">
      <img src={igLogo} alt='Instagram Logo' className='instagram-logo' />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {errors.login && <span className="error">{errors.login}</span>}
        <div className="input-group">
          <input
            name="user_handle"
            value={formData.user_handle}
            onChange={handleChange}
            placeholder="Username"
            className="input-field"
          />
          {errors.user_handle && <span className="error">{errors.user_handle}</span>}
        </div>
        <div className="input-group">
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-field"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="login-btn">Log In</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;