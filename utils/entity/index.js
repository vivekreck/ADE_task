const fromAuth = require("./auth");
const fromFeed = require("./feed");

exports.entities = {
  Auth: { ...fromAuth.AuthEntity },
  Feed: { ...fromFeed.Feed },
};
