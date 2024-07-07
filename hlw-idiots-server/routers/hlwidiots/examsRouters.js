const { verifyAdmin, verifyJWT } = require("../../middlewares/authMiddleware.js")
const examsController = require("../../controllers/hlwidiots/examsController.js")
const express = require("express");
const examsRouters = express.Router();


examsRouters.get("/exams", verifyJWT, examsController.getExams)
examsRouters.get("/exams/type/:type/:privilege", verifyJWT, examsController.getExamsByPrivilege)
examsRouters.get("/exams/:id", verifyJWT, examsController.getExamsByID)
examsRouters.get("/exams/slug/:slug", verifyJWT, examsController.getExamsBySlug)
examsRouters.post("/exams", verifyJWT, examsController.addExam)
examsRouters.patch("/exams/:id", verifyJWT, examsController.updatedExam)
examsRouters.patch("/exams/questions/:id", verifyJWT, examsController.updatedQuestions)
examsRouters.delete("/exams/:id", verifyJWT, examsController.deleteExam)
examsRouters.post("/exam/regular", verifyJWT, examsController.examRegular)
examsRouters.get("/exam-scoreboard/:examSlug", verifyJWT, examsController.getExamScoreboard)

module.exports = examsRouters;
