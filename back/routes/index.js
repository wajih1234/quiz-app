const express=require('express');
const router=express.Router();
const questroutes = require('./questionRoutes');
const authRoutes = require('./auth');
const scoreRoutes =require('./scoreRoutes');


router.use('/auth', authRoutes);
router.use('/questions', questroutes);
router.use('/score',scoreRoutes);


module.exports=router;