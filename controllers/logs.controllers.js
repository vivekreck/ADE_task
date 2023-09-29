const fromAdaptReq = require("../utils/adapt-req");
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../utils/error/dp-error").CreateError;
const logger = require("../lib/logger").logger;
const db = require("../lib/database").database;
const fromEntities = require("../utils/entity")
const { hashSync, compareSync } = require("bcrypt-nodejs");
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/app.config.json');
const fs = require('fs');
const path = require('path');
const { promisify } = require("util");


exports.getLogs = async (req, res, next) => {
    try {
        const request = fromAdaptReq.adaptReq(req, res);
        const requestType = request.urlParams.type;

        const usersTable = db.methods.User({
            logger, CreateError
        });

        const verifyUser = (await usersTable.findByEmail({
            email: res.locals.email,
        })).data.users;


        if (!verifyUser?.role?.superadmin) {
            throw new CreateError("You are not authorised to access this file")
        }


        let min_fileName = null;
        let min_count = 1000000;


        await new Promise((resolve, reject) => {
            fs.readdir(path.join(__dirname, '..', 'logs'), function (err, filenames) {
                if (err) {
                    onError(err);
                    return;
                }
                filenames.forEach(function (filename) {
                    let date = filename.split("=")[1]?.split('.')[0];
                    if (date) {
                        date = date.split('-');
                        fileDate = new Date(date[0], date[1] - 1, date[2], date[3], date[4], 0, 0)

                        const minutesDifference = Math.floor(Math.abs(new Date() - fileDate) / (1000 * 60));

                        if (min_count > minutesDifference) {
                            min_count = minutesDifference;
                            min_fileName = filename
                        }
                    }
                });

                return resolve()
            })
        })

        let logs = fs.readFileSync(path.join(__dirname, '..', 'logs', min_fileName), 'utf8');

        return res.status(201).json({
            msg: "Logs fetched successfully",
            data: { logs },
        });

    } catch (error) {
        next(error);
    }
};