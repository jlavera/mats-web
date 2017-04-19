import { fromJS } from 'immutable';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATE
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
    case CHANGESTATE:
      const courses = Object.assign({}, state.get('fixture'));

      // set new state to the course
      courses[action.payload.code].state = action.payload.state;

      let course;
      Object.keys(courses).forEach(courseCode => {
        course = courses[courseCode];

        course.dependencies.forEach(dep => {
          if (dep.code === action.payload.code) {
            dep.crossed = (dep.type === 'S' && (dep.state === 'A' || dep.state === 'S')) || (dep.type === 'A' && dep.state === 'A');
          }
        });
      });

      return state
        .set('fixture', courses)
      ;
    default:
      return state;
  }
}
