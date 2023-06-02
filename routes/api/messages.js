const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages");

// All paths start with '/api/messages'

// router.get("/", messagesCtrl.getMessages);   // we will never just need to retrieve all messages
router.get("/:jamId", messagesCtrl.getJamMessages);

module.exports = router;
