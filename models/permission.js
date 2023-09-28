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
    feed: DataTypes.STRING,
    admin: DataTypes.STRING,
    user: DataTypes.STRING,
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