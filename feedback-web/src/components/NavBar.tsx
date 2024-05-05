import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <Link to="/feedback">Feedback</Link>
      <Link to="/all-feedback">All Feedback</Link>
    </nav>
  );
};

export default NavBar;
