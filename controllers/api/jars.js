const User = require("../../models/user");
const Jar = require("../../models/jar");

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

async function createJar(req, res) {
    try {
        const jar = await Jar.create(req.body);
        console.log(jar);
    } catch (err) {
        console.log(
            `The error from createJar() in the jar controller is: ${err}`
        );
    }
}

module.exports = {
    getJars,
    createJar,
};
