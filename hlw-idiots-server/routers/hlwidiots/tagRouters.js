const { verifyJWT} = require("../../middlewares/authMiddleware.js")
const tagController = require("../../controllers/hlwidiots/tagController.js")
const express = require("express");
const tagRouters = express.Router();

tagRouters.get("/tags", verifyJWT, tagController.getTags);
tagRouters.get("/tags/boards", tagController.getAllBoardTags);             // tags board type
tagRouters.get("/tags/colleges", tagController.getAllCollegeTags);         // tags college type
tagRouters.get("/tags/exams", tagController.getAllExamTags);               // tags college type
tagRouters.get("/tags/exams/:subject/:college", tagController.getAllSubjectTagsByCollege);     // tags college type by year
tagRouters.get("/tags/exams/:subject/:college/:search", tagController.getAllSubjectTagsByCollegeBySearch);     // tags college type by year
tagRouters.get("/tags/books", tagController.getAllBookTags);               // tags book type
tagRouters.get("/tags/years", tagController.getAllYearTags);               // tags year type
tagRouters.get("/tags/years/:board", tagController.getAllYearTagsByBoard); // tags year type by board
tagRouters.get("/tags/chapters/subject/:subject", tagController.getAllChapterTags);    // tags chapters type
tagRouters.get("/tags/:slug", tagController.getAllTagsBySlug);             // tags by slug
tagRouters.get("/tags/array/:slug", tagController.getAllTagsBySlugArray);  // tags by slug array
tagRouters.post("/tags", verifyJWT, tagController.addTag);                 // tags add
tagRouters.patch("/tags/:id", verifyJWT, tagController.updateTag);         // tags edit
tagRouters.delete("/tags/:id", verifyJWT, tagController.deleteTag);        // tags delete

module.exports = tagRouters;
