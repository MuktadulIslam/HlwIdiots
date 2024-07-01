const mongoose = require('mongoose');
const { USER_TABLE } = require("../../../config/hlwidiots-config")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    joinedDate: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
});

const UserCollection = mongoose.model(USER_TABLE, userSchema);

module.exports = UserCollection;