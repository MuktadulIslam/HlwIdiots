const { ObjectId } = require("mongodb");
const SubjectCollection = require("../../repositories/hlwidiots/models/Subjects.js")
const TagsCollection = require("../../repositories/hlwidiots/models/Tags.js")

async function getTags(req, res) {
    try {
        const tags = await TagsCollection.find();
        const result = await Promise.all(
            tags.map(async (tag) => {
                if (tag?.subject) {
                    const subjectName = await SubjectCollection.findOne(
                        { slug: tag.subject },
                        { projection: { name: 1, paper: 1 } }
                    );

                    tag = {
                        ...tag,
                        subjectName:
                            subjectName.name + " " + subjectName.paper,
                    };
                }

                if (tag?.college) {
                    const collegeName = await TagsCollection.findOne(
                        { slug: tag.college },
                        { projection: { name: 1 } }
                    );

                    tag = {
                        ...tag,
                        collegeName: collegeName.name,
                    };
                }

                if (tag?.board) {
                    const boardName = await TagsCollection.findOne(
                        { slug: tag.board },
                        { projection: { name: 1 } }
                    );

                    tag = {
                        ...tag,
                        boardName: boardName.name,
                    };
                }

                return {
                    ...tag,
                };
            })
        );
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllBoardTags(req, res) {
    try {
        const result = await TagsCollection.find({ type: "board" })
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllCollegeTags(req, res) {
    try {
        const result = await TagsCollection.find({ type: "college" });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllExamTags(req, res) {
    try {
        const result = await TagsCollection.find({ type: "exam" });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllSubjectTagsByCollege(req, res) {
    try {
        const subject = req.params.subject;
        const college = req.params.college;
        const result = await TagsCollection.find({ type: "exam", subject: subject, college: college });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllSubjectTagsByCollegeBySearch(req, res) {
    try {
        const subject = req.params.subject;
        const college = req.params.college;
        const search = req.params.search;
        const regex = new RegExp(search, "i");
        const result = await TagsCollection.find({
            type: "exam",
            subject: subject,
            college: college,
            $or: [{ name: regex }, { bnName: regex }],
        });

        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllBookTags(req, res) {
    try {
        const result = await TagsCollection.find({ type: "book" });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllYearTags(req, res) {
    try {
        const result = await TagsCollection.find({ type: "year" });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllYearTagsByBoard(req, res) {
    try {
        const board = req.params.board;
        const result = await TagsCollection.find({ type: "year", board: board });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllChapterTags(req, res) {
    try {
        const subject = req.params.subject;
        const query = { type: "chapter", subject: subject };
        const result = await TagsCollection.find(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllTagsBySlug(req, res) {
    try {
        const slug = req.params.slug;
        const query = { slug: slug };
        const result = await TagsCollection.findOne(query);
        if (result.college) {
            const collegeDetails = await TagsCollection.findOne({
                slug: result.college,
            });

            const modifiedcollege = {
                value: collegeDetails.slug,
                label: collegeDetails.name,
            };

            result.college = modifiedcollege;
        }

        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAllTagsBySlugArray(req, res) {
    try {
        const slugArray = req.params.slug.split(",");
        const query = { slug: { $in: slugArray } };
        const result = await TagsCollection.find(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function addTag(req, res) {
    try {
        const data = req.body;
        let isExist = await TagsCollection.findOne({ slug: data.slug });
        if (isExist) {
            do {
                const randomBytes = crypto.randomBytes(6).toString("hex");
                data.slug += `-${randomBytes}`;
                isExist = await TagsCollection.findOne({ slug: data.slug });
            } while (isExist);
        }
        const result = await TagsCollection.insertOne(data);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function updateTag(req, res) {
    try {
        const id = req.params.id;
        const newTag = req.body;
        const filter = { _id: new ObjectId(id) };
        const query = {
            $set: {
                ...newTag,
            },
        };
        const result = await TagsCollection.updateOne(filter, query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function deleteTag(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await TagsCollection.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    getTags,
    getAllBoardTags,
    getAllCollegeTags,
    getAllExamTags,
    getAllSubjectTagsByCollege,
    getAllSubjectTagsByCollegeBySearch,
    getAllBookTags,
    getAllYearTags,
    getAllYearTagsByBoard,
    getAllChapterTags,
    getAllTagsBySlug,
    getAllTagsBySlugArray,
    addTag,
    updateTag,
    deleteTag
};