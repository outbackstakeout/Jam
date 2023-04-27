const User = require("../../models/user");

async function getJars(req, res) {
    try {
        if (!req.user) {
            throw new Error();
        }
        const user = await User.findOne({ id: req.user.id });
        const jarList = user.jars;
        res.json(jarList);
    } catch (err) {
        console.log(
            `The error from getJars() in the jars controller is: ${err}`
        );
    }
}

module.exports = {
    getJars,
};
