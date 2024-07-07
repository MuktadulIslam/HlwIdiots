const mongoose = require('mongoose');
const { ADMIN_TABLE } = require("../../../config/hlwidiots-config")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    status: {
        type: String,
    },
    joinedDate: {
        type: String,
    },
}, { collection: ADMIN_TABLE });

const AdminCollection = mongoose.model(ADMIN_TABLE, adminSchema);

module.exports = AdminCollection;

