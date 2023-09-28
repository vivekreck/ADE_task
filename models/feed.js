'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Feed extends Model {
        static associate(models) {
            // define association here
        }
    };
    Feed.init({
        uid: DataTypes.UUID,
        user_uid: DataTypes.STRING,
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        desciption: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Feed',
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'Feeds'
    });
    return Feed;
};