const models = require("../models").models;

exports.Role = ({ logger, CreateError }) => {
    return Object.freeze({
        create: async (params) => {
            try {
                const constructedParams = load(params);
                const createUser = await models.Role.create(
                    constructedParams.updateParams
                );
                return {
                    msg: `Created role successfully`,
                    data: { users: unload(createUser, { includeAll: false }) },
                };
            } catch (error) {
                logger.error("Failed to create users: %s %s", error.message, error);
                throw Error("Something went wrong!");
            }
        },
        findByRole: async (params) => {
            try {
                const constructedParams = load(params);
                const findRole = await models.Role.findAll({
                    where: constructedParams.updateParams,
                });
                return {
                    msg: `Find role result`,
                    data: {
                        roles: findRole,
                    },
                };
            } catch (error) {
                if (error instanceof CreateError) {
                    throw error;
                }
                logger.error("Failed to find role: %s %s", error.message, error);
                throw Error("Something went wrong!");
            }
        },
    });
};

function unload(params) {
    const data = {
        user_uid: params.user_uid,
        admin: params.admin,
        superadmin: params.superadmin,
        basic: params.basic,
        created_at: params.created_at,
        updated_at: params.updated_at,
    };
    return data;
}

function load(fields) {
    // param map
    const paramsMap = {
        user_uid: "user_uid",
        admin: "admin",
        superadmin: "superadmin",
        basic: "basic",
    };

    let updateParams = {};

    for (const param in fields) {
        const key = paramsMap[param];
        updateParams[key] = fields[param];
    }

    return { updateParams };
}
