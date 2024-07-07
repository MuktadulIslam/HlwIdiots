const UserCollection = require("../../repositories/hlwidiots/models/User.js")
const ExamCollection = require("../../repositories/hlwidiots/models/Exams.js")

async function getUser(req, res) {
    try {
        const result = await UserCollection.find();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getUserByEmail(req, res) {
    try {
        const email = req.params.email;
        if (req.decoded.email !== email) {
            return res
                .status(403)
                .send({ error: true, message: "forbidden access" });
        }
        const query = { email: email };
        const result = await UserCollection.findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getUsersExamDetails(req, res) {
    try {
        const userId = req.params.id;

        const [mcqSolved, totalExam, totalLiveExam, totalRapidExam] =
            await Promise.all([
                ExamCollection.countDocuments({ student: userId }),

                ExamCollection.aggregate([
                    { $match: { student: userId } },
                    { $group: { _id: "$exam" } },
                    { $count: "totalExam" },
                ]).then((result) =>
                    result[0] ? result[0].totalExam : 0
                ),

                ExamCollection.aggregate([{
                    $match: {
                        student: userId,
                        examType: "live",
                    },
                },
                { $group: { _id: "$exam" } },
                { $count: "totalLiveExam" },
                ]).then((result) =>
                    result[0] ? result[0].totalLiveExam : 0
                ),

                ExamCollection.aggregate([{
                    $match: {
                        student: userId,
                        examType: "rapid",
                    },
                },
                { $group: { _id: "$exam" } },
                { $count: "totalRapidExam" },
                ]).then((result) =>
                    result[0] ? result[0].totalRapidExam : 0
                ),
            ]);

        res.json({ mcqSolved, totalExam, totalLiveExam, totalRapidExam });
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


async function setUser(req, res) {
    try {
        const user = req.body;
        const query = { email: user.email };
        const isExist = await UserCollection.findOne(query);

        if (isExist) {
            return res.send({ message: "user exist" });
        }

        const result = await UserCollection.insertOne(user);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function setUserByEmail(req, res) {
    try {
        const user = req.body;
        const filter = { email: req.params.email };
        const query = { email: req.params.email };
        const updateDoc = {
            $set: {
                ...user,
            },
        };

        const isExist = await UserCollection.findOne(query);

        if (isExist?.phone) {
            return res.send({ message: "user exist" });
        }

        const result = await UserCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    getUser,
    getUserByEmail,
    getUsersExamDetails,
    setUser,
    setUserByEmail
};