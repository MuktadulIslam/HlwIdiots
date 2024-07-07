const { verifyJWT} = require("../../middlewares/authMiddleware.js")
const mediaController = require("../../controllers/hlwidiots/mediaController.js")
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const mediaRouters = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/questionImages");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            crypto.randomBytes(4).toString("hex") +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage });

mediaRouters.post("/media", verifyJWT, upload.single("file"), mediaController.addMedia);
mediaRouters.get("/media", mediaController.getMedia);
mediaRouters.delete("/media/:id", verifyJWT, mediaController.deleteMedia);

module.exports = mediaRouters;
