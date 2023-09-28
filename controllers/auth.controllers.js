const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const { hashSync, compareSync } = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');

exports.postSignupSelf = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const roleTable = db.methods.Role({
            logger, CreateError
        });
        const usersTable = db.methods.User({
            logger, CreateError
        });
        const permissionTable = db.methods.Permission({
            logger, CreateError
        });

        let entity = (fromEntities.entities
            .Auth
            .signupEntity({
                CreateError,
                DataValidator,
                logger,
                params: { ...request.body }
            }).generate()).data.entity;


        // check for the email available or not
        const findUser = (await usersTable.findByEmail({
            email: entity.email,
            includeAll: false
        })).data.users;

        if (findUser !== null) {
            throw new CreateError("Invalid signup details")
        }

        // super admin check
        let superadmins = (await roleTable.findByRole({
            superadmin: true
        })).data.roles;

        if (superadmins.length > 0) {
            return res.status(400).json({
                msg: "Only one super admin allowed",
                data: {},
            });
        }

        // encode password with jwt 
        entity.password = hashSync(entity.password);

        // create admin
        const user = (await usersTable.create({ ...entity })).data.users;

        // create a role for the user
        const role = (await roleTable
            .create({
                user_uid: user.uid,
                superadmin: true
            })).data.roles;

        // create a role for the user
        const permission = (await permissionTable
            .create({
                user_uid: user.uid,
                feed: [{
                    edit: "*",
                    delete: "*",
                    read: "*",
                    create: "*"
                }],
                admin: [{
                    edit: "*",
                    delete: "*",
                    read: "*",
                    create: "*"
                }],
                user: [{
                    edit: "*",
                    delete: "*",
                    read: "*",
                    create: "*"
                }]
            })).data.permissions;


        return res.status(201).json({
            msg: "User created successfully",
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res);


        return res.status(200).json({
            msg: "Success",
            data: {

            },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};