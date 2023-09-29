const fromUser = require("./user");
const fromRole = require("./role");
const fromPermission = require("./permission");
const fromFeed = require("./feed");

exports.methods = {
  User: fromUser.User,
  Role: fromRole.Role,
  Permission: fromPermission.Permission,
  Feed: fromFeed.Feed
};
