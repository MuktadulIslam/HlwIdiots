const mongoose = require('mongoose');
const { TAGS_TABLE } = require("../../../config/hlwidiots-config")

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bnName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    slug: {
        type: String,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    }
});


const TagsCollection = mongoose.model(TAGS_TABLE, tagSchema);

module.exports = TagsCollection;