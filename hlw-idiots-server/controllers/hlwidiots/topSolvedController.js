const { ObjectId } = require("mongodb");
const ExamCollection = require("../../repositories/hlwidiots/models/Exams")
const UserCollection = require("../../repositories/hlwidiots/models/User")
const QuestionsCollection = require("../../repositories/hlwidiots/models/Questions")
const TagsCollection = require("../../repositories/hlwidiots/models/Tags")

async function getMonthlyToppers(req, res) {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        firstDayOfMonth.setUTCHours(0, 0, 0, 0);
        lastDayOfMonth.setUTCHours(23, 59, 59, 999);

        const toppers = await ExamCollection
            .aggregate([
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $gt: ["$mark", 0] },
                                {
                                    $gte: [
                                        { $toDate: "$startTime" },
                                        firstDayOfMonth,
                                    ],
                                },
                                {
                                    $lt: [
                                        { $toDate: "$startTime" },
                                        lastDayOfMonth,
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$student",
                        correctAnswers: { $sum: 1 },
                    },
                },
                {
                    $sort: { correctAnswers: -1 },
                },
                {
                    $limit: 10,
                },
            ])

        const studentIds = toppers.map((topper) => new ObjectId(topper._id));
        const students = await UserCollection.find({ _id: { $in: studentIds } })

        const result = toppers.map((topper) => {
            const student = students.find((student) =>
                student._id.equals(new ObjectId(topper._id))
            );

            return {
                name: student.name,
                college: student.college,
                profileImg: student.profileImg,
                correctAnswers: topper.correctAnswers,
            };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

async function getTopSolvedColleges(req, res) {
    try {
        // Step 1: Fetch questions containing "college" in tags
        const questions = await QuestionsCollection.find({ tags: { $regex: "college", $options: "i" } });

        // Step 2: Extract college tags from questions
        const collegeTags = questions.reduce((tags, question) => {
            tags.push(...question.tags.filter(tag => tag.includes("college")));
            return tags;
        }, []);

        // Step 3: Fetch top colleges based on the extracted tags
        const topColleges = await TagsCollection.find({ type: "college", slug: { $in: collegeTags } });

        // Step 4: Count occurrences of each college tag
        const collegeCounts = topColleges.reduce((counts, college) => {
            counts[college.slug] = collegeTags.filter(tag => tag === college.slug).length;
            return counts;
        }, {});

        // Step 5: Sort and format the result
        const sortedColleges = Object.entries(collegeCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 10)
            .map(([slug, count]) => {
                const college = topColleges.find(college => college.slug === slug);
                return {
                    slug,
                    count,
                    _id: college._id,
                    name: college.name,
                    bnName: college.bnName,
                    type: college.type,
                    createdBy: college.createdBy,
                    createdAt: college.createdAt,
                };
            });
        res.json(sortedColleges);
    } catch (error) {
        console.error("Error fetching top solved colleges:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getTopSolvedExams(req, res) {
    try {
        const questions = await QuestionsCollection.find({ tags: { $regex: "exam", $options: "i" } })
        const examsTags = questions.reduce((tags, question) => {
            tags.push(
                ...question.tags.filter((tag) => tag.includes("exam"))
            );
            return tags;
        }, []);

        const topExams = JSON.parse(JSON.stringify(await TagsCollection.find({ type: "exam", slug: { $in: examsTags } })));

        await Promise.all(
            topExams.map(async (exam) => {
                const college = await TagsCollection.findOne({ slug: exam.college });
                if(college){
                    exam.collegeName = college.name;
                }
            })
        );

        const examCounts = topExams.reduce((counts, exam) => {
            counts[exam.slug] = examsTags.filter(
                (tag) => tag === exam.slug
            ).length;
            return counts;
        }, {});

        const sortedExams = Object.entries(examCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 10)
            .map(([slug, count]) => ({
                slug,
                count,
                ...topExams.find((exam) => exam.slug === slug),
            }));

        res.json(sortedExams);
    } catch (error) {
        console.error("Error fetching top solved Exams:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getMonthlyToppers,
    getTopSolvedColleges,
    getTopSolvedExams
};