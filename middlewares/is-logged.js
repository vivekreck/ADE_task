const CreateError = require("../utils/error/dp-error").CreateError;
const CONFIG = require("../config/app.config.json");

const refreshTokenCookieName = CONFIG.cookie.name;

module.exports.isLogged = async (req, res, next) => {
  try {

  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Unknown error", data: {} });
  }
};
