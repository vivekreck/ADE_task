const express = require("express");
const router = express.Router();

const auhtController = require("../controllers").auth;
const isLogged = require('../middlewares/is-logged').isLogged;

// self
router.post("/auth/signup/self", auhtController.postSignupSelf);

// admin/user
router.post("/auth/signup/:type", isLogged, auhtController.postSignupOthers);


// login
router.post("/auth/login", auhtController.login);



module.exports = router;
