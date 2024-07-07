const subjectsController = require("../../controllers/hlwidiots/subjectsController.js")
const express = require("express");
const subjectRouters = express.Router();

subjectRouters.get("/subjects", subjectsController.getSubject);
subjectRouters.get("/subjects/:slug", subjectsController.getSubjectBySlug);


module.exports = subjectRouters;
