const CONFIG = require("../config/app.config.json");
const jwt = require('jsonwebtoken')

module.exports.isLogged = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.send(401, {
      msg: 'Your authorization failed! You have to need to login again!'
    })
  }
  try {
    const token = authHeader.split(' ')[1];

    const decodedToken = await jwt.verify(token, CONFIG.jwt.jwt_secret);

    if (!decodedToken) {
      return res.send(401, {
        msg: 'Your authorization failed! You have to need to login again!',
        data: {}
      })
    }

    // Get required user details
    res.locals.email = decodedToken.email;

    next();
  } catch (error) {
    console.log(error)
    return res
      .send(401, { msg: 'Your authorization failed! You have to need to login again!', data: {} });
  }
};
