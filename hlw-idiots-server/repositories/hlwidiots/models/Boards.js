const mongoose = require('mongoose');
const { BOARD_TABLE } = require("../../../config/hlwidiots-config")

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    bnName: {
        type: String,
    },
    slug: {
        type: String,
    }
}, { collection: BOARD_TABLE });

const BoardCollection = mongoose.model(BOARD_TABLE, boardSchema);

module.exports = BoardCollection;