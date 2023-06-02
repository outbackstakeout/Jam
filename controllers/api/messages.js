const Message = require("../../models/message");

async function getMessages(req, res) {
    try {
        const msgLog = await Message.find({});
        res.json(msgLog);
    } catch (err) {
        console.log(
            `The error from getMessages() in the controllers/api/messages is: ${err}`
        );
    }
}

async function getJamMessages(req, res) {
    // console.log(
    //     `getJamMessages() in the Messages controller says the req.params.jamId is: ${req.params.jamName}`
    // );
    try {
        const msgLog = await Message.find({ jam: req.params.jamId });
        res.json(msgLog);
    } catch (err) {
        console.log(
            `The error from getJamMessages() in the messages controller is: ${err}`
        );
    }
}

module.exports = {
    getMessages,
    getJamMessages,
};
