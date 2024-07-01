const mongoose = require('mongoose');
const { BOARD_YEAR_TABLE } = require("../../../config/hlwidiots-config")

const boardYearSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    }
});

const BoardYearCollection = mongoose.model(BOARD_YEAR_TABLE, boardYearSchema);

module.exports = BoardYearCollection;