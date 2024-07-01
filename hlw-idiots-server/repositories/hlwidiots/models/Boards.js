const mongoose = require('mongoose');
const { BOARD_TABLE } = require("../../../config/hlwidiots-config")

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bnName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

const BoardCollection = mongoose.model(BOARD_TABLE, boardSchema);

module.exports = BoardCollection;