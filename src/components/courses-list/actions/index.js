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
    tree
  }
});

const coursesListError = error => ({
  type: COURSESLIST_ERROR,
  payload: {
    error
  }
});

export const doGetCoursesForCareer = (careerCode, defaultState) => {
  const byCode = courses => courses.reduce((acc, course) => ({ ...acc, [course.code]: course }), {});

  return function (dispatch) {
    dispatch(coursesListRequest());

    return Promise.all([
        apiGateway.getCoursesByCareer(careerCode),
        apiGateway.getOptionalByCareer(careerCode)
      ])
      .then(responses => {
        const [courses, optionals] = responses;
        const coursesByCode        = byCode(courses);

        // hydrate courses in dependencies and dependents
        courses.forEach(course => {
          course.dependents            = course.dependents.map(dep => coursesByCode[dep]);
          course.dependencies.signed   = course.dependencies.signed.map(dep => coursesByCode[dep]);
          course.dependencies.approved = course.dependencies.approved.map(dep => coursesByCode[dep]);
        });

        dispatch(coursesListSuccess(careerCode, courses));

        const initialState = Object.keys(defaultState).length ? defaultState : stateStorage.get();

        Object.keys(initialState).forEach(key => {
          dispatch(changeState(initialState[key], key));
        });
      })
      .catch(error => {
        console.log(error.message);
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
  return function (dispatch) {
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
