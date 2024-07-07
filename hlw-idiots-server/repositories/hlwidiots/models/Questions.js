const mongoose = require('mongoose');
const { QUESTIONS_TABLE } = require("../../../config/hlwidiots-config")

const questionSchema = new mongoose.Schema({
  questionImg: {
    type: String,
    default: null,
  },
  correctAnswer: {
    type: String,
  },
  question: {
    type: String,
  },
  options: {
    type: [String], // Array of strings
    required: true,
  },
  explaination: {
    type: String,
    default: null,
  },
  tags: {
    type: [String], // Array of strings
    default: null,
  },
  subject: {
    type: String,
    default: null,
  },
  questionType: {
    type: String,
    default: null,
  },
  questionCategory: {
    type: String,
    default: null,
  },
  questionCount: {
    type: Number,
    default: 0,
  },
  insertBy: {
    type: String,
  },
  insertDate: {
    type: Date,
  },
  book: {
    type: String,
    default: null,
  },
  chapter: {
    type: String,
    default: null,
  },
  views: {
    type: Number,
    default: 0,
  },
}, { collection: QUESTIONS_TABLE });

const QuestionsCollection = mongoose.model(QUESTIONS_TABLE, questionSchema);

module.exports = QuestionsCollection;