const connection = require("./connection");
const db = connection.db;

exports.models = {
  User: db.User,
  Role: db.Role,
  Permission: db.Permission,
  Feed: db.Feed
};
