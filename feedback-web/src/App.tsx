import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import NavBar from './components/NavBar';
import { Feedback } from './models/feedback';
import './App.css';

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const addFeedback = (newFeedback: Feedback) => {
    setFeedbacks(prevFeedbacks => [...prevFeedbacks, newFeedback]);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('http://localhost:5000/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/feedback" element={<FeedbackForm addFeedback={addFeedback} />} />
            <Route path="/all-feedback" element={<FeedbackList feedbacks={feedbacks} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
