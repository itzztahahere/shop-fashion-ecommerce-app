import React, { useState } from 'react';
import '../Login.css'; // Your custom styles
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../context/userAuth';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../utils/config'

const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Validate form fields
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage('');

      return;
    }

    // If no errors, simulate form submission (API integration)
    try {
      const response = await fetch(`${apiUrl}/user-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ u_email: email, u_password: password }),
      });
      const result = await response.json();

      if (response.ok) {
        setMessageType('success');
        if (result.user.u_role) {
        setMessage('Login successful!');
        // Redirect non-allowed users
      }
      else{
        setMessage('Login successful! View Dashboard here');
        navigate('/dashboard')

      }
        login(result.user);
        console.log(result.user.u_name);
        setErrors({});
      } else {
        setMessageType('danger');
        setMessage(result.message || 'Invalid email or password');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <section className="login-container">
      <div className="login-form">
        <h2 className='text-center'>Login</h2>

        {/* Bootstrap Alert */}
        {message && (
          <div className={`alert alert-${messageType} mt-3`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="form-actions">
            <button type="submit" className="login-button my-3">
              Login
            </button>
            <a href="/forgot-password" className="forgot-password text-decoration-none">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>

      <div className="or-section text-center my-3">
        <p>OR</p>
        <a href="/create-account" className="btn btn-link create-account">
          Create an Account
        </a>
      </div>
    </section>
  );
};

export default Login;
