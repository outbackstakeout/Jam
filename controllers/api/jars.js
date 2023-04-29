const User = require("../../models/user");
const Jar = require("../../models/jar");

async function getJars(req, res) {
    try {
        if (!req.user) {
            throw new Error();
        }
        const user = await User.findById(req.user._id).select("jars");

        const jarList = await Jar.find({ _id: { $in: user.jars } });

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
        const jar = await Jar.create({ users: [user._id] });
        let jarArr = user.jars;
        jarArr.push(jar);
        user.jars = jarArr;
        await user.save();
        console.log(
            `createJar() function in jars controller says the jar is: ${jar}`
        );
        res.json(jar);
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
