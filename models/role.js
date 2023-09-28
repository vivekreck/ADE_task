'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    user_uid: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    superadmin: DataTypes.BOOLEAN,
    basic: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Role',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Roles'
  });
  return Role;
}; 

[{
  "create": true,
  "read": true,
  "edit": true,
  "delete": true,
}]