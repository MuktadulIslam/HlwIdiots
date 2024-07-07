const { verifyAdmin, verifyJWT } = require("../../middlewares/authMiddleware.js")
const adminAuthController = require("../../controllers/hlwidiots/adminAuthController.js")
const express = require("express");
const adminRouters = express.Router();

adminRouters.get("/admin-users", verifyJWT, verifyAdmin, adminAuthController.getAdminUsers);
adminRouters.get("/admin-users/id/:id", verifyJWT, verifyAdmin, adminAuthController.getAdminUsersByID);
adminRouters.get("/admin-users/:email", verifyJWT, adminAuthController.getAdminUsersByEmail);
adminRouters.post("/admin-users", verifyJWT, verifyAdmin, adminAuthController.setAdminUsers);
adminRouters.patch("/admin-users/:id", verifyJWT, verifyAdmin, adminAuthController.setAdminUsersByID);
adminRouters.delete("/admin-users/:id", verifyJWT, verifyAdmin, adminAuthController.deleteAdminUsersByID);

module.exports = adminRouters;
