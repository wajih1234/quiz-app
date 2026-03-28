const express = require('express');
const router = express.Router();
const {getquestions, checkAnswer}=require('../controllers/questionController');
const auth =require('../middleware/auth');


router.get('/quiz',auth,getquestions);

router.post('/answer',auth,checkAnswer);

module.exports = router;