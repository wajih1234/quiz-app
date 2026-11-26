const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password ) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    if(password.length <7)  return res.status(400).json({ msg: 'password  must be at least 7 characters ' });
    
   const hashedPassword = await bcrypt.hash(password, 10);

     user = new User({ name, email, password: hashedPassword });

    await user.save();
    
    res.status(201).json({ msg: 'User registered successfully' });
    
  } catch (err) {
    res.status(500).send('Server error');
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'no user with this email' });
   if (!user.password) return res.status(400).json({ msg: 'This account uses Google login' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'password incorrect' });
     console.log('everything ok');

    const payload = { user: { id: user.id, name: user.name ,email:user.email} };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token});
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
exports.googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, name, email_verified } = ticket.getPayload();

    if (!email_verified) {
      return res.status(400).json({ msg: 'Google email not verified' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, googleId: sub });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = sub;
      await user.save();
    }

    const payload = { user: { id: user.id, name: user.name, email: user.email } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) return res.status(500).send('Server error');
      res.json({ token });
    });
  } catch (err) {
    res.status(401).json({ msg: 'Google authentication failed' });
  }
};