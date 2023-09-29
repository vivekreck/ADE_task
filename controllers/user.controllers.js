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

        const roleTable = db.methods.Role({
            logger, CreateError
        });
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

        let roleQuery = {};
        if (verifyUser.permission[requestType][0].read != "*") {
            roleQuery = {
                user_uid: verifyUser.permission[requestType][0].read.split(",")
            }
        }

        roleQuery[requestType] = true
        // super admin check
        let roles = (await roleTable.findByRole(roleQuery)).data.roles;

        let uids = roles.map(role => role.user_uid)

        // check for the email available or not
        const findUser = (await usersTable.findAll({ uid: uids })).data.users;

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

exports.deleteUser = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const uid = request.urlParams.uid;

        const roleTable = db.methods.Role({
            logger, CreateError
        });
        const usersTable = db.methods.User({
            logger, CreateError
        });
        const permissionTable = db.methods.Permission({
            logger, CreateError
        });
        const feedsTable = db.methods.Feed({
            logger, CreateError
        });

        const uidUser = (await usersTable.findByUID({
            uid,
        })).data.users;

        let uidUserRole = "basic";
        if (uidUser?.role?.admin) uidUserRole = "admin";
        if (uidUser?.role?.superadmin) uidUserRole = "superadmin";

        // authorization check
        const verifyUser = (await usersTable.findByEmail({
            email: res.locals.email,
        })).data.users;

        if (
            !verifyUser.permission ||
            !verifyUser.permission[uidUserRole] ||
            verifyUser.permission[uidUserRole][0].delete == "") {
            throw new CreateError("You are not authorised to access this file")
        }

        let permission = (await permissionTable.deleteByUserUID({
            uid: uid,
        }))
        let role = (await roleTable.deleteByUserUID({
            uid: uid,
        }))
        let feed = (await feedsTable.deleteByUserUID({
            uid: uid,
        }))
        let user = (await usersTable.deleteByUID({
            uid: uid,
        }))


        return res.status(200).json({
            msg: "Success",
            data: {},
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};