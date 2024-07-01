const mongoose = require('mongoose');
const { DATABASE_URI } = require("../../config/hlwidiots-config.js")

async function connectToDatabase() {
    mongoose.connect(DATABASE_URI)
        .then(() => {
            console.log('Connected to MongoDB User Database');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB User Database:', error);
        });
}