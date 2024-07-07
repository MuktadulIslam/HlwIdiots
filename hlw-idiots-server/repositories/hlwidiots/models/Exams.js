const mongoose = require('mongoose');
const { EXAM_TABLE } = require("../../../config/hlwidiots-config")

const examSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    examType: {
        type: String,
    },
    exam: {
        type: String,
    },
    student: {
        type: String,
    },
    startTime: {
        type: String,
    },
    submitTime: {
        type: String,
    },
    totalMark: {
        type: Number,
    },
    positiveMarking: {
        type: Number,
        default: 1
    },
    negativeMarking: {
        type: Number,
        default: 0
    },
    mark: {
        type: Number,
        default: 0
    },
}, { collection: EXAM_TABLE });


const ExamCollection = mongoose.model(EXAM_TABLE, examSchema);

module.exports = ExamCollection;