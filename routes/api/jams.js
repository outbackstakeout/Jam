const express = require("express");
const router = express.Router();
const jamsCtrl = require("../../controllers/api/jams");

// All paths start with '/api/jams'

router.get("/", jamsCtrl.getJams);

module.exports = router;
