import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        unique: true,
    },
    joinedDate: {
        type: String,
        required: true,
        unique: true,
    },
    college: {
        type: String,
        required: true,
        unique: true,
    },
    district: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    profileImg: {
        type: String,
        required: true,
        unique: true,
    },
    session: {
        type: String,
        required: true,
        unique: true,
    }
});

const User = mongoose.model("users", userSchema);

export default User;
