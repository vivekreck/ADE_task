const express = require("express");
const router = express.Router();

const feedController = require("../controllers").feed;
const isLogged = require('../middlewares/is-logged').isLogged;

// create 
router.post("/auth/feed/create", isLogged, feedController.createFeed)

// update
router.patch("/auth/feed/:uid", isLogged, feedController.updateFeed)

// delete
router.delete("/auth/feed/:uid", isLogged, feedController.deleteFeed)

// read
router.get("/auth/feed/fetch", isLogged, feedController.fetchAllFeed)

module.exports = router;
