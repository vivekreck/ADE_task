let signup = require('./signup').SignupEntity;
let login = require('./login').LoginEntity;
let permission = require('./permission').PermissionEntity;

exports.AuthEntity = {
    signupEntity: signup,
    loginEntity: login,
    permissionEntity: permission
}