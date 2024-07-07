const express = require("express");
const cors = require("cors");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const moment = require("moment-timezone");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// const corsOptions = {
//     origin: 'https://hlwidiots.com', // http://localhost:5173
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const authMiddleware = require("./middlewares/authMiddleware")
// json web token middleware
const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res
            .status(401)
            .send({ error: true, message: "unauthorized permission" });
    }

    // bearer token
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .send({ error: true, message: "unauthorized permission" });
        }

        req.decoded = decoded;
        next();
    });
};

const uri = process.env.DB_URI

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dbaas-db-9868281-a193a09c.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=dbaas-db-9868281`;

app.get("/", (req, res) => {
    res.send("HLW Idiots server is running");
});

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


const adminRouters = require("./routers/hlwidiots/adminRouters");
const userRouters = require("./routers/hlwidiots/userRouters");
const mediaRoutes = require("./routers/hlwidiots/mediaRoutes");
const questionRoutes = require("./routers/hlwidiots/questionRoutes");
const subjectRouters = require("./routers/hlwidiots/subjectRouters");
const tagRouters = require("./routers/hlwidiots/tagRouters");
const examsRouters = require("./routers/hlwidiots/examsRouters");
const jwtRouters = require("./routers/hlwidiots/jwtRouters");
const districtsRouters = require("./routers/hlwidiots/districtsRouters");
const topSolvedRouters = require("./routers/hlwidiots/topSolvedRouters");

app.use(adminRouters);
app.use(userRouters);
app.use(mediaRoutes);
app.use(questionRoutes);
app.use(subjectRouters);
app.use(tagRouters);
app.use(examsRouters);
app.use(jwtRouters);
app.use(districtsRouters);
app.use(topSolvedRouters);

async function run() {
    try {
        // await client.connect();

        // const adminCollection = client.db("hlwIdiotsDB").collection("adminUsers");
        // const userCollection = client.db("hlwIdiotsDB").collection("users");
        // const boardCollection = client.db("hlwIdiotsDB").collection("boards");
        // const boardYearsCollection = client.db("hlwIdiotsDB").collection("boardYears");
        // const subjectsCollection = client.db("hlwIdiotsDB").collection("subjects");
        // const questionsCollection = client.db("hlwIdiotsDB").collection("questions");
        // const examListCollection = client.db("hlwIdiotsDB").collection("examList");
        // const examsCollection = client.db("hlwIdiotsDB").collection("exams");
        // const tagsCollection = client.db("hlwIdiotsDB").collection("tags");
        // const mediaCollection = client.db("hlwIdiotsDB").collection("media");
        // const districtCollection = client.db("hlwIdiotsDB").collection("districts");

        // verify admin
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await adminCollection.findOne(query);
            if (user?.role !== "Admin") {
                return res
                    .status(403)
                    .send({ error: true, message: "forbidden access" });
            }
            next();
        };

        // verify questioner
        const verifyQuestioner = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await adminCollection.findOne(query);
            if (user?.role !== "Admin" && user?.role !== "Questioner") {
                return res
                    .status(403)
                    .send({ error: true, message: "forbidden access" });
            }
            next();
        };

        // admin users
        // app.get("/admin-users", verifyJWT, verifyAdmin, async (req, res) => {
        //     const result = await adminCollection
        //         .find({ email: { $ne: "hasancodebd@gmail.com" } })
        //         .toArray();
        //     res.send(result);
        // });

        // app.get("/admin-users/id/:id",verifyJWT,verifyAdmin,async (req, res) => {
        //         const id = req.params.id;
        //         const query = { _id: new ObjectId(id) };
        //         const result = await adminCollection.findOne(query);
        //         res.send(result);
        //     }
        // );

        // app.get("/admin-users/:email", verifyJWT, async (req, res) => {
        //     const email = req.params.email;
        //     if (req.decoded.email !== email) {
        //         return res
        //             .status(403)
        //             .send({ error: true, message: "forbidden access" });
        //     }
        //     const query = {
        //         email: email,
        //         role: { $in: ["Admin", "Questioner"] },
        //         status: "Active",
        //     };
        //     const result = await adminCollection.findOne(query);
        //     if (result) {
        //         return res.send({
        //             ...result,
        //             isAdmin: true,
        //         });
        //     } else {
        //         return res.send({
        //             isAdmin: false,
        //         });
        //     }
        // });

        // app.post("/admin-users", verifyJWT, verifyAdmin, async (req, res) => {
        //     const user = req.body;
        //     const query = { email: user.email };
        //     const isExist = await adminCollection.findOne(query);

        //     if (isExist) {
        //         return res.send({ error: true, message: "user exist" });
        //     }

        //     const result = await adminCollection.insertOne(user);
        //     res.send(result);
        // });

        // app.patch("/admin-users/:id",
        //     verifyJWT,
        //     verifyAdmin,
        //     async (req, res) => {
        //         const id = req.params.id;
        //         const newUser = req.body;
        //         const filter = { _id: new ObjectId(id) };
        //         const query = {
        //             $set: {
        //                 name: newUser.name,
        //                 phone: newUser.phone,
        //                 role: newUser.role,
        //                 status: newUser.status,
        //             },
        //         };
        //         const result = await adminCollection.updateOne(filter, query);
        //         res.send(result);
        //     }
        // );

        // app.delete("/admin-users/:id",
        //     verifyJWT,
        //     verifyAdmin,
        //     async (req, res) => {
        //         const id = req.params.id;
        //         const query = { _id: new ObjectId(id) };
        //         const result = await adminCollection.deleteOne(query);
        //         res.send(result);
        //     }
        // );

        // // users
        // app.get("/users", async (req, res) => {
        //     const result = await userCollection.find().toArray();
        //     res.send(result);
        // });

        // app.get("/users/:email", verifyJWT, async (req, res) => {
        //     const email = req.params.email;
        //     if (req.decoded.email !== email) {
        //         return res
        //             .status(403)
        //             .send({ error: true, message: "forbidden access" });
        //     }
        //     const query = { email: email };
        //     const result = await userCollection.findOne(query);
        //     res.send(result);
        // });

        // app.post("/users", async (req, res) => {
        //     const user = req.body;
        //     const query = { email: user.email };
        //     const isExist = await userCollection.findOne(query);

        //     if (isExist) {
        //         return res.send({ message: "user exist" });
        //     }

        //     const result = await userCollection.insertOne(user);
        //     res.send(result);
        // });

        // app.patch("/users/:email", async (req, res) => {
        //     const user = req.body;
        //     const filter = { email: req.params.email };
        //     const query = { email: req.params.email };
        //     const updateDoc = {
        //         $set: {
        //             ...user,
        //         },
        //     };

        //     const isExist = await userCollection.findOne(query);

        //     if (isExist?.phone) {
        //         return res.send({ message: "user exist" });
        //     }

        //     const result = await userCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // });

        // // user profile
        // app.get("/user-profile/:id", verifyJWT, async (req, res) => {
        //     try {
        //         const userId = req.params.id;

        //         const [mcqSolved, totalExam, totalLiveExam, totalRapidExam] =
        //             await Promise.all([
        //                 examsCollection.countDocuments({ student: userId }),

        //                 examsCollection
        //                     .aggregate([
        //                         { $match: { student: userId } },
        //                         { $group: { _id: "$exam" } },
        //                         { $count: "totalExam" },
        //                     ])
        //                     .toArray()
        //                     .then((result) =>
        //                         result[0] ? result[0].totalExam : 0
        //                     ),

        //                 examsCollection
        //                     .aggregate([
        //                         {
        //                             $match: {
        //                                 student: userId,
        //                                 examType: "live",
        //                             },
        //                         },
        //                         { $group: { _id: "$exam" } },
        //                         { $count: "totalLiveExam" },
        //                     ])
        //                     .toArray()
        //                     .then((result) =>
        //                         result[0] ? result[0].totalLiveExam : 0
        //                     ),

        //                 examsCollection
        //                     .aggregate([
        //                         {
        //                             $match: {
        //                                 student: userId,
        //                                 examType: "rapid",
        //                             },
        //                         },
        //                         { $group: { _id: "$exam" } },
        //                         { $count: "totalRapidExam" },
        //                     ])
        //                     .toArray()
        //                     .then((result) =>
        //                         result[0] ? result[0].totalRapidExam : 0
        //                     ),
        //             ]);

        //         res.json({
        //             mcqSolved,
        //             totalExam,
        //             totalLiveExam,
        //             totalRapidExam,
        //         });
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Internal Server Error");
        //     }
        // });

        // jwt
        // app.post("/jwt", (req, res) => {
        //     const user = req.body;
        //     const result = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn: "1h",
        //     });
        //     res.send({ token: result });
        // });

        // subjects
        // app.get("/subjects", async (req, res) => {
        //     const result = await subjectsCollection
        //         .find()
        //         .skip(4)
        //         .limit(8)
        //         .sort({ _id: 1 })
        //         .toArray();
        //     res.send(result);
        // });

        // // subjects by slug
        // app.get("/subjects/:slug", async (req, res) => {
        //     const slug = req.params.slug;
        //     const query = { slug: slug };
        //     const result = await subjectsCollection.findOne(query);
        //     res.send(result);
        // });

        // // tags
        // app.get("/tags", verifyJWT, async (req, res) => {
        //     const tags = await tagsCollection.find().toArray();
        //     const result = await Promise.all(
        //         tags.map(async (tag) => {
        //             if (tag?.subject) {
        //                 const subjectName = await subjectsCollection.findOne(
        //                     { slug: tag.subject },
        //                     { projection: { name: 1, paper: 1 } }
        //                 );

        //                 tag = {
        //                     ...tag,
        //                     subjectName:
        //                         subjectName.name + " " + subjectName.paper,
        //                 };
        //             }

        //             if (tag?.college) {
        //                 const collegeName = await tagsCollection.findOne(
        //                     { slug: tag.college },
        //                     { projection: { name: 1 } }
        //                 );

        //                 tag = {
        //                     ...tag,
        //                     collegeName: collegeName.name,
        //                 };
        //             }

        //             if (tag?.board) {
        //                 const boardName = await tagsCollection.findOne(
        //                     { slug: tag.board },
        //                     { projection: { name: 1 } }
        //                 );

        //                 tag = {
        //                     ...tag,
        //                     boardName: boardName.name,
        //                 };
        //             }

        //             return {
        //                 ...tag,
        //             };
        //         })
        //     );

        //     res.send(result);
        // });

        // // tags board type
        // app.get("/tags/boards", async (req, res) => {
        //     const result = await tagsCollection
        //         .find({ type: "board" })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags college type
        // app.get("/tags/colleges", async (req, res) => {
        //     const result = await tagsCollection
        //         .find({ type: "college" })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags college type
        // app.get("/tags/exams", async (req, res) => {
        //     const result = await tagsCollection
        //         .find({ type: "exam" })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags college type by year
        // app.get("/tags/exams/:subject/:college", async (req, res) => {
        //     const subject = req.params.subject;
        //     const college = req.params.college;
        //     const result = await tagsCollection
        //         .find({ type: "exam", subject: subject, college: college })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags college type by year
        // app.get("/tags/exams/:subject/:college/:search", async (req, res) => {
        //     const subject = req.params.subject;
        //     const college = req.params.college;
        //     const search = req.params.search;
        //     const regex = new RegExp(search, "i");
        //     const result = await tagsCollection
        //         .find({
        //             type: "exam",
        //             subject: subject,
        //             college: college,
        //             $or: [{ name: regex }, { bnName: regex }],
        //         })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags book type
        // app.get("/tags/books", async (req, res) => {
        //     const result = await tagsCollection
        //         .find({ type: "book" })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags year type
        // app.get("/tags/years", async (req, res) => {
        //     const result = await tagsCollection
        //         .find({ type: "year" })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags year type by board
        // app.get("/tags/years/:board", async (req, res) => {
        //     const board = req.params.board;
        //     const result = await tagsCollection
        //         .find({ type: "year", board: board })
        //         .toArray();
        //     res.send(result);
        // });

        // // tags chapters type
        // app.get("/tags/chapters/subject/:subject", async (req, res) => {
        //     const subject = req.params.subject;
        //     const query = { type: "chapter", subject: subject };
        //     const result = await tagsCollection.find(query).toArray();
        //     res.send(result);
        // });

        // // tags by slug
        // app.get("/tags/:slug", async (req, res) => {
        //     const slug = req.params.slug;
        //     const query = { slug: slug };
        //     const result = await tagsCollection.findOne(query);
        //     console.log("result from app.js line 490",result)
        //     if (result.college) {
        //         const collegeDetails = await tagsCollection.findOne({
        //             slug: result.college,
        //         });

        //         const modifiedcollege = {
        //             value: collegeDetails.slug,
        //             label: collegeDetails.name,
        //         };

        //         result.college = modifiedcollege;
        //     }

        //     res.send(result);
        // });

        // // tags by slug array
        // app.get("/tags/array/:slug", async (req, res) => {
        //     const slugArray = req.params.slug.split(",");
        //     const query = { slug: { $in: slugArray } };
        //     const result = await tagsCollection.find(query).toArray();
        //     res.send(result);
        // });

        // // tags add
        // app.post("/tags", verifyJWT, async (req, res) => {
        //     const data = req.body;
        //     let isExist = await tagsCollection.findOne({ slug: data.slug });
        //     if (isExist) {
        //         do {
        //             const randomBytes = crypto.randomBytes(6).toString("hex");
        //             data.slug += `-${randomBytes}`;
        //             isExist = await tagsCollection.findOne({ slug: data.slug });
        //         } while (isExist);
        //     }
        //     const result = await tagsCollection.insertOne(data);
        //     res.send(result);
        // });

        // // tags edit
        // app.patch("/tags/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const newTag = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const query = {
        //         $set: {
        //             ...newTag,
        //         },
        //     };
        //     const result = await tagsCollection.updateOne(filter, query);
        //     res.send(result);
        // });

        // // tags delete
        // app.delete("/tags/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await tagsCollection.deleteOne(query);
        //     res.send(result);
        // });

        // const storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, "public/questionImages");
        //     },
        //     filename: (req, file, cb) => {
        //         cb(
        //             null,
        //             crypto.randomBytes(4).toString("hex") +
        //                 "-" +
        //                 Date.now() +
        //                 path.extname(file.originalname)
        //         );
        //     },
        // });

        // const upload = multer({ storage });

        // // media add
        // app.post("/media",
        //     verifyJWT,
        //     upload.single("file"),
        //     async (req, res) => {
        //         const data = {
        //             image: "questionImages/" + req.file.filename,
        //         };
        //         const result = await mediaCollection.insertOne(data);
        //         res.send(result);
        //     }
        // );

        // // images
        // app.get("/media", async (req, res) => {
        //     const { page, limit } = req.query;
        //     const skip = parseInt(page) * parseInt(limit);
        //     const result = await mediaCollection
        //         .find()
        //         .sort({ _id: -1 })
        //         .skip(skip)
        //         .limit(parseInt(limit))
        //         .toArray();
        //     res.send(result);
        // });

        // // media delete
        // app.delete("/media/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const data = await mediaCollection.findOne(query);
        //     fs.unlinkSync(`public/${data.image}`);
        //     const result = await mediaCollection.deleteOne(query);
        //     res.send(result);
        // });

        // // total questions
        // app.get("/total-questions", async (req, res) => {
        //     try {
        //         const totalQuestions =
        //             await questionsCollection.countDocuments();

        //         res.send({ result: totalQuestions });
        //     } catch (error) {
        //         console.error("Error fetching questions:", error);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // // exist subject questions
        // app.post("/exist-subject-questions", async (req, res) => {
        //     try {
        //         const subjects = req.body.subjects;
        //         const tag = req.body.tag;
        //         const result = {};
        //         await Promise.all(
        //             subjects.map(async (s) => {
        //                 const count = await questionsCollection.countDocuments({
        //                     subject: s,
        //                     tags: tag,
        //                 });

        //                 result[s] = count;
        //             })
        //         );

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching questions:", error);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // // questions
        // app.get("/questions", async (req, res) => {
        //     const { subject } = req.query;
        //     let query = {};
        //     if (subject) {
        //         query.subject = subject;
        //     }
        //     let result = [];
        //     try {
        //         const totalQuestions = await questionsCollection.countDocuments(
        //             query
        //         );

        //         if (totalQuestions > 0) {
        //             const questions = await questionsCollection
        //                 .find(query)
        //                 .toArray();

        //             await Promise.all(
        //                 questions.map(async (question) => {
        //                     const tags = await tagsCollection
        //                         .find(
        //                             { slug: { $in: question.tags } },
        //                             { name: 1, bnName: 1, slug: 1, type: 1 }
        //                         )
        //                         .toArray();
        //                     question.tags = tags.map((tag) => ({
        //                         value: tag.slug,
        //                         label: tag.name,
        //                         bnLabel: tag.bnName,
        //                         type: tag.type,
        //                     }));
        //                 })
        //             );

        //             result = questions;
        //         }

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching questions:", error);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // // questions
        // app.post("/questions/subject/tags", async (req, res) => {
        //     const { subject, tags } = req.body;
        //     let query = {};
        //     if (subject) {
        //         query.subject = subject;
        //     }
        //     if (tags) {
        //         query.tags = { $all: tags };
        //     }
        //     let result = [];
        //     try {
        //         const totalQuestions = await questionsCollection.countDocuments(
        //             query
        //         );

        //         console.log(totalQuestions);

        //         if (totalQuestions > 0) {
        //             const questions = await questionsCollection
        //                 .find(query)
        //                 .toArray();

        //             await Promise.all(
        //                 questions.map(async (question) => {
        //                     const tags = await tagsCollection
        //                         .find(
        //                             { slug: { $in: question.tags } },
        //                             { name: 1, bnName: 1, slug: 1, type: 1 }
        //                         )
        //                         .toArray();
        //                     question.tags = tags.map((tag) => ({
        //                         value: tag.slug,
        //                         label: tag.name,
        //                         bnLabel: tag.bnName,
        //                         type: tag.type,
        //                     }));
        //                 })
        //             );

        //             result = questions;
        //         }

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching questions:", error);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // app.post("/questions/exam", async (req, res) => {
        //     let { questionIds } = req.body;

        //     try {
        //         questionIds = questionIds.map((id) => new ObjectId(id));
        //     } catch (error) {
        //         console.error("Invalid ObjectId format:", error);
        //         return res.status(400).send("Invalid question ID format");
        //     }

        //     const query = { _id: { $in: questionIds } };

        //     try {
        //         const questions = await questionsCollection
        //             .find(query)
        //             .toArray();

        //         await Promise.all(
        //             questions.map(async (question) => {
        //                 const tags = await tagsCollection
        //                     .find(
        //                         { slug: { $in: question.tags } },
        //                         {
        //                             projection: {
        //                                 name: 1,
        //                                 bnName: 1,
        //                                 slug: 1,
        //                                 type: 1,
        //                             },
        //                         }
        //                     )
        //                     .toArray();

        //                 question.tags = tags.map((tag) => ({
        //                     value: tag.slug,
        //                     label: tag.name,
        //                     bnLabel: tag.bnName,
        //                     type: tag.type,
        //                 }));
        //             })
        //         );

        //         res.send(questions);
        //     } catch (error) {
        //         console.error("Error fetching questions:", error.message);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // // questions bank by subject
        // app.get("/questions/filter", verifyJWT, async (req, res) => {
        //     let { page, limit } = req.query;
        //     const { subject, tag } = req.query;
        //     let query = {};
        //     if (subject) {
        //         query.subject = subject;
        //     }
        //     if (tag) {
        //         query.tags = { $in: typeof tag === "string" ? [tag] : tag };
        //     }
        //     page = parseInt(page);
        //     limit = parseInt(limit);
        //     const skip = page * limit;

        //     try {
        //         const totalQuestions = await questionsCollection.countDocuments(
        //             query
        //         );
        //         const result = {
        //             totalQuestions: totalQuestions,
        //             questions: [],
        //         };

        //         if (totalQuestions > 0) {
        //             const questions = await questionsCollection
        //                 .find(query)
        //                 .sort({ insertDate: -1 })
        //                 .skip(skip)
        //                 .limit(limit)
        //                 .toArray();

        //             await Promise.all(
        //                 questions.map(async (question) => {
        //                     const tags = await tagsCollection
        //                         .find(
        //                             { slug: { $in: question.tags } },
        //                             { name: 1, slug: 1 }
        //                         )
        //                         .toArray();
        //                     question.tags = tags.map((tag) => ({
        //                         value: tag.slug,
        //                         label: tag.name,
        //                     }));
        //                 })
        //             );

        //             result.questions = questions;
        //         }

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching questions:", error);
        //         res.status(500).send("Error fetching questions");
        //     }
        // });

        // // questions by id
        // app.get("/questions/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await questionsCollection.findOne(query);
        //     const tagDetails = await Promise.all(
        //         result.tags.map(async (tagSlug) => {
        //             const tag = await tagsCollection.findOne(
        //                 { slug: tagSlug },
        //                 { name: 1, slug: 1 }
        //             );

        //             if (tag?.subject) {
        //                 const subjectName = await subjectsCollection.findOne(
        //                     { slug: tag.subject },
        //                     { projection: { name: 1, paper: 1 } }
        //                 );

        //                 tag.subjectName =
        //                     subjectName.name + " " + subjectName.paper;
        //             }

        //             if (tag?.college) {
        //                 const collegeName = await tagsCollection.findOne(
        //                     { slug: tag.college },
        //                     { projection: { name: 1 } }
        //                 );

        //                 tag.collegeName = collegeName.name;
        //             }

        //             if (tag?.board) {
        //                 const boardName = await tagsCollection.findOne(
        //                     { slug: tag.board },
        //                     { projection: { name: 1 } }
        //                 );

        //                 tag.boardName = boardName.name;
        //             }

        //             if (tag?.college) {
        //                 return {
        //                     value: tag.slug,
        //                     label:
        //                         tag.name +
        //                         " | " +
        //                         tag.collegeName +
        //                         " | " +
        //                         tag.subjectName,
        //                 };
        //             } else if (tag?.board) {
        //                 return {
        //                     value: tag.slug,
        //                     label: tag.name + " | " + tag.boardName,
        //                 };
        //             } else {
        //                 return { value: tag.slug, label: tag.name };
        //             }
        //         })
        //     );

        //     const modifiedTags = tagDetails.map((tag) => ({
        //         value: tag.value,
        //         label: tag.label,
        //     }));

        //     result.tags = modifiedTags;
        //     res.send(result);
        // });

        // // questions bank by subject
        // app.get("/questions/bank/subject/:subject",
        //     verifyJWT,
        //     async (req, res) => {
        //         let { page, limit } = req.query;
        //         page = parseInt(page);
        //         limit = parseInt(limit);
        //         const skip = page * limit;
        //         const subject = req.params.subject;
        //         const query = { questionType: "bank", subject: subject };

        //         try {
        //             const totalQuestions =
        //                 await questionsCollection.countDocuments(query);
        //             const result = {
        //                 totalQuestions: totalQuestions,
        //                 questions: [],
        //             };

        //             if (totalQuestions > 0) {
        //                 const questions = await questionsCollection
        //                     .find(query)
        //                     .sort({ insertDate: -1 })
        //                     .skip(skip)
        //                     .limit(limit)
        //                     .toArray();

        //                 await Promise.all(
        //                     questions.map(async (question) => {
        //                         const tags = await tagsCollection
        //                             .find(
        //                                 { slug: { $in: question.tags } },
        //                                 { name: 1, slug: 1 }
        //                             )
        //                             .toArray();
        //                         question.tags = tags.map((tag) => ({
        //                             value: tag.slug,
        //                             label: tag.name,
        //                         }));
        //                     })
        //                 );

        //                 result.questions = questions;
        //             }

        //             res.send(result);
        //         } catch (error) {
        //             console.error("Error fetching questions:", error);
        //             res.status(500).send("Error fetching questions");
        //         }
        //     }
        // );

        // // questions add
        // app.post("/questions", verifyJWT, async (req, res) => {
        //     const data = req.body;
        //     const result = await questionsCollection.insertOne(data);
        //     res.send(result);
        // });

        // // question edit
        // app.patch("/questions/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const newQuestion = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const query = {
        //         $set: {
        //             questionImg: newQuestion.questionImg,
        //             question: newQuestion.question,
        //             options: newQuestion.options,
        //             correctAnswer: newQuestion.correctAnswer,
        //             book: newQuestion.book,
        //             chapter: newQuestion.chapter,
        //             tags: newQuestion.tags,
        //             explaination: newQuestion.explaination,
        //         },
        //     };
        //     const result = await questionsCollection.updateOne(filter, query);
        //     res.send(result);
        // });

        // // question delete
        // app.delete("/questions/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: new ObjectId(id) };
        //     const result = await questionsCollection.deleteOne(query);
        //     res.send(result);
        // });

        // // exam list fetch
        // app.get("/exams", verifyJWT, async (req, res) => {
        //     let { page, limit } = req.query;
        //     page = parseInt(page);
        //     limit = parseInt(limit);
        //     const skip = page * limit;
        //     try {
        //         const totalExams = await examListCollection.countDocuments();
        //         const result = {
        //             totalExams: totalExams,
        //             exams: [],
        //         };

        //         if (totalExams > 0) {
        //             const exams = await examListCollection
        //                 .find()
        //                 .sort({ insertDate: -1 })
        //                 .skip(skip)
        //                 .limit(limit)
        //                 .toArray();

        //             result.exams = exams;
        //         }

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching exams:", error);
        //         res.status(500).send("Error fetching exams");
        //     }
        // });

        // // exam list fetch for users
        // app.get("/exams/type/:type/:privilege", verifyJWT, async (req, res) => {
        //     const { type, privilege } = req.params;

        //     const currentTime = moment().tz("Asia/Dhaka");
        //     const sixHoursAgo = currentTime.clone().subtract(24, "hours");
        //     const sixHoursLater = currentTime.clone().add(48, "hours");

        //     const query = {
        //         type: type,
        //         privilege: privilege,
        //         startTime: {
        //             $gte: sixHoursAgo.format("YYYY-MM-DDTHH:mm"),
        //             $lte: sixHoursLater.format("YYYY-MM-DDTHH:mm"),
        //         },
        //     };

        //     try {
        //         const result = await examListCollection
        //             .find(query)
        //             .sort({ startTime: -1 })
        //             .toArray();

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching exams:", error);
        //         res.status(500).send("Error fetching exams");
        //     }
        // });

        // // exam list fetch by id
        // app.get("/exams/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     try {
        //         const result = await examListCollection.findOne({
        //             _id: new ObjectId(id),
        //         });

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching exam:", error);
        //         res.status(500).send("Error fetching exam");
        //     }
        // });

        // // exam list fetch by slug
        // app.get("/exams/slug/:slug", verifyJWT, async (req, res) => {
        //     const slug = req.params.slug;
        //     try {
        //         const result = await examListCollection.findOne({ slug: slug });
        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error fetching exam:", error);
        //         res.status(500).send("Error fetching exam");
        //     }
        // });

        // // exam list add
        // app.post("/exams", verifyJWT, async (req, res) => {
        //     const data = req.body;
        //     let isExist = await examListCollection.findOne({ slug: data.slug });
        //     if (isExist) {
        //         do {
        //             const randomBytes = crypto.randomBytes(6).toString("hex");
        //             data.slug += `-${randomBytes}`;
        //             isExist = await examListCollection.findOne({
        //                 slug: data.slug,
        //             });
        //         } while (isExist);
        //     }
        //     const result = await examListCollection.insertOne(data);
        //     res.send(result);
        // });

        // // exam edit
        // app.patch("/exams/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const newExams = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const query = {
        //         $set: {
        //             ...newExams,
        //         },
        //     };
        //     const result = await examListCollection.updateOne(filter, query);
        //     res.send(result);
        // });

        // // exam add or edit questions
        // app.patch("/exams/questions/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const newExams = req.body;
        //     const filter = { _id: new ObjectId(id) };
        //     const query = {
        //         $set: {
        //             questions: newExams,
        //         },
        //     };
        //     const result = await examListCollection.updateOne(filter, query);
        //     res.send(result);
        // });

        // // exam list fetch by slug
        // app.delete("/exams/:id", verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     try {
        //         const result = await examListCollection.deleteOne({
        //             _id: new ObjectId(id),
        //         });

        //         res.send(result);
        //     } catch (error) {
        //         console.error("Error delete exam:", error);
        //         res.status(500).send("Error delete exam");
        //     }
        // });

        // // exam regular
        // app.post("/exam/regular", verifyJWT, async (req, res) => {
        //     try {
        //         const examData = req.body;
        //         const questionIds = examData.map(
        //             (data) => new ObjectId(data.question)
        //         );
        //         const { exam, student, positiveMarking, negativeMarking } =
        //             examData[0];

        //         const questions = await questionsCollection
        //             .find({ _id: { $in: questionIds } })
        //             .toArray();

        //         const questionMap = questions.reduce((map, question) => {
        //             map[question._id] = question;
        //             return map;
        //         }, {});

        //         let totalGainedMarks = 0;

        //         examData.forEach((data) => {
        //             const question = questionMap[data.question];
        //             if (question) {
        //                 let gainedMark = 0;
        //                 if (question.correctAnswer === "Auto") {
        //                     gainedMark = parseFloat(positiveMarking) || 1;
        //                 } else if (data.answer === "") {
        //                     gainedMark = 0;
        //                 } else if (question.correctAnswer === data.answer) {
        //                     gainedMark = parseFloat(positiveMarking) || 1;
        //                 } else {
        //                     gainedMark = parseFloat(negativeMarking) || 0;
        //                 }
        //                 data.mark = gainedMark;

        //                 totalGainedMarks += gainedMark;
        //             }
        //         });

        //         const existingExam = await examsCollection.findOne({
        //             exam,
        //             student: student,
        //         });

        //         if (!existingExam) {
        //             await examsCollection.insertMany(examData);

        //             await Promise.all(
        //                 questionIds.map((id) =>
        //                     questionsCollection.updateOne(
        //                         { _id: id },
        //                         { $inc: { views: 1 } }
        //                     )
        //                 )
        //             );
        //         }

        //         res.send({ totalGainedMarks, examData });
        //     } catch (error) {
        //         console.error("Error processing exam data:", error);
        //         res.status(500).send({ message: "Internal server error" });
        //     }
        // });

        // // exam scoreboard
        // app.get("/exam-scoreboard/:examSlug", verifyJWT, async (req, res) => {
        //     try {
        //         const examSlug = req.params.examSlug;
        //         const toppers = await examsCollection
        //             .aggregate([
        //                 {
        //                     $match: {
        //                         exam: examSlug,
        //                     },
        //                 },
        //                 {
        //                     $group: {
        //                         _id: "$student",
        //                         totalMarks: { $sum: "$mark" },
        //                         totalDuration: {
        //                             $sum: { $ifNull: ["$duration", 0] },
        //                         },
        //                     },
        //                 },
        //                 {
        //                     $sort: { totalMarks: -1 },
        //                 },
        //             ])
        //             .toArray();

        //         if (toppers.length === 0) {
        //             res.json([]);
        //             return;
        //         }

        //         const studentIds = toppers.map(
        //             (topper) => new ObjectId(topper._id)
        //         );
        //         const students = await userCollection
        //             .find({ _id: { $in: studentIds } })
        //             .toArray();

        //         const result = toppers.map((topper) => {
        //             const student = students.find((student) =>
        //                 student._id.equals(new ObjectId(topper._id))
        //             );
        //             return {
        //                 name: student.name,
        //                 college: student.college,
        //                 profileImg: student.profileImg,
        //                 marks: topper.totalMarks,
        //                 duration: topper.totalDuration,
        //             };
        //         });

        //         res.json(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Internal Server Error");
        //     }
        // });





        // // monthly topper
        // app.get("/monthly-toppers", authMiddleware.verifyJWT, async (req, res) => {
        //     try {
        //         const currentDate = new Date();
        //         const firstDayOfMonth = new Date(
        //             currentDate.getFullYear(),
        //             currentDate.getMonth(),
        //             1
        //         );
        //         const lastDayOfMonth = new Date(
        //             currentDate.getFullYear(),
        //             currentDate.getMonth() + 1,
        //             0
        //         );

        //         firstDayOfMonth.setUTCHours(0, 0, 0, 0);
        //         lastDayOfMonth.setUTCHours(23, 59, 59, 999);

        //         const toppers = await examsCollection
        //             .aggregate([
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $gt: ["$mark", 0] },
        //                                 {
        //                                     $gte: [
        //                                         { $toDate: "$startTime" },
        //                                         firstDayOfMonth,
        //                                     ],
        //                                 },
        //                                 {
        //                                     $lt: [
        //                                         { $toDate: "$startTime" },
        //                                         lastDayOfMonth,
        //                                     ],
        //                                 },
        //                             ],
        //                         },
        //                     },
        //                 },
        //                 {
        //                     $group: {
        //                         _id: "$student",
        //                         correctAnswers: { $sum: 1 },
        //                     },
        //                 },
        //                 {
        //                     $sort: { correctAnswers: -1 },
        //                 },
        //                 {
        //                     $limit: 10,
        //                 },
        //             ])
        //             .toArray();

        //             console.log("toppers",toppers)

        //         const studentIds = toppers.map(
        //             (topper) => new ObjectId(topper._id)
        //         );
        //         const students = await userCollection
        //             .find({ _id: { $in: studentIds } })
        //             .toArray();

        //         const result = toppers.map((topper) => {
        //             const student = students.find((student) =>
        //                 student._id.equals(new ObjectId(topper._id))
        //             );
        //             return {
        //                 name: student.name,
        //                 college: student.college,
        //                 profileImg: student.profileImg,
        //                 correctAnswers: topper.correctAnswers,
        //             };
        //         });

        //         res.json(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).send("Internal Server Error");
        //     }
        // });

        // top solved colleges
        // app.get("/top-solved-colleges", async (req, res) => {
        //     try {
        //         const questions = await questionsCollection
        //             .find({ tags: { $regex: "college", $options: "i" } })
        //             .toArray();

        //         const collegeTags = questions.reduce((tags, question) => {
        //             tags.push(
        //                 ...question.tags.filter((tag) =>
        //                     tag.includes("college")
        //                 )
        //             );
        //             return tags;
        //         }, []);

        //         const topColleges = await tagsCollection
        //             .find({ type: "college", slug: { $in: collegeTags } })
        //             .toArray();

        //         const collegeCounts = topColleges.reduce((counts, college) => {
        //             counts[college.slug] = collegeTags.filter(
        //                 (tag) => tag === college.slug
        //             ).length;
        //             return counts;
        //         }, {});

        //         console.log("collegeCounts", collegeCounts)
        //         const sortedColleges = Object.entries(collegeCounts)
        //             .sort(([, countA], [, countB]) => countB - countA)
        //             .slice(0, 10)
        //             .map(([slug, count]) => ({
        //                 slug,
        //                 count,
        //                 ...topColleges.find((college) => college.slug === slug),
        //             }));

        //         console.log("sortedColleges", sortedColleges)
        //         res.json(sortedColleges);
        //     } catch (error) {
        //         console.error("Error fetching top solved colleges:", error);
        //         res.status(500).json({ message: "Internal server error" });
        //     }
        // });

        // top solved exams
        // app.get("/top-solved-exams", async (req, res) => {
        //     try {
        //         const questions = await questionsCollection
        //             .find({ tags: { $regex: "exam", $options: "i" } })
        //             .toArray();

        //         const examsTags = questions.reduce((tags, question) => {
        //             tags.push(
        //                 ...question.tags.filter((tag) => tag.includes("exam"))
        //             );
        //             return tags;
        //         }, []);

        //         const topExams = await tagsCollection
        //             .find({ type: "exam", slug: { $in: examsTags } })
        //             .toArray();

        //         await Promise.all(
        //             topExams.map(async (exam) => {
        //                 const college = await tagsCollection.findOne(
        //                     { slug: exam.college },
        //                     { name: 1, slug: 1 }
        //                 );
        //                 console.log("exam",exam)
        //                 console.log("college",college)
        //                 exam.collegeName = college.name;
        //                 console.log("exam",exam)
        //             })
        //         );
        //         console.log("topExams", topExams)

        //         const examCounts = topExams.reduce((counts, exam) => {
        //             counts[exam.slug] = examsTags.filter(
        //                 (tag) => tag === exam.slug
        //             ).length;
        //             return counts;
        //         }, {});

        //         console.log("examCounts", examCounts)

        //         const sortedExams = Object.entries(examCounts)
        //             .sort(([, countA], [, countB]) => countB - countA)
        //             .slice(0, 10)
        //             .map(([slug, count]) => ({
        //                 slug,
        //                 count,
        //                 ...topExams.find((exam) => exam.slug === slug),
        //             }));

        //         console.log("sortedExams", sortedExams)

        //         res.json(sortedExams);
        //     } catch (error) {
        //         console.error("Error fetching top solved Exams:", error);
        //         res.status(500).json({ message: "Internal server error" });
        //     }
        // });

        // // districts
        // app.get("/districts", async (req, res) => {
        //     const result = await districtCollection.find().toArray();
        //     res.send(result);
        // });

        // await client.db("admin").command({ ping: 1 });
        // console.log(
        //     "Pinged your deployment. You successfully connected to MongoDB!"
        // );
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);
const { connectToDatabase } = require("./repositories/hlwidiots/mongoDB")
app.listen(port, () => {
    connectToDatabase()
    console.log(`HLW Idiots server is listening on port ${port}`);
});
