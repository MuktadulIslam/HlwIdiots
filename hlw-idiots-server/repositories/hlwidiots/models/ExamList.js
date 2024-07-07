const mongoose = require('mongoose');
const { EXAMLIST_TABLE } = require("../../../config/hlwidiots-config")

const examListSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    privilege: {
        type: String,
    },
    duration: {
        type: Number, // assuming duration is in minutes
    },
    totalQuestions: {
        type: Number,
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
    },
    endTime: {
        type: String,
    },
    slug: {
        type: String,
    },
    questions: {
        type: [String],
    }
}, { collection: EXAMLIST_TABLE });

const ExamListCollection = mongoose.model(EXAMLIST_TABLE, examListSchema);

module.exports = ExamListCollection;