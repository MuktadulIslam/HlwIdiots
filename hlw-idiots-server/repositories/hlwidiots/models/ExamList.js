const mongoose = require('mongoose');
const { EXAMLIST_TABLE } = require("../../../config/hlwidiots-config")

const examListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    privilege: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // assuming duration is in minutes
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    positiveMarking: {
        type: Number,
        default: 1,
    },
    negativeMarking: {
        type: Number,
        default: 0,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    questions: {
        type: [String],
    }
});

const ExamListCollection = mongoose.model(EXAMLIST_TABLE, examListSchema);

module.exports = ExamListCollection;