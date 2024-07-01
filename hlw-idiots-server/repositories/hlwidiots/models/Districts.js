const mongoose = require('mongoose');
const { DISTRICTS_TABLE } = require("../../../config/hlwidiots-config")

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bnName: {
        type: String,
        required: true
    },
    lat: {
        type: String,
    },
    lon: {
        type: String,
    },
    slug: {
        type: String,
    }
});

const DistrictCollection = mongoose.model(DISTRICTS_TABLE, districtSchema);

module.exports = DistrictCollection;