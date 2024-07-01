const mongoose = require('mongoose');
const { ADMIN_TABLE } = require("../../../config/hlwidiots-config")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
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
});

const AdminCollection = mongoose.model(ADMIN_TABLE, adminSchema);

module.exports = AdminCollection;

