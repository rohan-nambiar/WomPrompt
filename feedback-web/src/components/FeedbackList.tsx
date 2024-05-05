import React from 'react';
import { Feedback } from '../models/feedback';
import './FeedbackList.css';

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<Props> = ({ feedbacks }) => {
  if (feedbacks.length === 0) {
    return <p className="no-feedback">No feedback submitted yet.</p>;
  }

  return (
    <div className="feedback-container">
      <h2>All Feedbacks</h2>
      <div>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <p className="name">{feedback.name}</p>
            <p className="email">{feedback.email}</p>
            <p>{feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
