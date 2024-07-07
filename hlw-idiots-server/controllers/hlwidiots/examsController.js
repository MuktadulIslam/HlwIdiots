const moment = require("moment-timezone");
const crypto = require("crypto");
const { ObjectId } = require("mongodb");
const ExamListCollection = require("../../repositories/hlwidiots/models/ExamList.js")
const QuestionsCollection = require("../../repositories/hlwidiots/models/Questions.js")
const ExamCollection = require("../../repositories/hlwidiots/models/Exams.js")
const UserCollection = require("../../repositories/hlwidiots/models/User.js")

async function getExams(req, res) {
    try {

        let { page, limit } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = page * limit;
        try {
            const totalExams = await ExamListCollection.countDocuments();
            const result = {
                totalExams: totalExams,
                exams: [],
            };

            if (totalExams > 0) {
                const exams = await ExamListCollection
                    .find()
                    .sort({ insertDate: -1 })
                    .skip(skip)
                    .limit(limit);

                result.exams = exams;
            }

            res.send(result);
        } catch (error) {
            console.error("Error fetching exams:", error);
            res.status(500).send("Error fetching exams");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getExamsByPrivilege(req, res) {
    try {
        const { type, privilege } = req.params;

        const currentTime = moment().tz("Asia/Dhaka");
        const sixHoursAgo = currentTime.clone().subtract(24, "hours");
        const sixHoursLater = currentTime.clone().add(48, "hours");

        const query = {
            type: type,
            privilege: privilege,
            startTime: {
                $gte: sixHoursAgo.format("YYYY-MM-DDTHH:mm"),
                $lte: sixHoursLater.format("YYYY-MM-DDTHH:mm"),
            },
        };

        try {
            const result = await ExamListCollection.find(query).sort({ startTime: -1 })
            res.send(result);
        } catch (error) {
            console.error("Error fetching exams:", error);
            res.status(500).send("Error fetching exams");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getExamsByID(req, res) {
    try {
        const id = req.params.id;
        try {
            const result = await ExamListCollection.findOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        } catch (error) {
            console.error("Error fetching exam:", error);
            res.status(500).send("Error fetching exam");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getExamsBySlug(req, res) {
    try {
        const slug = req.params.slug;
        try {
            const result = await ExamListCollection.findOne({ slug: slug });
            res.send(result);
        } catch (error) {
            console.error("Error fetching exam:", error);
            res.status(500).send("Error fetching exam");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function addExam(req, res) {
    try {
        const data = req.body;
        let isExist = await ExamListCollection.findOne({ slug: data.slug });
        if (isExist) {
            do {
                const randomBytes = crypto.randomBytes(6).toString("hex");
                data.slug += `-${randomBytes}`;
                isExist = await ExamListCollection.findOne({
                    slug: data.slug,
                });
            } while (isExist);
        }
        const result = await ExamListCollection.insertOne(data);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function updatedExam(req, res) {
    try {
        const id = req.params.id;
        const newExams = req.body;
        const filter = { _id: new ObjectId(id) };
        const query = {
            $set: {
                ...newExams,
            },
        };
        const result = await ExamListCollection.updateOne(filter, query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function updatedQuestions(req, res) {
    try {
        const id = req.params.id;
        const newExams = req.body;
        const filter = { _id: new ObjectId(id) };
        const query = {
            $set: {
                questions: newExams,
            },
        };
        const result = await ExamListCollection.updateOne(filter, query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function deleteExam(req, res) {
    try {
        const id = req.params.id;
        try {
            const result = await ExamListCollection.deleteOne({
                _id: new ObjectId(id),
            });

            res.send(result);
        } catch (error) {
            console.error("Error delete exam:", error);
            res.status(500).send("Error delete exam");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function examRegular(req, res) {
    try {
        const examData = req.body;
        const questionIds = examData.map(
            (data) => new ObjectId(data.question)
        );
        const { exam, student, positiveMarking, negativeMarking } = examData[0];

        const questions = await QuestionsCollection.find({ _id: { $in: questionIds } })

        const questionMap = questions.reduce((map, question) => {
            map[question._id] = question;
            return map;
        }, {});

        let totalGainedMarks = 0;

        examData.forEach((data) => {
            const question = questionMap[data.question];
            if (question) {
                let gainedMark = 0;
                if (question.correctAnswer === "Auto") {
                    gainedMark = parseFloat(positiveMarking) || 1;
                } else if (data.answer === "") {
                    gainedMark = 0;
                } else if (question.correctAnswer === data.answer) {
                    gainedMark = parseFloat(positiveMarking) || 1;
                } else {
                    gainedMark = parseFloat(negativeMarking) || 0;
                }
                data.mark = gainedMark;

                totalGainedMarks += gainedMark;
            }
        });

        const existingExam = await ExamCollection.findOne({ exam, student: student, });

        if (!existingExam) {
            await ExamCollection.insertMany(examData);

            await Promise.all(
                questionIds.map((id) =>
                    QuestionsCollection.updateOne(
                        { _id: id },
                        { $inc: { views: 1 } }
                    )
                )
            );
        }

        res.send({ totalGainedMarks, examData });
    } catch (error) {
        console.error("Error processing exam data:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

async function getExamScoreboard(req, res) {
    try {
        const examSlug = req.params.examSlug;
        const toppers = await ExamCollection
            .aggregate([
                {
                    $match: {
                        exam: examSlug,
                    },
                },
                {
                    $group: {
                        _id: "$student",
                        totalMarks: { $sum: "$mark" },
                        totalDuration: {
                            $sum: { $ifNull: ["$duration", 0] },
                        },
                    },
                },
                {
                    $sort: { totalMarks: -1 },
                },
            ]);

        if (toppers.length === 0) {
            res.json([]);
            return;
        }

        const studentIds = toppers.map(
            (topper) => new ObjectId(topper._id)
        );
        const students = await UserCollection.find({ _id: { $in: studentIds } })

        const result = toppers.map((topper) => {
            const student = students.find((student) =>
                student._id.equals(new ObjectId(topper._id))
            );
            return {
                name: student.name,
                college: student.college,
                profileImg: student.profileImg,
                marks: topper.totalMarks,
                duration: topper.totalDuration,
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getExams,
    getExamsByPrivilege,
    getExamsByID,
    getExamsBySlug,
    addExam,
    updatedExam,
    updatedExam,
    updatedQuestions,
    deleteExam,
    examRegular,
    getExamScoreboard
};