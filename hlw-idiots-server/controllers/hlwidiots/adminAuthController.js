async function adminUsers(req, res) {
    try {
        const result = await adminCollection.find({ email: { $ne: "hasancodebd@gmail.com" } }).toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}

async function adminUsers(req, res) {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await adminCollection.findOne(query);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


export default {

};