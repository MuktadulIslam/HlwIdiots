const mongoose = require('mongoose');
const { SUBJECTS_TABLE } = require("../../../config/hlwidiots-config")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    bnName: {
        type: String,
    },
    paper: {
        type: String,
    },
    bnPaper: {
        type: String,
    },
    slug: {
        type: String,
    }
}, { collection: SUBJECTS_TABLE });

const SubjectCollection = mongoose.model(SUBJECTS_TABLE, subjectSchema);

module.exports = SubjectCollection;