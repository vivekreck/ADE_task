const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const { hashSync, compareSync } = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/app.config.json');

exports.fetchAllUsers = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const requestType = request.urlParams.type;

        const usersTable = db.methods.User({
            logger, CreateError
        });

        // authorization check
        const verifyUser = (await usersTable.findByEmail({
            email: res.locals.email,
        })).data.users;

        if (verifyUser === null ||
            !verifyUser.role ||
            !(verifyUser.role.superadmin || verifyUser.role.admin) ||
            !verifyUser.permission ||
            verifyUser.permission[requestType][0].read == "") {
            throw new CreateError("You are not authorised to access this file")
        }

        let query = {};
        if (verifyUser.permission[requestType][0].read != "*") {
            query = {
                uid: verifyUser.permission[requestType][0].read.split(",")
            }
        }
        // check for the email available or not
        const findUser = (await usersTable.findAll(query)).data.users;

        if (findUser === null) {
            throw new CreateError("Invalid Login details")
        }

        return res.status(200).json({
            msg: "Success",
            data: {
                user: findUser,
            },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};