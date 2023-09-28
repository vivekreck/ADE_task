'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // define association here
    }
  };
  Permission.init({
    user_uid: DataTypes.STRING,
    feed: {
      type: DataTypes.TEXT,
      get: function () {
        const value = this.getDataValue("feed");
        if (!value) {
          return value;
        } else {
          return JSON.parse(value);
        }
      },
      set: function (value) {
        return this.setDataValue("feed", JSON.stringify(value));
      },
    },
    admin: {
      type: DataTypes.TEXT,
      get: function () {
        const value = this.getDataValue("admin");
        if (!value) {
          return value;
        } else {
          return JSON.parse(value);
        }
      },
      set: function (value) {
        return this.setDataValue("admin", JSON.stringify(value));
      },
    },
    user: {
      type: DataTypes.TEXT,
      get: function () {
        const value = this.getDataValue("user");
        if (!value) {
          return value;
        } else {
          return JSON.parse(value);
        }
      },
      set: function (value) {
        return this.setDataValue("user", JSON.stringify(value));
      },
    },
  }, {
    sequelize,
    modelName: 'Permission',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Permissions'
  });
  return Permission;
}; 