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
        apiGateway.getTreeByCareer(careerCode)
      ])
      .then(responses => {
        let [courses, tree] = responses.map(byCode);

        // hydrate dependency with full course entity
        let leaf;
        let dependencies;
        Object.keys(tree).forEach(leafKey => {
          leaf = tree[leafKey];

          dependencies      = leaf.dependencies.map(dep => ({
            type:   dep.type,
            course: courses[dep.code]
          }));
            // Object.assign({}, courses[dep.code], dep));
          leaf.dependencies = {
            toSign:    dependencies.filter(dep => dep.type === 'S'),
            toApprove: dependencies.filter(dep => dep.type === 'A')
          };
        });

        // hydrate courses with it's dependencies
        let course;
        Object.keys(courses).forEach(courseKey => {
          course = courses[courseKey];

          Object.assign(course, tree[course.code] || {dependencies: {toSign: [], toApprove: []}});
        });

        dispatch(coursesListSuccess(careerCode, courses));
        dispatch(setInitialState(stateStorage.get()));
      })
      .catch(error => {
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
