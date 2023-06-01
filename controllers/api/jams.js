const Jar = require("../../models/jar");
const Jam = require("../../models/jam");

async function getJams(req, res) {
    console.log("📍 getJams() function in the jams controller");
    try {
        const jar = await Jar.findById(req.params.jarId).select("jams");

        const jamList = await Jam.find({ _id: { $in: jar.jams } });
        console.log(`Here's the jamList in jams controller: ${jamList}`);
        res.json(jamList);
    } catch (err) {
        console.log(
            `The error from getJams() in the jams controller is: ${err}`
        );
    }
}

module.exports = {
    getJams,
};
