import apiGateway from '../../gateways/mats-api';

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
        Object.keys(tree).forEach(leafKey => {
          leaf = tree[leafKey];

          leaf.dependencies = leaf.dependencies.map(dep => Object.assign(courses[dep.code], dep));
          // leaf.dependencies.sort((dep1, dep2) => dep1.type < dep2.type ? 1 : -1);
        });

        // hydrate courses with it's dependencies
        let course;
        Object.keys(courses).forEach(courseKey => {
          course = courses[courseKey];

          Object.assign(course, tree[course.code] || {dependencies: []});
        });

        dispatch(coursesListSuccess(careerCode, courses));
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
