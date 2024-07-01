const mongoose = require('mongoose');
const { SUBJECTS_TABLE } = require("../../../config/hlwidiots-config")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bnName: {
        type: String,
        required: true
    },
    paper: {
        type: String,
        required: true
    },
    bnPaper: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

const SubjectCollection = mongoose.model(SUBJECTS_TABLE, subjectSchema);

module.exports = SubjectCollection;