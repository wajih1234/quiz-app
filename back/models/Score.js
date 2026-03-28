const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
  totalScore:{type:Number,default:0} ,
  answers: [
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    wasCorrect: { type: Boolean }
  }
]
},{ timestamps: true }
);

module.exports = mongoose.model('Score', ScoreSchema);