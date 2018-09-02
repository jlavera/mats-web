import sa                from 'superagent';
import bluebird          from 'bluebird';
import superagentPromise from 'superagent-promise';

export const superagent = superagentPromise(sa, bluebird);

