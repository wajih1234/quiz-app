import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Login.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if ( !email || !password) return;

    try {
      const response = await fetch('https://quiz-app-2lty.onrender.com/logic/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  email, password }),
      });

      const data = await response.json();
     
      if (response.ok) {
       const {token }=data;
      localStorage.setItem('token',token);
        setEmail('');
       
        setPassword('');
        navigate('/quiz');
      } else {
       console.log('error')
      }

    } catch (error) {
      
      alert('Something went wrong. Please try again.');
    }
  };
  
    const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('https://quiz-app-2lty.onrender.com/logic/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/quiz');
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='logincontainer'>
      <h1>Welcome Back</h1>
    
      <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='but1' onClick={handleLogin}>Login</button>
      <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log('Google login failed')}
/>
      
    </div>
  );
};

export default Login;