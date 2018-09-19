import * as stateStorage from '../../../services/stateStorage';
import * as apiGateway   from '../../../gateways/mats-api';

export const COURSESLIST_REQUEST = 'COURSESLIST_REQUEST';
export const COURSESLIST_SUCCESS = 'COURSESLIST_SUCCESS';
export const COURSESLIST_ERROR   = 'COURSESLIST_ERROR';

const coursesListRequest = () => ({
  type: COURSESLIST_REQUEST
});

const coursesListSuccess = (careerCode, courses, tree) => ({
  type: COURSESLIST_SUCCESS,
  payload: {
    careerCode,
    courses,
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
        const { courses/* , optionals */} = career;
        dispatch(coursesListSuccess(careerCode, courses));

        // cheesus TODO: pensar esto
        // la cantidad de rerender que esta metiendo is over 9000
        // en realidad 30 y pico xd
        const initialState = Object.keys(defaultState).length ? defaultState : stateStorage.get();

        dispatch(changeStates(initialState));
      })
      .catch(error => {
        dispatch(coursesListError(error.message));
      })
    ;
  };
};

export const CHANGESTATES = 'CHANGESTATES';

const changeStates = (codesAndStates, previewMode) => {
  return {
    type:    CHANGESTATES,
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


export const UPDATESUCCESS = 'UPDATESUCCESS';

const updateSuccess = () => {
  return {
    type:    UPDATESUCCESS,
    payload: {}
  };
};
