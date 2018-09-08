import { superagent } from '../utils';

const apiAddress = `/api/v1`;

export const login = (code, password) => superagent
  .post(`${apiAddress}/auth`)
  .set('Content-Type', 'application/json')
  .send({ code, password })
  .then(response => response)
  .get('body');

export const getCareers = () => superagent
  .get(`${apiAddress}/careers`)
  .set('Content-Type', 'application/json')
  .then(response => response)
  .get('body');

export const getCoursesByCareer = careerCode => superagent
  .get(`${apiAddress}/careers/${careerCode}/courses`)
  .set('Content-Type', 'application/json')
  .then(response => response)
  .get('body');

export const getOptionalByCareer = careerCode => superagent
  .get(`${apiAddress}/careers/${careerCode}/optionals`)
  .set('Content-Type', 'application/json')
  .then(response => response)
  .get('body'); 

export const getUser = username => superagent
  .get(`${apiAddress}/users/${username}`)
  .set('Content-Type', 'application/json')
  .then(response => response)
  .get('body');

export const setStateToUser = (username, code, state) => {
  const method = state === 'A' ? 'approved' : state === 'S' ? 'signed' : 'pending';
  const codes  = Array.isArray(code) ? code : [code];

  return superagent
    .post(`${apiAddress}/users/${username}/${method}`)
    .set('Content-Type', 'application/json')
    .send(codes)
    .then(response => response)
    .get('body')
  ;
}
