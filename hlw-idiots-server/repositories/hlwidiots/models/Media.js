const mongoose = require('mongoose');
const { MEDIA_TABLE } = require("../../../config/hlwidiots-config")

const mediaSchema = new mongoose.Schema({
    image: {
        type: String
    }
}, { collection: MEDIA_TABLE });

const MediaCollection = mongoose.model(MEDIA_TABLE, mediaSchema);

module.exports = MediaCollection;