const fromAuth = require("./auth.controllers");

const controllers = {
  auth: { ...fromAuth },
};

module.exports = controllers;
