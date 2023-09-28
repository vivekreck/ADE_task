const fromAuth = require("./auth.controllers");
const fromUser = require("./user.controllers");

const controllers = {
  auth: { ...fromAuth },
  user: { ...fromUser },
};

module.exports = controllers;
