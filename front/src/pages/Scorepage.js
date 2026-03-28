import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Score.css';

const Scorepage = () => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5100/logic/score/currentuser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setScore(data[0].totalScore);
        }
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, []);

 
  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className='scorecontainer'>
      <h1>Quiz Completed! 🎉</h1>
      <p className='score-label'>Your Score</p>
      <h2 className='score-value'>{score} pts</h2>
   
      <button className='btn-secondary' onClick={handleLeaderboard}>Leaderboard</button>
    </div>
  );
};

export default Scorepage;