const express = require("express");
const router = express.Router();

const userController = require("../controllers").user;
const isLogged = require('../middlewares/is-logged').isLogged;

// self
router.get("/user/:type", isLogged, userController.fetchAllUsers);

router.delete("/user/delete/:uid", isLogged, userController.deleteUser)



module.exports = router;
