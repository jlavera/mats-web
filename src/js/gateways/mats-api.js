import Utils from '../utils';

const apiAddress = `/api/v1`;

export default {
  login: (code, password) => {
    return Utils().superagent.post(`${apiAddress}/auth`)
      .set('Content-Type', 'application/json')
      .send({
        code,
        password
      })
      .then(response => response)
      .get('body')
    ;
  },

  getCareers: () => {
    return Utils().superagent.get(`${apiAddress}/careers`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .tap(console.log)
      .get('body')
    ;
  },

  getCoursesByCareer: (careerCode) => {
    return Utils().superagent.get(`${apiAddress}/careers/${careerCode}/courses`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  },

  getOptionalByCareer: (careerCode) => {
    return Utils().superagent.get(`${apiAddress}/careers/${careerCode}/optionals`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  },

  getUser: (username) => {
    return Utils().superagent.get(`${apiAddress}/users/${username}`)
      .set('Content-Type', 'application/json')
      .then(response => response)
      .get('body')
    ;
  },

  setStateToUser: (username, code, state) => {
    const method = state === 'A' ? 'approved' : state === 'S' ? 'signed' : 'pending';
    const codes  = Array.isArray(code) ? code : [code];

    return Utils().superagent.post(`${apiAddress}/users/${username}/${method}`)
      .set('Content-Type', 'application/json')
      .send(codes)
      .then(response => response)
      .get('body')
    ;
  }
};
