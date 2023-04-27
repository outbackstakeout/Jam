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

module.exports = {
    getMessages,
};
