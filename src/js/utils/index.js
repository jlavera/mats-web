import superagent        from 'superagent';
import bluebird          from 'bluebird';
import superagentPromise from 'superagent-promise';

export default function () {
  return {
    superagent: superagentPromise(superagent, bluebird)
  };
};
