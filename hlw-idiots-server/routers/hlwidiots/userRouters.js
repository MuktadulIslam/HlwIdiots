const { verifyJWT } = require("../../middlewares/authMiddleware.js")
const userAuthController = require("../../controllers/hlwidiots/userAuthController.js")
const express = require("express");
const userRouters = express.Router();

userRouters.get("/users", userAuthController.getUser);
userRouters.get("/users/:email", verifyJWT, userAuthController.getUserByEmail);
userRouters.post("/users", userAuthController.setUser);
userRouters.patch("/users/:email", userAuthController.setUserByEmail);
userRouters.get("/user-profile/:id", verifyJWT, userAuthController.getUsersExamDetails);

module.exports = userRouters;
