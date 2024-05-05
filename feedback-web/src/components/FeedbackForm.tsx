import React, { useState } from 'react';
import axios from 'axios';
import { Feedback } from '../models/feedback';
import './FeedbackForm.css';

interface Props {
    addFeedback: (feedback: Feedback) => void;
}

const FeedbackForm: React.FC<Props> = ({ addFeedback }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFeedback: Feedback = { name, email, feedback: feedbackText };
    setSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/feedback', newFeedback);
      addFeedback(response.data);
      setName('');
      setEmail('');
      setFeedbackText('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert(`Failed to submit feedback: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Feedback Form</h2>
      {submitted && <div className="success-message">Feedback submitted successfully!</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Feedback'}</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
