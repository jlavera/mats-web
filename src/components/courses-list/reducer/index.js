import * as stateStorage from '../../../services/stateStorage';
import {
  COURSESLIST_REQUEST,
  COURSESLIST_SUCCESS,
  COURSESLIST_ERROR,
  CHANGE_STATES,
  CHANGE_OPTATIVE,
  UPDATE_SUCCESS
} from '../actions';

import { pathOr, times } from 'ramda';

const initialState = {
  fixture: [],
  optatives: {},
  isFetching: false,
  error: null,
  previewMode: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COURSESLIST_REQUEST:
      return { ...state, isFetching: true, error: null, fixture: [] };
    case COURSESLIST_SUCCESS:
      const { courses, optionals } = action.payload;

      // create placeholders
      optionals.forEach(year => {
        times(
          i =>
            courses.push({
              ...year.course,
              options: year.options,
              slot: i
            }),
          year.required
        );
      });

      return { ...state, isFetching: false, fixture: courses };
    case COURSESLIST_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    case CHANGE_STATES: {
      const { changes, previewMode } = action.payload || {};

      let newFixture = state.fixture.slice();

      const changesOnCourses =
        changes.courses && Object.keys(changes.courses).length;

      const changesOnOptatives =
        changes.optatives && Object.keys(changes.optatives).length;

      if (changesOnOptatives) {
        Object.entries(changes.optatives).forEach(([year, courses]) => {
          Object.entries(courses).forEach(([slot, code]) => {
            const idx = newFixture.findIndex(
              course =>
                course.optative && course.year == year && course.slot == slot
            );

            newFixture[idx] = {
              ...newFixture[idx].options.find(o => o.code === code),
              ...newFixture[idx]
            };
          });
        });
      }

      if (changesOnCourses) {
        Object.keys(changes.courses)
          .filter(updatedCode =>
            newFixture.find(({ code }) => code === updatedCode)
          )
          .forEach(updatedCode => {
            const updatedCourse = {
              code: updatedCode,
              state: changes.courses[updatedCode]
            };

            if (!previewMode) {
              stateStorage.setCourse(updatedCourse);
            }

            const idx = newFixture.findIndex(
              ({ code }) => code === updatedCode
            );
            newFixture[idx].state = updatedCourse.state;
          });
      } else {
        newFixture = newFixture.map(course => ({ ...course, state: 'P' }));
      }

      return {
        ...state,
        fixture: newFixture,
        optatives: changesOnOptatives ? changes.optatives : state.optatives
      };
    }
    case CHANGE_OPTATIVE: {
      stateStorage.setOptative(action.payload);

      // fill placeholder or change existing
      const newFixture = state.fixture.slice();

      const idx = newFixture.findIndex(
        course =>
          course.optative &&
          course.year === action.payload.year &&
          course.slot === action.payload.slotIndex
      );

      const newState = pathOr(
        'P',
        ['courses', action.payload.code],
        stateStorage.getAll()
      );

      // set name and code
      newFixture[idx] = {
        ...newFixture[idx],
        ...newFixture[idx].options.find(o => o.code === action.payload.code),
        state: newState
      };

      return {
        ...state,
        fixture: newFixture,
        optatives: {
          ...state.optatives,
          [action.payload.year]: {
            ...(state.optatives && state.optatives[action.payload.year]),
            [action.payload.slotIndex]: action.payload.code
          }
        }
      };
    }
    case UPDATE_SUCCESS:
      // TODO show success dialog
      return state;
    default:
      return state;
  }
}
