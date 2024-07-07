const { verifyJWT } = require("../../middlewares/authMiddleware.js")
const topSolvedController = require("../../controllers/hlwidiots/topSolvedController.js")
const express = require("express");
const topSolvedRouters = express.Router();

topSolvedRouters.get("/monthly-toppers", verifyJWT, topSolvedController.getMonthlyToppers)
topSolvedRouters.get("/top-solved-colleges", topSolvedController.getTopSolvedColleges)
topSolvedRouters.get("/top-solved-exams", topSolvedController.getTopSolvedExams)

module.exports = topSolvedRouters;
