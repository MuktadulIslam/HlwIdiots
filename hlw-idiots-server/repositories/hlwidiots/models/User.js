const mongoose = require('mongoose');
const { USER_TABLE } = require("../../../config/hlwidiots-config")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
    },
    joinedDate: {
        type: String,
    },
    college: {
        type: String,
    },
    district: {
        type: String,
    },
    phone: {
        type: String,
    },
    profileImg: {
        type: String,
    },
    session: {
        type: String,
    },
}, { collection: USER_TABLE });

const UserCollection = mongoose.model(USER_TABLE, userSchema);

module.exports = UserCollection;