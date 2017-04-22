import { fromJS } from 'immutable';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATE,
  SETINITIALSTATE
} from './actions';

export const initialState = fromJS({
  courses: {
    fixture:    {},
    isFetching: false,
    error:      '',
    loaded:     ''
  }
});

export default function (state = initialState, action) {
  let courses;

  switch (action.type) {
    case COURSESLIST_REQUEST:
      return state
        .set('isFetching', true)
        .set('error',      '')
        .set('fixture',    {})
      ;
    case COURSESLIST_SUCCESS:
      return state
        .set('isFetching', false)
        .set('fixture',    action.payload.courses)
        .set('loaded',     action.payload.careerCode)
      ;
    case COURSESLIST_ERROR:
      return state
        .set('isFetching', false)
        .set('error',      action.payload.error)
      ;
    case SETINITIALSTATE:
      courses              = Object.assign({}, state.get('fixture'));

      // set new state to the courses
      (action.payload.list || []).forEach(course => courses[course.code].state = course.state);

      updateCoursesAvailability(courses);

      return state
        .set('fixture', courses)
      ;
    case CHANGESTATE:
      courses           = Object.assign({}, state.get('fixture'));
      let changedCourse = courses[action.payload.code];

      // set new state to the course
      changedCourse.state = action.payload.state;

      updateCoursesAvailability(courses);

      const localState = JSON.parse(localStorage.getItem('localState')) || [];

      let present      = false;
      localState.forEach(localCourse => {
        if (!present && localCourse.code === changedCourse.code) {
          localCourse.state = changedCourse.state;
          present = true;
        }
      });

      if (!present) {
        localState.push({code: changedCourse.code, state: changedCourse.state});
      }

      localStorage.setItem('localState', JSON.stringify(localState));

      return state
        .set('fixture', courses)
      ;
    default:
      return state;
  }
}

function updateCoursesAvailability(courses) {
  let course;
  let referredCourse;

  Object.keys(courses).forEach(courseCode => {
    course = courses[courseCode];

    (course.dependencies.toSign.concat(course.dependencies.toApprove)).forEach(dep => {
      referredCourse = courses[dep.course.code];
      dep.crossed    =
        (dep.type === 'S' && (referredCourse.state === 'A' || referredCourse.state === 'S')) || (dep.type === 'A' && referredCourse.state === 'A');
    });
  });
}
