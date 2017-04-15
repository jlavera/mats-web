import bluebird       from 'bluebird';
import { superagent } from '../utils'

const apiAddress = 'http://localhost:8080/api/v1';

module.exports = {
  getCareers: () => {
    return superagent.get(`${apiAddress}/careers`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  },

  getCoursesByCareer: (careerCode) => {
    return superagent.get(`${apiAddress}/careers/${careerCode}/courses`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  },

  getTreeByCareer: (careerCode) => {
    return superagent.get(`${apiAddress}/careers/${careerCode}/tree`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  }
};
