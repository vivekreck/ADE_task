const express = require("express");
const router = express.Router();

const feedController = require("../controllers").feed;
const isLogged = require('../middlewares/is-logged').isLogged;

// create 
router.post("/feed/create", isLogged, feedController.createFeed)

// update
router.patch("/feed/:uid", isLogged, feedController.updateFeed)

// delete
router.delete("/feed/:uid", isLogged, feedController.deleteFeed)

// read
router.get("/feed/fetch", isLogged, feedController.fetchAllFeed)

module.exports = router;
