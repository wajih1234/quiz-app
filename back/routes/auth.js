const express = require('express');
const router = express.Router();
const { signup,login , googleLogin} = require('../controllers/authController');
const { rateLimit } = require('express-rate-limit');


const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,                // 10 requests per IP in this window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { msg: 'Too many attempts, please try again in 15 minutes' },
});

router.post('/sign', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/google', authLimiter, googleLogin);


module.exports = router;