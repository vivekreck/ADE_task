const express = require("express");
const router = express.Router();

const feedController = require("../controllers").feed;
const isLogged = require('../middlewares/is-logged').isLogged;

// create 
router.post("/auth/feed/create", isLogged)

// update
router.patch("/auth/feed/:id", isLogged)

// delete
router.delete("/auth/feed/:id", isLogged)

// read
router.get("/auth/feed/fetch", isLogged, feedController.fetchAllFeed)

module.exports = router;
