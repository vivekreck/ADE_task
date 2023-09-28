const express = require("express");
const router = express.Router();

const auhtController = require("../controllers").auth;


// self
router.post("/auth/signup/:type", auhtController.postSignup);


module.exports = router;
