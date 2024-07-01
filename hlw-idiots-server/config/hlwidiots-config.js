const dotenv = require('dotenv').config();

const DATABASE_URI = process.env.DATABASE_URI || "mongodb+srv://medigambitworkspace:mWumcof8T6GqE8lB@hlwidiotsdb.5cnjwze.mongodb.net/hlwIdiotsDB";

const ADMIN_TABLE = process.env.ADMIN_TABLE || "adminUsers";
const USER_TABLE = process.env.USER_TABLE || "users";
const BOARD_TABLE = process.env.BOARD_TABLE || "boards";
const BOARD_YEAR_TABLE = process.env.BOARD_YEAR_TABLE || "boardYears";
const SUBJECTS_TABLE = process.env.SUBJECTS_TABLE || "subjects";
const QUESTIONS_TABLE = process.env.QUESTIONS_TABLE || "questions";
const EXAMLIST_TABLE = process.env.EXAMLIST_TABLE || "examList";
const EXAM_TABLE = process.env.EXAM_TABLE || "exams";
const TAGS_TABLE = process.env.TAGS_TABLE || "tags";
const MEDIA_TABLE = process.env.MEDIA_TABLE || "media";
const DISTRICTS_TABLE = process.env.DISTRICTS_TABLE || "districts";


module.exports = {
    DATABASE_URI,
    ADMIN_TABLE,
    USER_TABLE,
    BOARD_TABLE,
    BOARD_YEAR_TABLE,
    SUBJECTS_TABLE,
    QUESTIONS_TABLE,
    EXAMLIST_TABLE,
    EXAM_TABLE,
    TAGS_TABLE,
    MEDIA_TABLE,
    DISTRICTS_TABLE
}