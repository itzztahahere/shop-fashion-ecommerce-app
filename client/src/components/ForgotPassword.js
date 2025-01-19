import React, { useState } from 'react';
import '../ForgotPassword.css'; // Ensure you import your custom styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !securityQuestion || !securityAnswer || !newPassword) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    setLoading(true); // Start the loading state
    try {
      const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          u_email: email,
          u_answer: securityAnswer,
          new_password: newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage('Password has been updated successfully');
        setErrorMessage('');
      } else {
        setErrorMessage(result.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setErrorMessage('An error occurred, please try again later');
      setSuccessMessage('');
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <section className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="security-question">Security Question</label>
            <select
              id="security-question"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              required
            >
              <option value="">Select a question</option>
              <option value="pet-name">What is your pet's name?</option>
              <option value="mother-maiden-name">What is your mother's maiden name?</option>
              <option value="first-school">What was the name of your first school?</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="security-answer">Answer</label>
            <input
              type="text"
              id="security-answer"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Answer to your security question"
              required
            />
            <span className="hint-text">The answer you provided at the time of account creation.</span>
          </div>

          <div className="form-field">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              required
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <div className="form-actions">
            <button type="submit" className="reset-button" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
