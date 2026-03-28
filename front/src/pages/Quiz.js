import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/Quiz.css';
const Quiz = () => {
const [questions, setQuestions] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);

const [score, setScore] = useState(0);
const navigate = useNavigate();
 useEffect(() => {
        const fetchquestions = async () => {
          
          try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5100/logic/questions/quiz', {
              method:'GET', 
              headers: { 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            console.log("Fetched ques data:", data);
           if (Array.isArray(data)) {
            setQuestions(data);
                } else {
               console.error(" data is not an array:", data);
               setQuestions([]); 
                    }
    
          } catch (error) {
            console.error("Error fetching:", error);
           
          } 
        };
    
        fetchquestions();
      }, []);
      const handleAnswer = async (option) => {
  const token = localStorage.getItem('token');
  const questionId = questions[currentIndex]._id;

  try {
    const response = await fetch('http://localhost:5100/logic/questions/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ questionId, userAnswer: option })
    });

    const data = await response.json();
    setScore(data.totalScore);

    if (currentIndex + 1 === questions.length) {
      navigate('/score');
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className='quizcontainer'>
  <div style={{ width: 80, height: 80 }}>
  <CircularProgressbar
    value={(currentIndex / questions.length) * 100}
    text={`${currentIndex + 1}/${questions.length}`}
    styles={buildStyles({
      textColor: '#3d8b3d',
      pathColor: '#3d8b3d',
      trailColor: '#e8f0e3'
    })}
  />
</div>
  <p>Score: {score}</p>
  <h2>{questions[currentIndex]?.question}</h2>
  {questions[currentIndex]?.options.map((option) => (
    <button onClick={() => handleAnswer(option)}>{option}</button>
  ))}
</div>
  )
}

export default Quiz;