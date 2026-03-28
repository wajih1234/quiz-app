import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sign from './pages/Sign';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Scorepage from './pages/Scorepage';
import LeaderBoard from './pages/LeaderBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<Scorepage />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;