const jwt = require("jsonwebtoken");
const {JWT} = require("../config/system-config.js")
const AdminCollection = require('../repositories/hlwidiots/models/AdminUser.js')

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res
            .status(401)
            .send({ error: true, message: "unauthorized permission" });
    }

    // bearer token
    const token = authorization.split(" ")[1];

    jwt.verify(token, JWT.secretKey, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .send({ error: true, message: "unauthorized permission" });
        }

        req.decoded = decoded;
        next();
    });
};


const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await AdminCollection.findOne(query);
    if (user?.role !== "Admin") {
        return res
            .status(403)
            .send({ error: true, message: "forbidden access" });
    }
    next();
};

const verifyQuestioner = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await AdminCollection.findOne(query);
    if (user?.role !== "Admin" && user?.role !== "Questioner") {
        return res
            .status(403)
            .send({ error: true, message: "forbidden access" });
    }
    next();
};


module.exports = {
    verifyJWT,
    verifyQuestioner,
    verifyAdmin
};