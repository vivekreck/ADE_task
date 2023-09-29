const models = require("../models").models;

exports.Permission = ({ logger, CreateError }) => {
    return Object.freeze({
        create: async (params) => {
            try {
                const constructedParams = load(params);
                const createPermission = await models.Permission.create(
                    constructedParams.updateParams
                );
                return {
                    msg: `Created role successfully`,
                    data: { permissions: unload(createPermission, { includeAll: false }) },
                };
            } catch (error) {
                logger.error("Failed to create permission: %s %s", error.message, error);
                throw Error("Something went wrong!");
            }
        },
        deleteByUserUID: async ({ uid }) => {
            try {
                const feed = await models
                    .Permission
                    .destroy({
                        where: {
                            user_uid: uid,
                        }
                    });
                return {
                    msg: `Permission deleted`,
                    data: {}
                }
            } catch (error) {
                if (error instanceof CreateError) {
                    throw error;
                }
                logger.error('Failed to delete Permission: %s %s', error.message, error);
                throw Error("Unknown error");
            }
        }
    });
};

function unload(params) {
    const data = {
        user_uid: params.user_uid,
        feed: params.feed,
        admin: params.admin,
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
        feed: "feed",
        admin: "admin",
        basic: "basic",
    };

    let updateParams = {};

    for (const param in fields) {
        const key = paramsMap[param];
        updateParams[key] = fields[param];
    }

    return { updateParams };
}
