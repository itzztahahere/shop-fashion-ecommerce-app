import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Register.css'; // Ensure you import your custom styles

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessageType('danger');
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('${apiUrl}/user-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_name: name,
          u_email: email,
          u_password: password,
          u_address: address,
          u_answer: answer,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setMessageType('success');
        setMessage(result.message);
        // Reset form
        setName('');
        setEmail('');
        // setSecurityQuestion('');
        setAnswer('');
        setPassword('');
        setConfirmPassword('');
        setAddress('');
      } else {
        setMessageType('danger');
        setMessage(result.message || 'Something went wrong!');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <section className="register-container">
      <div className="register-form">
        <h2 className="register-heading">Create Your Account</h2>
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* <div className="form-field">
            <label htmlFor="securityQuestion">Security Question</label>
            <select
              id="securityQuestion"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              required
            >
              <option value="">Select a question</option>
              <option value="motherName">What is your mother's maiden name?</option>
              <option value="firstPet">What was the name of your first pet?</option>
              <option value="schoolName">What is the name of your first school?</option>
            </select>
          </div> */}

          <div className="form-field">
            <label htmlFor="answer">Security Question Answer</label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer to your selected question"
              required
            />
            <small className="hint-text">This will be used for resetting your password</small>
          </div>

          <div className="form-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="register-button">Register</button>
          </div>
        </form>
      </div>

      <div className="or-section">
        <p>Already have an account?</p>
        <a href="/login" className="login-link">Login</a>
      </div>
    </section>
  );
};

export default Register;
