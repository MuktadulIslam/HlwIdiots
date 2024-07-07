const { ObjectId } = require("mongodb");
const QuestionsCollection = require("../../repositories/hlwidiots/models/Questions");
const TagsCollection = require("../../repositories/hlwidiots/models/Tags");
const SubjectCollection = require("../../repositories/hlwidiots/models/Subjects");

async function getTotalQuestions(req, res) {
    try {
        const totalQuestions = await QuestionsCollection.countDocuments();
        res.send({ result: totalQuestions });
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function existSubjectQuestions(req, res) {
    try {
        const subjects = req.body.subjects;
        const tag = req.body.tag;
        const result = {};
        await Promise.all(
            subjects.map(async (s) => {
                const count = await QuestionsCollection.countDocuments({
                    subject: s,
                    tags: tag,
                });

                result[s] = count;
            })
        );
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getQuestions(req, res) {
    try {
        const { subject } = req.query;
        let query = {};
        if (subject) { query.subject = subject; }
        let result = [];

        try {
            const totalQuestions = await QuestionsCollection.countDocuments(query);
            if (totalQuestions > 0) {
                const questions = await QuestionsCollection.find(query);

                await Promise.all(
                    questions.map(async (question) => {
                        const tags = await TagsCollection
                            .find(
                                { slug: { $in: question.tags } },
                                { name: 1, bnName: 1, slug: 1, type: 1 }
                            );
                        question.tags = tags.map((tag) => ({
                            value: tag.slug,
                            label: tag.name,
                            bnLabel: tag.bnName,
                            type: tag.type,
                        }));
                    })
                );

                result = questions;
            }

            res.send(result);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send("Error fetching questions");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function questionsBySubjectTag(req, res) {
    try {
        const { subject, tags } = req.body;
        let query = {};
        if (subject) {
            query.subject = subject;
        }
        if (tags) {
            query.tags = { $all: tags };
        }
        let result = [];
        try {
            const totalQuestions = await QuestionsCollection.countDocuments(query);

            if (totalQuestions > 0) {
                const questions = await QuestionsCollection.find(query);

                await Promise.all(
                    questions.map(async (question) => {
                        const tags = await TagsCollection
                            .find(
                                { slug: { $in: question.tags } },
                                { name: 1, bnName: 1, slug: 1, type: 1 }
                            );
                        question.tags = tags.map((tag) => ({
                            value: tag.slug,
                            label: tag.name,
                            bnLabel: tag.bnName,
                            type: tag.type,
                        }));
                    })
                );

                result = questions;
            }
            res.send(result);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send("Error fetching questions");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function examQuestions(req, res) {
    try {
        let { questionIds } = req.body;

        try {
            questionIds = questionIds.map((id) => new ObjectId(id));
        } catch (error) {
            console.error("Invalid ObjectId format:", error);
            return res.status(400).send("Invalid question ID format");
        }

        const query = { _id: { $in: questionIds } };

        try {
            const questions = await QuestionsCollection.find(query);

            await Promise.all(
                questions.map(async (question) => {
                    const tags = await TagsCollection
                        .find(
                            { slug: { $in: question.tags } },
                            {
                                projection: {
                                    name: 1,
                                    bnName: 1,
                                    slug: 1,
                                    type: 1,
                                },
                            }
                        );

                    question.tags = tags.map((tag) => ({
                        value: tag.slug,
                        label: tag.name,
                        bnLabel: tag.bnName,
                        type: tag.type,
                    }));
                })
            );
            res.send(questions);
        } catch (error) {
            console.error("Error fetching questions:", error.message);
            res.status(500).send("Error fetching questions");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getQuestionsBankBySubjectAndTag(req, res) {
    try {
        let { page, limit } = req.query;
        const { subject, tag } = req.query;
        let query = {};
        if (subject) {
            query.subject = subject;
        }
        if (tag) {
            query.tags = { $in: typeof tag === "string" ? [tag] : tag };
        }
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = page * limit;

        try {
            const totalQuestions = await QuestionsCollection.countDocuments(
                query
            );
            const result = {
                totalQuestions: totalQuestions,
                questions: [],
            };

            if (totalQuestions > 0) {
                const questions = await QuestionsCollection
                    .find(query)
                    .sort({ insertDate: -1 })
                    .skip(skip)
                    .limit(limit);

                await Promise.all(
                    questions.map(async (question) => {
                        const tags = await TagsCollection
                            .find(
                                { slug: { $in: question.tags } },
                                { name: 1, slug: 1 }
                            );
                        question.tags = tags.map((tag) => ({
                            value: tag.slug,
                            label: tag.name,
                        }));
                    })
                );

                result.questions = questions;
            }

            res.send(result);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send("Error fetching questions");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getQuestionsByID(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await QuestionsCollection.findOne(query);
        const tagDetails = await Promise.all(
            result.tags.map(async (tagSlug) => {
                const tag = await TagsCollection.findOne(
                    { slug: tagSlug },
                    { name: 1, slug: 1 }
                );

                if (tag?.subject) {
                    const subjectName = await SubjectCollection.findOne(
                        { slug: tag.subject },
                        { projection: { name: 1, paper: 1 } }
                    );

                    tag.subjectName =
                        subjectName.name + " " + subjectName.paper;
                }

                if (tag?.college) {
                    const collegeName = await TagsCollection.findOne(
                        { slug: tag.college },
                        { projection: { name: 1 } }
                    );

                    tag.collegeName = collegeName.name;
                }

                if (tag?.board) {
                    const boardName = await TagsCollection.findOne(
                        { slug: tag.board },
                        { projection: { name: 1 } }
                    );

                    tag.boardName = boardName.name;
                }

                if (tag?.college) {
                    return {
                        value: tag.slug,
                        label:
                            tag.name +
                            " | " +
                            tag.collegeName +
                            " | " +
                            tag.subjectName,
                    };
                } else if (tag?.board) {
                    return {
                        value: tag.slug,
                        label: tag.name + " | " + tag.boardName,
                    };
                } else {
                    return { value: tag.slug, label: tag.name };
                }
            })
        );

        const modifiedTags = tagDetails.map((tag) => ({
            value: tag.value,
            label: tag.label,
        }));

        result.tags = modifiedTags;
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getQuestionsBankBySubject(req, res) {
    try {
        let { page, limit } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const skip = page * limit;
        const subject = req.params.subject;
        const query = { questionType: "bank", subject: subject };

        try {
            const totalQuestions = await QuestionsCollection.countDocuments(query);
            const result = {
                totalQuestions: totalQuestions,
                questions: [],
            };

            if (totalQuestions > 0) {
                const questions = await QuestionsCollection
                    .find(query)
                    .sort({ insertDate: -1 })
                    .skip(skip)
                    .limit(limit);

                await Promise.all(
                    questions.map(async (question) => {
                        const tags = await TagsCollection
                            .find(
                                { slug: { $in: question.tags } },
                                { name: 1, slug: 1 }
                            );
                        question.tags = tags.map((tag) => ({
                            value: tag.slug,
                            label: tag.name,
                        }));
                    })
                );

                result.questions = questions;
            }

            res.send(result);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send("Error fetching questions");
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function addQuestion(req, res) {
    try {
        const data = req.body;
        const result = await QuestionsCollection.insertOne(data);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function updateQuestion(req, res) {
    try {
        const id = req.params.id;
        const newQuestion = req.body;
        const filter = { _id: new ObjectId(id) };
        const query = {
            $set: {
                questionImg: newQuestion.questionImg,
                question: newQuestion.question,
                options: newQuestion.options,
                correctAnswer: newQuestion.correctAnswer,
                book: newQuestion.book,
                chapter: newQuestion.chapter,
                tags: newQuestion.tags,
                explaination: newQuestion.explaination,
            },
        };
        const result = await QuestionsCollection.updateOne(filter, query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}
async function deleteQuestion(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await QuestionsCollection.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

module.exports = {
    getTotalQuestions,
    existSubjectQuestions,
    getQuestions,
    questionsBySubjectTag,
    examQuestions,
    getQuestionsBankBySubjectAndTag,
    getQuestionsByID,
    getQuestionsBankBySubject,
    addQuestion,
    updateQuestion,
    deleteQuestion
};