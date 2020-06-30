import React, {} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import RecommendationList from './components/RecommendationList';
import UserSummary from './components/UserSummary';

function App() {
  return (
    <div className="App">
      <Navbar />
      <UserSummary />
      <RecommendationList />
    </div>
  );
}

export default App;
