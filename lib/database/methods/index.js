const fromUser = require("./user");
const fromRole = require("./role");
const fromPermission = require("./permission");

exports.methods = {
  User: fromUser.User,
  Role: fromRole.Role,
  Permission: fromPermission.Permission
};
