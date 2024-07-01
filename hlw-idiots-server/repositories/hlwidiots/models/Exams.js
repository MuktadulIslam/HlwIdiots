const mongoose = require('mongoose');
const { EXAM_TABLE } = require("../../../config/hlwidiots-config")

const examSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    examType: {
        type: String,
        required: true,
    },
    exam: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    submitTime: {
        type: String,
        required: true,
    },
    totalMark: {
        type: Number,
        required: true,
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
});


const ExamCollection = mongoose.model(EXAM_TABLE, examSchema);

module.exports = ExamCollection;