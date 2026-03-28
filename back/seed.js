require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Question = require('./models/Question');

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
    category: "HTML"
  },
  {
    question: "Which HTML tag is used to link an external CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    correctAnswer: "<link>",
    category: "HTML"
  },
  {
    question: "Which CSS property controls the space inside an element?",
    options: ["margin", "spacing", "padding", "border"],
    correctAnswer: "padding",
    category: "CSS"
  },
  {
    question: "What does 'position: absolute' mean in CSS?",
    options: ["Relative to viewport", "Relative to nearest positioned ancestor", "Fixed to screen", "Relative to body only"],
    correctAnswer: "Relative to nearest positioned ancestor",
    category: "CSS"
  },
  {
    question: "What is a closure in JavaScript?",
    options: ["A function with no return value", "A loop that closes itself", "A function that remembers its outer scope", "A way to close the browser"],
    correctAnswer: "A function that remembers its outer scope",
    category: "JavaScript"
  },
  {
    question: "What does '===' do in JavaScript?",
    options: ["Compares value only", "Assigns a value", "Compares value and type", "Checks if variable exists"],
    correctAnswer: "Compares value and type",
    category: "JavaScript"
  },
  {
    question: "What is the output of: typeof null?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: "'object'",
    category: "JavaScript"
  },
  {
    question: "What does 'async/await' help with in JavaScript?",
    options: ["Styling elements", "Writing synchronous loops", "Handling promises more cleanly", "Declaring variables"],
    correctAnswer: "Handling promises more cleanly",
    category: "JavaScript"
  },
  {
    question: "What does 'git merge' do?",
    options: ["Deletes a branch", "Creates a new branch", "Combines two branches", "Pushes to remote"],
    correctAnswer: "Combines two branches",
    category: "Git"
  },
  {
    question: "What is the difference between 'git pull' and 'git fetch'?",
    options: ["They are the same", "fetch downloads + merges, pull only downloads", "pull downloads + merges, fetch only downloads", "pull deletes remote changes"],
    correctAnswer: "pull downloads + merges, fetch only downloads",
    category: "Git"
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Queue Logic", "System Quality Layer", "Stored Query List"],
    correctAnswer: "Structured Query Language",
    category: "Database"
  },
  {
    question: "What is the difference between SQL and NoSQL?",
    options: ["SQL is faster always", "NoSQL uses tables, SQL uses documents", "SQL uses tables, NoSQL uses flexible documents", "They are the same"],
    correctAnswer: "SQL uses tables, NoSQL uses flexible documents",
    category: "Database"
  },
  {
    question: "What does O(n) mean in Big O notation?",
    options: ["Constant time", "Quadratic time", "Linear time", "Logarithmic time"],
    correctAnswer: "Linear time",
    category: "Algorithm"
  },
  {
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble sort", "Merge sort", "Selection sort", "Insertion sort"],
    correctAnswer: "Merge sort",
    category: "Algorithm"
  },
  {
    question: "What does HTTP status code 404 mean?",
    options: ["Server error", "Unauthorized", "Resource not found", "Request timeout"],
    correctAnswer: "Resource not found",
    category: "HTTP"
  }
];

const seedDB = async () => {
await connectDB();
  
  const existing = await Question.countDocuments();
  if (existing > 0) {
    console.log('Questions already seeded, skipping...');
    process.exit();
  }

  await Question.insertMany(questions);
  console.log('15 Questions seeded successfully!');
  process.exit();
};



seedDB();