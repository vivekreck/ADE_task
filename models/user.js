'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Role, {
        as: 'roles',
        foreignKey: 'user_uid',
        sourceKey: 'uid',
      });
      User.hasOne(models.Permission, {
        as: 'permissions',
        foreignKey: 'user_uid',
        sourceKey: 'uid',
      });
      User.hasMany(models.Feed, {
        as: 'feeds',
        foreignKey: 'user_uid',
        sourceKey: 'uid',
      });
    }
  };
  User.init({
    uid: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Users'
  });
  return User;
};