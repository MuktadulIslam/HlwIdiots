const SubjectCollection = require("../../repositories/hlwidiots/models/Subjects.js")

async function getSubject(req, res) {
    try {
        const result = await SubjectCollection
            .find()
            .skip(4)
            .limit(8)
            .sort({ _id: 1 });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getSubjectBySlug(req, res) {
    try {
        const slug = req.params.slug;
            const query = { slug: slug };
            const result = await SubjectCollection.findOne(query);
            res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    getSubject,
    getSubjectBySlug
};