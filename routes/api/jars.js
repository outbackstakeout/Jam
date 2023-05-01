const express = require("express");
const router = express.Router();
const jarsCtrl = require("../../controllers/api/jars");

// All paths start with '/api/jars'

router.get("/", jarsCtrl.getJars);
router.post("/create", jarsCtrl.createJar);

module.exports = router;
