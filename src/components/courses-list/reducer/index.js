import { propEq, reject } from 'ramda';
import * as stateStorage from '../../../services/stateStorage';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATE,
  UPDATESUCCESS
} from '../actions';

import {
  UPDATE_PREVIEW_MODE_ENABLED
} from '../../top-bar/actions';

const initialState = {
  fixture:     [],
  isFetching:  false,
  error:       null,
  previewMode: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PREVIEW_MODE_ENABLED:
      return { ...state, previewMode: action.payload.state };
    case COURSESLIST_REQUEST:
      return { ...state, isFetching: true, error: null, fixture: [] };
    case COURSESLIST_SUCCESS:
      return { ...state, isFetching: false, fixture: action.payload.courses };
    case COURSESLIST_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case CHANGESTATE:
      const course = state.fixture.find(propEq('code', action.payload.code));

      if (!course) return state;

      const rest = reject(propEq('code', action.payload.code))(state.fixture);
      const updatedCourse = { ...course, state: action.payload.state };

      if (!state.previewMode) {
        stateStorage.set(updatedCourse);
      }

      return { ...state, fixture: [ updatedCourse, ...rest ] };
    case UPDATESUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}
