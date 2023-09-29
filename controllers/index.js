const fromAuth = require("./auth.controllers");
const fromUser = require("./user.controllers");
const fromFeed = require("./feed.controllers");
const fromLogs = require("./logs.controllers");

const controllers = {
  auth: { ...fromAuth },
  user: { ...fromUser },
  feed: { ...fromFeed },
  logs: { ...fromLogs }
};

module.exports = controllers;
