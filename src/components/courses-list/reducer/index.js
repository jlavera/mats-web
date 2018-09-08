import { propEq, reject } from 'ramda';
import * as stateStorage from '../../../services/stateStorage';

import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGESTATE,
  UPDATESUCCESS
} from '../actions';

const initialState = {
  fixture:    [],
  isFetching: false,
  error:      null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSESLIST_REQUEST:
      return { ...state, isFetching: true, error: null, fixture: [] };
    case COURSESLIST_SUCCESS:
      return { ...state, isFetching: false, fixture: action.payload.courses };
    case COURSESLIST_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case CHANGESTATE:
      const course = state.fixture.find(propEq('code', action.payload.code));
      const rest = reject(propEq('code', action.payload.code))(state.fixture);
      const updatedCourse = { ...course, state: action.payload.state };

      stateStorage.set(updatedCourse);

      return { ...state, fixture: [ updatedCourse, ...rest ] };
    case UPDATESUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}
