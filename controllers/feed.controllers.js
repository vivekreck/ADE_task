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

exports.createFeed = async (req, res, next) => {
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
            verifyUser.permission["feed"][0].create == "") {
            throw new CreateError("You are not authorised to access this file")
        }

        // data validaion
        let entity = (fromEntities.entities
            .Feed
            .createFeedEntity({
                CreateError,
                DataValidator,
                logger,
                params: { ...request.body }
            }).generate()).data.entity;

        // check for the email available or not
        let feed = (await feedsTable.create({
            ...entity,
            user_uid: verifyUser.uid,
        })).data.feed

        return res.status(201).json({
            msg: "Success",
            data: { feed },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};

exports.updateFeed = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const uid = request.urlParams.uid;

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
            !verifyUser.permission["feed"][0].edit,
            verifyUser.permission["feed"][0].edit == "" ||
            (!verifyUser.permission["feed"][0].edit.includes(uid) && verifyUser.permission["feed"][0].edit != "*")) {
            throw new CreateError("You are not authorised to access this file")
        }

        // data validaion
        let entity = (fromEntities.entities
            .Feed
            .updateFeedEntity({
                CreateError,
                DataValidator,
                logger,
                params: { ...request.body }
            }).generate()).data.entity;

        // check for the email available or not
        let feed = (await feedsTable.updateByUID({
            ...entity,
            uid: uid,
        })).data.feed

        return res.status(200).json({
            msg: "Success",
            data: { feed },
        });
    } catch (error) {
        // console.log(error)
        next(error);
    }
};

exports.deleteFeed = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res)
        const uid = request.urlParams.uid;

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
            !verifyUser.permission["feed"][0].delete,
            verifyUser.permission["feed"][0].delete == "" ||
            (!verifyUser.permission["feed"][0].delete.includes(uid) && verifyUser.permission["feed"][0].delete != "*")) {
            throw new CreateError("You are not authorised to access this file")
        }

        let feed = (await feedsTable.deleteByUID({
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