import * as stateStorage from '../../../services/stateStorage';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGE_STATES,
  UPDATE_SUCCESS
} from '../actions';

const initialState = {
  fixture:     [],
  isFetching:  false,
  error:       null,
  previewMode: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSESLIST_REQUEST:
      return { ...state, isFetching: true, error: null, fixture: [] };
    case COURSESLIST_SUCCESS:
      return { ...state, isFetching: false, fixture: action.payload.courses };
    case COURSESLIST_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case CHANGE_STATES:
      const { changes, previewMode } = action.payload || {};

      if (!Object.keys(changes).length) {
        return { ...state, fixture: state.fixture.map(course => ({ ...course, state: 'P' }))};
      }

      const newFixture = state.fixture
        .slice()
        .reduce((obj, course) => ({ ...obj, [course.code]: course }), {});

      let updatedCourse;
      Object.keys(changes)
        .filter(updatedCode => newFixture[updatedCode])
        .forEach(updatedCode => {
          updatedCourse = { code: updatedCode, state: changes[updatedCode] };

          if (!previewMode) {
            stateStorage.set(updatedCourse);
          }

          newFixture[updatedCourse.code].state = updatedCourse.state;
        })
      ;

      return { ...state, fixture: Object.values(newFixture)};
    case UPDATE_SUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}
