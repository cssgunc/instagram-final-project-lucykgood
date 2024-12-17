import React, { useState } from 'react';
import supabase from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import igLogo from '../images/iglogo.png';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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
    if (!formData.first_name) formErrors.first_name = 'First name is required';
    if (!formData.last_name) formErrors.last_name = 'Last name is required';
    if (!formData.user_handle) formErrors.user_handle = 'User handle is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const { error: insertError } = await supabase.from('profiles').insert([
          {
            first_name: formData.first_name,
            last_name: formData.last_name,
            user_handle: formData.user_handle,
            password: formData.password,
          },
        ]);

        if (insertError) {
          console.error('Signup error:', insertError.message);
          setErrors({ signup: insertError.message });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        setErrors({ signup: 'An unexpected error occurred. Please try again.' });
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="signup-container">
      <img src={igLogo} alt='Instagram Logo' className='instagram-logo' />
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        {errors.signup && <span className="error">{errors.signup}</span>}
        <div className="input-group">
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="input-field"
          />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
        </div>
        <div className="input-group">
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="input-field"
          />
          {errors.last_name && <span className="error">{errors.last_name}</span>}
        </div>
        <div className="input-group">
          <input
            name="user_handle"
            value={formData.user_handle}
            onChange={handleChange}
            placeholder="User Handle"
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
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <div className='back-to-login'>
        <p>Already have an account? <Link to="/login" className='login-link'>Back to Log In</Link></p>
      </div>
    </div>
  );
}

export default Signup;