let createFeed = require('./create').createEntity;
let updateFeed = require('./update').updateEntity;

exports.Feed = {
    createFeedEntity: createFeed,
    updateFeedEntity: updateFeed,
}