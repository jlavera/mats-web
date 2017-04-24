const mocked = true;

module.exports = mocked ? require('./mats-api-mocked') : require('./mats-api-live');
