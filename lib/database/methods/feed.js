const models = require("../models").models;

exports.Feed = ({ logger, CreateError }) => {
    return Object.freeze({
        create: async (params) => {
            try {
                const constructedParams = load(params);
                const createFeed = await models.Feed.create(
                    constructedParams.updateParams
                );
                return {
                    msg: `Created feed successfully`,
                    data: { feed: unload(createFeed, { includeAll: false }) },
                };
            } catch (error) {
                logger.error("Failed to create feed: %s %s", error.message, error);
                throw Error("Something went wrong!");
            }
        },
        findAll: async (params) => {
            try {
                const findFeed = await models.Feed.findAll({
                    where: params,
                });
                return {
                    msg: `Find role result`,
                    data: {
                        feeds: findFeed,
                    },
                };
            } catch (error) {
                if (error instanceof CreateError) {
                    throw error;
                }
                logger.error("Failed to find feed: %s %s", error.message, error);
                throw Error("Something went wrong!");
            }
        },
    });
};

function unload(params) {
    const data = {
        user_uid: params.user_uid,
        name: params.name,
        url: params.url,
        desciption: params.desciption,
        created_at: params.created_at,
        updated_at: params.updated_at,
    };
    return data;
}

function load(fields) {
    // param map
    const paramsMap = {
        user_uid: "user_uid",
        name: "name",
        url: "url",
        desciption: "desciption"
    };

    let updateParams = {};

    for (const param in fields) {
        const key = paramsMap[param];
        updateParams[key] = fields[param];
    }

    return { updateParams };
}
