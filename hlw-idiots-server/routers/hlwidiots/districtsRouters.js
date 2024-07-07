const districtsController = require("../../controllers/hlwidiots/districtsController")
const express = require("express");
const districtRouters = express.Router();

districtRouters.get("/districts", districtsController.getDistricts);

module.exports = districtRouters;