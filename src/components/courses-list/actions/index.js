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

        Object.keys(initialState).forEach(key => {
          dispatch(changeState(initialState[key], key));
        });
      })
      .catch(error => {
        dispatch(coursesListError(error.message));
      })
    ;
  };
};

export const CHANGESTATE = 'CHANGESTATE';

const changeState = (state, courseCode) => {
  return {
    type:    CHANGESTATE,
    payload: {
      state,
      code: courseCode
    }
  };
};

export const doChangeStateCourse = (state, courseCode) => {
  return dispatch => {
    // TODO kek get user
    // apiGateway.setStateToUser('1440135', courseCode, state);
    dispatch(changeState(state, courseCode));
  };
}


export const UPDATESUCCESS = 'UPDATESUCCESS';

const updateSuccess = () => {
  return {
    type:    UPDATESUCCESS,
    payload: {}
  };
};
