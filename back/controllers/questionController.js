const Question = require("../models/Question");
const Score = require("../models/Score");

exports.getquestions= async (req, res) => {
  try {
    const questions = await Question.find({},'question options category');
    res.json(questions);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
exports.checkAnswer = async (req, res) => {
  const { questionId, userAnswer } = req.body;
  const userId = req.user.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    console.log('User answer:', JSON.stringify(userAnswer));
    console.log('Correct answer:', JSON.stringify(question.correctAnswer));
    console.log('Match:', userAnswer == question.correctAnswer);

    const isCorrect = userAnswer == question.correctAnswer;
    const points = isCorrect ? 5 : 0;

    // Find the user's score and update it
    const score = await Score.findOneAndUpdate(
      { userId },
      { 
        $inc: { totalScore: points },
        $push: { answers: { question: questionId, wasCorrect: isCorrect } }
      },
      { new: true, upsert: true } 
    );

    res.json({ correct: isCorrect, points, totalScore: score.totalScore });

  } catch (err) {
    res.status(500).send('Server error');
  }
};