const { ObjectId } = require("mongodb");
const AdminCollection = require("../../repositories/hlwidiots/models/AdminUser.js")

async function getAdminUsers(req, res) {
    try {
        const result = await AdminCollection.find({ email: { $ne: "hasancodebd@gmail.com" } });
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAdminUsersByID(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await AdminCollection.findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function getAdminUsersByEmail(req, res) {
    try {
        const email = req.params.email;
        if (req.decoded.email !== email) {
            return res
                .status(403)
                .send({ error: true, message: "forbidden access" });
        }
        const query = {
            email: email,
            role: { $in: ["Admin", "Questioner"] },
            status: "Active",
        };
        const result = await AdminCollection.findOne(query);
        if (result) {
            return res.send({
                ...result,
                isAdmin: true,
            });
        } else {
            return res.send({
                isAdmin: false,
            });
        }
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function setAdminUsers(req, res) {
    try {
        const user = req.body;
        const query = { email: user.email };
        const isExist = await AdminCollection.findOne(query);

        if (isExist) {
            return res.send({ error: true, message: "user exist" });
        }

        const result = await AdminCollection.insertOne(user);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function setAdminUsersByID(req, res) {
    try {
        const id = req.params.id;
        const newUser = req.body;
        const filter = { _id: new ObjectId(id) };
        const query = {
            $set: {
                name: newUser.name,
                phone: newUser.phone,
                role: newUser.role,
                status: newUser.status,
            },
        };
        const result = await AdminCollection.updateOne(filter, query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function deleteAdminUsersByID(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await AdminCollection.deleteOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    getAdminUsers,
    getAdminUsersByEmail,
    getAdminUsersByID,
    setAdminUsers,
    setAdminUsersByID,
    deleteAdminUsersByID
};