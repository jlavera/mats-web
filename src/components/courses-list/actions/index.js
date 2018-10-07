import * as stateStorage from '../../../services/stateStorage';
import * as apiGateway   from '../../../gateways/mats-api';

export const COURSESLIST_REQUEST = 'COURSESLIST_REQUEST';
export const COURSESLIST_SUCCESS = 'COURSESLIST_SUCCESS';
export const COURSESLIST_ERROR   = 'COURSESLIST_ERROR';

const coursesListRequest = () => ({
  type: COURSESLIST_REQUEST
});

const coursesListSuccess = (careerCode, courses, optionals) => ({
  type: COURSESLIST_SUCCESS,
  payload: {
    careerCode,
    courses,
    optionals
  }
});

const coursesListError = error => ({
  type: COURSESLIST_ERROR,
  payload: {
    error
  }
});

export const doGetCoursesForCareer = (careerCode, defaultState) => {
  return dispatch => {
    dispatch(coursesListRequest());

    return apiGateway.getCareer(careerCode)
      .then(career => {
        const { courses, optionals } = career;
        const _optionals = [optionals[0]];

        dispatch(coursesListSuccess(careerCode, courses, _optionals));

        dispatch(Object.keys(defaultState).length ? doChangeStateCourses(defaultState, false) : doChangeStatesFromCookie(false));
      })
      .catch(error => {
        dispatch(coursesListError(error.message));
      })
    ;
  };
};

export const CHANGE_STATES = 'CHANGE_STATES';

const changeStates = (codesAndStates, previewMode) => {
  return {
    type:    CHANGE_STATES,
    payload: {
      changes: codesAndStates,
      previewMode
    }
  };
};

export const doChangeStateCourses = (codesAndStates, previewMode) => {
  return dispatch => {
    // TODO kek get user
    // apiGateway.setStateToUser('1440135', courseCode, state);
    dispatch(changeStates(codesAndStates, previewMode));
  };
}

export const CHANGE_STATES_FROM_COOKIE = 'CHANGE_STATES_FROM_COOKIE';

export const doChangeStatesFromCookie = previewMode => {
  return dispatch => {
    dispatch(changeStates(stateStorage.get(), previewMode));
  };
};

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

// const updateSuccess = () => {
//   return {
//     type:    UPDATE_SUCCESS,
//     payload: {}
//   };
// };
