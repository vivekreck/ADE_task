const express = require("express");
const router = express.Router();

const auhtController = require("../controllers").auth;


// self
router.post("/auth/signup/self", auhtController.postSignupSelf);


module.exports = router;
