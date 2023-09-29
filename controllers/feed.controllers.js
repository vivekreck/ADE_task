const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const { hashSync, compareSync } = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/app.config.json');

exports.fetchAllFeed = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const requestType = request.urlParams.type;

        const usersTable = db.methods.User({
            logger, CreateError
        });
        const feedsTable = db.methods.Feed({
            logger, CreateError
        });

        // authorization check
        const verifyUser = (await usersTable.findByEmail({
            email: res.locals.email,
        })).data.users;


        if (
            !verifyUser.permission ||
            !verifyUser.permission["feed"] ||
            !verifyUser.permission["feed"][0] ||
            verifyUser.permission["feed"][0].read == "") {
            throw new CreateError("You are not authorised to access this file")
        }

        let roleQuery = {};
        if (verifyUser.permission["feed"][0].read != "*") {
            query = {
                uid: verifyUser.permission["feed"][0].read.split(",")
            }
        }

        // check for the email available or not
        const findFeed = (await feedsTable.findAll(roleQuery)).data.feeds;

        return res.status(200).json({
            msg: "Success",
            data: {
                feeds: findFeed,
            },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};