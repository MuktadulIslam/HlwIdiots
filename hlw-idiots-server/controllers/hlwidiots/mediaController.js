const { ObjectId } = require("mongodb");
const MediaCollection = require("../../repositories/hlwidiots/models/Media")
const fs = require("fs");

async function addMedia(req, res) {
    try {
        const data = { image: "questionImages/" + req.file.filename };
        const result = await MediaCollection.insertOne(data);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getMedia(req, res) {
    try {
        const { page, limit } = req.query;
        const skip = parseInt(page) * parseInt(limit);
        const result = await MediaCollection
            .find()
            .sort({ _id: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function deleteMedia(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const data = await MediaCollection.findOne(query);
        fs.unlinkSync(`public/${data.image}`);
        const result = await MediaCollection.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

module.exports = {
    addMedia,
    getMedia,
    deleteMedia
};