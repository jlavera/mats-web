const mocked = false;

module.exports = require(`./${mocked ? 'mats-api-mocked' : 'mats-api-live'}`);
