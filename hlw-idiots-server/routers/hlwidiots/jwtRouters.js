const {JWT} = require("../../config/system-config")
const express = require("express");
var jwt = require("jsonwebtoken");
const jwtRouters = express.Router();

jwtRouters.post("/jwt", (req, res) => {
    const user = req.body;
    const result = jwt.sign(user, JWT.secretKey, {
        expiresIn: `${JWT.expiryTime}h`,
    });
    res.send({ token: result });
});

module.exports = jwtRouters;