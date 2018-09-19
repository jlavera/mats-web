import { propEq, reject } from 'ramda';
import * as stateStorage from '../../../services/stateStorage';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATES,
  UPDATESUCCESS
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
    case CHANGESTATES:
      const { changes, previewMode } = action.payload || {};

      if (!Object.keys(changes).length) return state;

      const newFixture = state.fixture
        .slice()
        .reduce((obj, course) => ({ ...obj, [course.code]: course }), {});

      let updatedCourse;
      Object.keys(changes).forEach(updatedCode => {
        updatedCourse = { code: updatedCode, state: changes[updatedCode] };

        if (!previewMode) {
          stateStorage.set(updatedCourse);
        }

        newFixture[updatedCourse.code].state = updatedCourse.state;
      });

      return { ...state, fixture: Object.values(newFixture)};
    case UPDATESUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}
