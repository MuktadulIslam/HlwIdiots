const { verifyJWT } = require("../../middlewares/authMiddleware.js")
const questionsController = require("../../controllers/hlwidiots/questionsController.js")
const express = require("express");
const questionRouters = express.Router();


questionRouters.get("/total-questions", questionsController.getTotalQuestions);
questionRouters.post("/exist-subject-questions", questionsController.existSubjectQuestions)
questionRouters.get("/questions", questionsController.getQuestions)
questionRouters.post("/questions/subject/tags", questionsController.questionsBySubjectTag)
questionRouters.post("/questions/exam", questionsController.examQuestions)
questionRouters.get("/questions/filter", verifyJWT, questionsController.getQuestionsBankBySubjectAndTag)
questionRouters.get("/questions/:id", verifyJWT, questionsController.getQuestionsByID)
questionRouters.get("/questions/bank/subject/:subject", verifyJWT, questionsController.getQuestionsBankBySubject)
questionRouters.post("/questions", verifyJWT, questionsController.addQuestion)
questionRouters.patch("/questions/:id", verifyJWT, questionsController.updateQuestion)
questionRouters.delete("/questions/:id", verifyJWT, questionsController.deleteQuestion)

module.exports = questionRouters;
