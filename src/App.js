import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import JobSearch from './components/JobSearch';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<SignupForm />} />
          <Route path="/job-search" element={<JobSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
