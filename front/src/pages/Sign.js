import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sign.css';

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSign = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) return;

    try {
      const response = await fetch('http://localhost:5100/logic/auth/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail('');
        setName('');
        setPassword('');
        navigate('/login');
      } else {
        setErrorMsg(data.msg);
      }

    } catch (error) {
      console.error('Sign error:', error);
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='signcontainer'>
      <h1>Welcome</h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='but' onClick={handleSign}>Sign up</button>
      <p className='signin-link'>
      Already have an account? <a href='/login'>Login</a>
    </p>
    </div>
  );
};

export default Sign;