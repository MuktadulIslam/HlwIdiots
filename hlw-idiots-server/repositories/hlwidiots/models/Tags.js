const mongoose = require('mongoose');
const { TAGS_TABLE } = require("../../../config/hlwidiots-config")

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    bnName: {
        type: String,
    },
    subject: {
        type: String,
    },
    college: {
        type: String,
    },
    type: {
        type: String,
    },
    slug: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: String,
    }
}, { collection: TAGS_TABLE });


const TagsCollection = mongoose.model(TAGS_TABLE, tagSchema);

module.exports = TagsCollection;
