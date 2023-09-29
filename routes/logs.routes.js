const express = require("express");
const router = express.Router();

const logsController = require("../controllers").logs;
const isLogged = require('../middlewares/is-logged').isLogged;

// superadmin only
router.get("/logs", isLogged, logsController.getLogs);


module.exports = router;
