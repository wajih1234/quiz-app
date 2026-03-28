const Score = require("../models/Score");
const User = require('../models/User');

// user se his  score
 exports.usergetscore=async(req,res)=>{
    const userId = req.user.id;
    try{
     const score= await Score.find({userId},'totalScore');
        res.json(score);
    }
    
   catch (err) {
    res.status(500).send('Server error');
  }

 }

 // use see the scores of all the  users
 exports.getscores=async(req,res)=>{
    try{
     const scores = await Score.find({}, 'totalScore userId')
  .populate('userId', 'name');
        res.json(scores);
    }
    
   catch (err) {
    res.status(500).send('Server error');
  }

 }