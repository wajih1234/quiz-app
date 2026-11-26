const express= require('express');
const connectDB = require('./config/db');
const cors = require('cors')

require('dotenv').config();

connectDB();
//
const app=express();
app.set('trust proxy', 1);
app.use(express.json())
app.use(cors())  
//
const routes = require('./routes/index');
app.use('/logic', routes);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});