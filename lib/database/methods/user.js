const models = require("../models").models;

exports.User = ({ translate, logger, CreateError, lang }) => {
  return Object.freeze({
    create: async (params) => {
      try {
        const constructedParams = load(params);
        const createUser = await models.User.create(
          constructedParams.updateParams
        );
        return {
          msg: `Created user successfully`,
          data: { users: unload(createUser, { includeAll: false }) },
        };
      } catch (error) {
        logger.error("Failed to create users: %s %s", error.message, error);
        throw Error(translate(lang, "unknown_error_contact_support"));
      }
    },
  });
};

function unload(params, { includeAll = false }) {
  const data = {
    uid: params.uid,
    created_at: params.created_at,
    updated_at: params.updated_at,
  };

  if (includeAll) {
    data.password = params.password;
  }
  return data;
}

function load(fields) {
  // param map
  const paramsMap = {
    email: "email",
  };

  let updateParams = {};

  for (const param in fields) {
    const key = paramsMap[param];
    updateParams[key] = fields[param];
  }

  return { updateParams };
}
