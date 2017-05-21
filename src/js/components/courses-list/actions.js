import stateStorage from '../../services/stateStorage';
import apiGateway   from '../../gateways/mats-api';

export const COURSESLIST_REQUEST = 'COURSESLIST_REQUEST';
export const COURSESLIST_SUCCESS = 'COURSESLIST_SUCCESS';
export const COURSESLIST_ERROR   = 'COURSESLIST_ERROR';

const coursesListRequest = () => {
  return {
    type: COURSESLIST_REQUEST
  };
};

const coursesListSuccess = (careerCode, courses, tree) => {
  return {
    type:    COURSESLIST_SUCCESS,
    payload: {
      careerCode,
      courses,
      tree
    }
  };
};

const coursesListError = (error) => {
  return {
    type:    COURSESLIST_ERROR,
    payload: {
      error
    }
  };
};

export const doGetCoursesForCareer = (careerCode) => {
  function byCode(courses) {
    const obj = {};

    courses.forEach(course => obj[course.code] = course);

    return obj;
  }

  return function (dispatch) {
    dispatch(coursesListRequest());

    return Promise.all([
        apiGateway.getCoursesByCareer(careerCode),
        apiGateway.getTreeByCareer(careerCode),
        apiGateway.getReverseTreeByCareer(careerCode)
      ])
      .then(responses => {
        let [courses, tree, reverseTree] = responses.map(byCode);

        // hydrate courses with it's dependencies and dependents
        let course;
        let dependencies;
        let dependents;
        Object.keys(courses).forEach(courseKey => {
          course       = courses[courseKey];

          dependencies = tree[courseKey]         ? (tree[courseKey].dependencies.map(dep => ({
            type:   dep.type,
            course: courses[dep.code]
          }))) : [];
          dependents   = reverseTree[courseKey] ? (reverseTree[courseKey].dependents.map(dep => courses[dep.code])) : [];

          course.dependencies = {
            toSign:    dependencies.filter(dep => dep.type === 'S'),
            toApprove: dependencies.filter(dep => dep.type === 'A')
          };
          course.dependents   = dependents;
        });

        dispatch(coursesListSuccess(careerCode, courses));
        dispatch(setInitialState(stateStorage.get()));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(coursesListError(error.message));
      })
    ;
  }
};

export const CHANGESTATE = 'CHANGESTATE';

const changeState = (state, courseCode) => {
  return {
    type:    CHANGESTATE,
    payload: {
      state,
      code: courseCode
    }
  }
};

export const doChangeStateCourse = (state, courseCode) => {
  return function (dispatch) {
    dispatch(changeState(state, courseCode));
  }
}

export const SETINITIALSTATE = 'SETINITIALSTATE';

const setInitialState = (list) => {
  return {
    type: SETINITIALSTATE,
    payload: {
      list
    }
  };
}
