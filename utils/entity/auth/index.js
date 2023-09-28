let signup = require('./signup').SignupEntity;
let login = require('./login').LoginEntity;

exports.AuthEntity = {
    signupEntity: signup,
    loginEntity: login
}