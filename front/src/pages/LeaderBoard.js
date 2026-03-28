import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/board.css';
const LeaderBoard = () => {
const [scores, setScores] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const scoresPerPage = 3;
  const navigate = useNavigate();


 useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5100/logic/score/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && data.length > 0) {
         setScores(data.sort((a, b) => b.totalScore - a.totalScore));
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);
  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};
 //pagination
 const indexOfLast = currentPage * scoresPerPage;
const indexOfFirst = indexOfLast - scoresPerPage;
const currentScores = scores.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(scores.length / scoresPerPage);
  return (
    <div className='leaderboardcontainer'>
  <h1>🏆 Leaderboard</h1>
  {currentScores.map((score, index) => (
    <div   key={score._id} className='score-row'>
      <span>{indexOfFirst + index + 1}</span>
      <span>{score.userId?.name}</span>
      <span>{score.totalScore} pts</span>
    </div>
  ))}
  <button className='btn-logout' onClick={handleLogout}>Logout</button>
<div className='pagination'>
  {Array.from({ length: totalPages }, (_, i) => (
    <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
  ))}
</div>
</div>


  )
}

export default LeaderBoard