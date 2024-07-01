const mongoose = require('mongoose');
const { QUESTIONS_TABLE } = require("../../../config/hlwidiots-config")

const questionSchema = new mongoose.Schema({
    questionImg: {
      type: String,
      default: null,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
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
      required: true,
    },
    insertDate: {
      type: Date,
      required: true,
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
  });

const QuestionsCollection = mongoose.model(QUESTIONS_TABLE, questionSchema);

module.exports = QuestionsCollection;