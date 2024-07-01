const dotenv = require('dotenv').config();

const FRONTEND1 = process.env.FRONTEND1 || 'http://localhost:3000';
const FRONTEND2 = process.env.FRONTEND2 || 'http://localhost:3001';

const PORT_NUMBER = Number(process.env.PORT_NUMBER) || 5001;

const JWT = {
    secretKey: "c9a892edd8c92308e8476126a9c0e14de0c0089f0cb451912c96743f0f51f30c65a9a8b8656f68a7f29e8815fee263d307b7d7c9b6324b40cad7a7bf6243cd91",
    expiryTime: 2*24*60*60
}

module.exports = {
    PORT_NUMBER, 
    JWT,
    FRONTEND1,
    FRONTEND2
}