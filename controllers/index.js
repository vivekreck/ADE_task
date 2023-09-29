const fromAuth = require("./auth.controllers");
const fromUser = require("./user.controllers");
const fromFeed = require("./feed.controllers");

const controllers = {
  auth: { ...fromAuth },
  user: { ...fromUser },
  feed: { ...fromFeed }
};

module.exports = controllers;
