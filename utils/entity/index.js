const fromAuth = require("./auth");
const fromFeed = require("./feed");
const fromUser = require("./user");

exports.entities = {
  Auth: { ...fromAuth.AuthEntity },
  Feed: { ...fromFeed.Feed },
  User: { ...fromUser.User },
};
