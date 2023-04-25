const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages");

// All paths start with '/api/messages'

router.post("/", messagesCtrl.storeMessage);

module.exports = router;
