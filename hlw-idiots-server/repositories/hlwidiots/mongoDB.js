const mongoose = require('mongoose');
const { DATABASE_URI } = require("../../config/hlwidiots-config.js")

async function connectToDatabase() {
    mongoose.connect(DATABASE_URI)
        .then(() => {
            console.log('Connected to MongoDB Database by Mongoose');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB User Database:', error);
        });
}

module.exports = {
    connectToDatabase
};