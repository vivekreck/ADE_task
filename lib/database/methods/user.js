const models = require("../models").models;

exports.User = ({ logger, CreateError }) => {
  const rolesAttributes = [
    ["user_uid", "user_uid"],
    ["admin", "admin"],
    ["superadmin", "superadmin"],
    ["basic", "basic"],
  ];
  const permissionAttributes = [
    ["user_uid", "user_uid"],
    ["feed", "feed"],
    ["admin", "admin"],
    ["basic", "basic"],
  ];

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
        throw Error("Something went wrong!");
      }
    },
    findWithoutInclude: async ({ email, includeAll = false }) => {
      try {
        email = email.toLowerCase();
        const findUser = await models.User.findOne({
          where: { email },
        });

        return {
          msg: `Find user result`,
          data: {
            users: findUser === null ? null : unload(findUser, { includeAll }),
          },
        };
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error(
          "Failed to find users by email: %s %s",
          error.message,
          error
        );
        throw Error("Unknown error");
      }
    },
    findByEmail: async ({ email, includeAll = false }) => {
      try {
        email = email.toLowerCase();
        const findUser = await models.User.findOne({
          include: [
            {
              model: models.Role,
              as: "roles",
              required: false,
              attributes: rolesAttributes,
            },
            {
              model: models.Permission,
              as: "permissions",
              required: false,
              attributes: permissionAttributes
            },
          ],

          where: { email },
        });

        return {
          msg: `Find user result`,
          data: {
            users: findUser === null ? null : unload(findUser, { includeAll }),
          },
        };
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error(
          "Failed to find users by email: %s %s",
          error.message,
          error
        );
        throw Error("Unknown error");
      }
    },
    findAll: async (params) => {
      try {
        const findUser = await models.User.findAll({
          where: params,
          attributes: [
            ["uid", "uid"],
            ["name", "name"],
            ["email", "email"],
            ["created_at", "created_at"]
          ]
        });
        return {
          msg: `Find user result`,
          data: {
            users: findUser,
          },
        };
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error(
          "Failed to find users by uid: %s %s",
          error.message,
          error
        );
        throw Error("Unknown error");
      }
    },
    findByUID: async ({ uid, includeAll = false }) => {
      try {
        const findUser = await models.User.findOne({
          include: [
            {
              model: models.Role,
              as: "roles",
              required: false,
              attributes: rolesAttributes,
            },
            {
              model: models.Permission,
              as: "permissions",
              required: false,
              attributes: permissionAttributes
            },
          ],

          where: { uid },
        });

        return {
          msg: `Find user result`,
          data: {
            users: findUser === null ? null : unload(findUser, { includeAll }),
          },
        };
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error(
          "Failed to find users by uid: %s %s",
          error.message,
          error
        );
        throw Error("Unknown error");
      }
    },
    deleteByUID: async ({ uid }) => {
      try {
        const feed = await models
          .User
          .destroy({
            where: {
              uid: uid,
            }
          });
        return {
          msg: `User deleted`,
          data: {}
        }
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error('Failed to delete user: %s %s', error.message, error);
        throw Error("Unknown error");
      }
    },

    updateByUID: async (params) => {
      try {
        const constructedParams = load(params);
        const update = await models.User.update(
          constructedParams.updateParams,
          {
            where: {
              uid: params.uid,
            },
          }
        );
        return {
          msg: `Updated user details successfully`,
          data: {},
        };
      } catch (error) {
        if (error instanceof CreateError) {
          throw error;
        }
        logger.error(
          "Failed to update user details: %s %s",
          error.message,
          error
        );
        throw Error("Unknown error");
      }
    },
  });
};

function unload(params, { includeAll = false }) {
  const data = {
    uid: params.uid,
    name: params.name,
    email: params.email,
    role: params.roles,
    permission: params.permissions,
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
    uid: "uid",
    name: "name",
    password: "password"
  };

  let updateParams = {};

  for (const param in fields) {
    const key = paramsMap[param];
    updateParams[key] = fields[param];
  }

  return { updateParams };
}
