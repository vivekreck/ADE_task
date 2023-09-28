const express = require("express");
const router = express.Router();

const userController = require("../controllers").user;
const isLogged = require('../middlewares/is-logged').isLogged;

// self
router.get("/auth/user/:type", isLogged, userController.fetchAllUsers);




module.exports = router;
