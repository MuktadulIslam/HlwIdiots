const mongoose = require('mongoose');
const { DISTRICTS_TABLE } = require("../../../config/hlwidiots-config")

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    bnName: {
        type: String,
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
}, { collection: DISTRICTS_TABLE });

const DistrictCollection = mongoose.model(DISTRICTS_TABLE, districtSchema);

module.exports = DistrictCollection;