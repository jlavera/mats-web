const mocked = true;

module.exports = require(`./${mocked ? 'mats-api-mocked' : 'mats-api-live'}`);
