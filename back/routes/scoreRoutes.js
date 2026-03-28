const express = require('express');
const router = express.Router();
const {  usergetscore,getscores} = require('../controllers/score');
const auth=require('../middleware/auth');

router.get('/currentuser',auth,usergetscore);
router.get('/all',auth,getscores);

module.exports=router;