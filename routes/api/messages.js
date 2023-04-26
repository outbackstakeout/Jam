const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages");

// All paths start with '/api/messages'

router.get("/", messagesCtrl.getMessages);

module.exports = router;
