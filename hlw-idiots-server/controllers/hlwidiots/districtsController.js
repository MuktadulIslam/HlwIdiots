const DistrictCollection = require("../../repositories/hlwidiots/models/Districts")

async function getDistricts(req, res) {
    try {
        const result = await DistrictCollection.find();
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
}


module.exports = {
    getDistricts
};