const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const APP_CONFIG = require("../config/app.config.json");

const cookieName = APP_CONFIG.cookie.name;
const cookieConfig = {
    maxAge: parseInt(APP_CONFIG.cookie.config.maxAge),
    httpOnly: APP_CONFIG.cookie.config.httpOnly,
    secure: APP_CONFIG.cookie.config.secure,
    sameSite: APP_CONFIG.cookie.config.sameSite,
};

exports.postSignup = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        console.log(request)
        return res.status(200).json({
            msg: "User created successfully",
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
