const User = require("../../models/user");

async function getJams(req, res) {
    try {
        if (!req.user) {
            throw new Error();
        }
        const user = await User.findOne({ id: req.user.id });
        const jamList = user.jams;
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
