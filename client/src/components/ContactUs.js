import React, { useState } from 'react';
import '../ContactUs.css'; // For styling

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('${apiUrl}/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          c_name: name,
          c_email: email,
          c_subject: subject,
          c_message: text,
        }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setMessageType('success');
        setMessage(result.message);
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setText('');
      } else {
        setMessageType('danger');
        setMessage(result.message || 'Something went wrong!');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage('Failed to connect to the server.');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target
  
    // Update the state dynamically based on the input name
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'subject':
        setSubject(value);
        break;
      case 'message':
        setText(value);
        break;
      default:
        break;
    }
  };
  
  return (
    <section className="contact-us-container" style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
      <div className="contact-us-content">

        <p className="contact-us-description">
          We'd love to hear from you! Fill out the form below and we’ll get back to you shortly.
        </p>
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="contact-form-input"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="contact-form-input"
          />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="contact-form-input"
          />
          <textarea
            name="message"
            value={text}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="contact-form-textarea"
          ></textarea>
          <button type="submit" className="contact-form-submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
