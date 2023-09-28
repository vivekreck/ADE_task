const fromUser = require("./user");
const fromRole = require("./role");

exports.methods = {
  User: fromUser.User,
  Role: fromRole.Role,
};
