const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const { hashSync, compareSync } = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/app.config.json');

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
        const findUser = (await usersTable.findWithoutInclude({
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

        // create a permission for the user
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
                basic: [{
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


exports.postSignupOthers = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res);
        const requestType = request.urlParams.type;

        const roleTable = db.methods.Role({
            logger, CreateError
        });
        const usersTable = db.methods.User({
            logger, CreateError
        });
        const permissionTable = db.methods.Permission({
            logger, CreateError
        });

        if (!["admin", "basic"].includes(requestType)) {
            return res.send(404, {
                msg: "Unknow request made",
                data: {}
            })
        }

        // role check
        const verifyUser = (await usersTable.findByEmail({
            email: res.locals.email,
        })).data.users;

        if (
            // verifyUser === null ||
            // verifyUser.role ||
            // verifyUser.role.superadmin ||
            !verifyUser.permission ||
            !verifyUser.permission[requestType] ||
            verifyUser.permission[requestType][0].create != "*") {
            throw new CreateError("You are not authorised to access this file")
        }

        // body validation check
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

        // encode password with jwt 
        entity.password = hashSync(entity.password);

        // create admin
        const user = (await usersTable.create({ ...entity })).data.users;

        // create a role for the user
        if (requestType == 'admin') {
            const role = (await roleTable
                .create({
                    user_uid: user.uid,
                    admin: true
                })).data.roles;
        } else {
            const role = (await roleTable
                .create({
                    user_uid: user.uid,
                    basic: true
                })).data.roles;
        }

        let permissionEntity = (fromEntities.entities
            .Auth
            .permissionEntity({
                CreateError,
                DataValidator,
                logger,
                params: { ...request.body }
            }).generate()).data.entity;

        // create a permission for the user
        const permission = (await permissionTable
            .create({
                user_uid: user.uid,
                ...permissionEntity
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
        const request = fromAdaptReq.adaptReq(req, res)
        const usersTable = db.methods.User({
            logger, CreateError
        });

        let entity = (fromEntities.entities
            .Auth
            .loginEntity({
                CreateError,
                DataValidator,
                logger,
                params: { ...request.body }
            }).generate()).data.entity;


        // check for the email available or not
        const findUser = (await usersTable.findByEmail({
            email: entity.email,
            includeAll: true
        })).data.users;

        if (findUser === null) {
            throw new CreateError("Invalid Login details")
        }
        if (!compareSync(entity.password, findUser.password)) {
            return res.send(401, {
                msg: `Password must be correct!`,
                data: {}
            })
        }
        delete findUser.password;

        const jwtToken = jwt.sign({ email: entity.email }, config.jwt.jwt_secret, { expiresIn: config.jwt.exp });

        return res.status(200).json({
            msg: "Success",
            data: {
                user: findUser,
                token: jwtToken,
            },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};