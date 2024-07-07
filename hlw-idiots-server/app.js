const { connectToDatabase } = require("./repositories/hlwidiots/mongoDB")
const express = require("express");
const cors = require("cors");
require("dotenv").config();
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


app.get("/", (req, res) => {
    res.send("HLW Idiots server is running");
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

app.listen(port, () => {
    connectToDatabase()
    console.log(`HLW Idiots server is listening on port ${port}`);
});
