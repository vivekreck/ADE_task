const fromAuth = require("./auth");

exports.entities = {
  Auth: { ...fromAuth.AuthEntity },
};
