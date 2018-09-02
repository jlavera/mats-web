import * as stateStorage from '../../services/stateStorage';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATE,
  UPDATESUCCESS
} from './actions';

const initialState = {
  fixture:    {},
  isFetching: false,
  error:      '',
  loaded:     ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSESLIST_REQUEST:
      return { ...state, isFetching: true, error: '', fixture: {} };
    case COURSESLIST_SUCCESS:
      return { ...state, isFetching: false, fixture: action.payload.courses, loaded: action.payload.careerCode };
    case COURSESLIST_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case CHANGESTATE:

      // ????? xdd

      let courses       = state.get('fixture').slice();
      let changedCourse = searchByCode(courses, action.payload.code);

      // look for it as an optional
      // if (!changedCourse) {
      //   let courseCode = Object.keys(courses).filter(code => {
      //     return courses[code].alternativeCodes.indexOf(action.payload.code) > -1;
      //   })[0];
      //
      //   changedCourse = courses[courseCode];
      // }

      // set new state to the course
      changedCourse.state = action.payload.state;

      // updateCoursesAvailability(changedCourse.dependents);

      stateStorage.set(changedCourse);

      return state
        .set('fixture', courses)
      ;
    case UPDATESUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}

function updateCoursesAvailability(dependents) {
  let referredCourse;

  dependents.forEach(dependent => {
    (dependent.dependencies.signed.concat(dependent.dependencies.approved)).forEach(dep => {
      referredCourse = dep.dependent;
      dep.crossed    =
        (dep.type === 'S' && (referredCourse.state === 'A' || referredCourse.state === 'S')) || (dep.type === 'A' && referredCourse.state === 'A');
    });
  });
}

function searchByCode(list, code) {
  return list.find(item => item.code === code);
}
