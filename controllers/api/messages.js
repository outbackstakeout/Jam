const Message = require("../../models/message");

async function storeMessage(req, res) {
    try {
        const msg = await Message.create(req.body);
        console.log(
            `the message being stored in Mongo by storeMessage() in messages controller is: ${msg}`
        );
    } catch (err) {
        console.log(`storeMessage() error in messages controller: ${err}`);
    }
}


module.exports = {
    storeMessage,
}