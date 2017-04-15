import superagent        from 'superagent';
import bluebird          from 'bluebird';
import superagentPromise from 'superagent-promise';

module.exports = {
  superagent: superagentPromise(superagent, bluebird)
};
