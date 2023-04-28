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
        if (!req.user) {
            throw new Error();
        }
        console.log("🌈We hit the create jar function");
        const user = await User.findById(req.user._id);
        console.log(user);
        const jar = await Jar.create({ users: [user._id] });
        let jarArr = user.jars;
        jarArr.push(jar);
        user.jars = jarArr;
        await user.save();
        console.log(`The jar is: ${jar}`);
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
