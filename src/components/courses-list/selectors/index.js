import { createSelector } from 'reselect';
import { ascend, descend, groupBy, map, prop, propEq, sortWith } from 'ramda';

const compareByMain = descend(prop('main'));
const compareByDuration = ascend(prop('duration'));
const compareByOptative = ascend(prop('optative'));
const compareByName = ascend(prop('name'));

const sortCourses = sortWith([
  compareByMain,
  compareByDuration,
  compareByOptative,
  compareByName
]);

const coursesSelector = state => state.coursesList.fixture;
export const optativesSelector = state => state.coursesList.optatives;
export const isFetchingCoursesSelector = state => state.coursesList.isFetching;
export const loadedCoursesSelector = state => state.coursesList.loaded;
export const coursesErrorSelector = state => state.coursesList.error;

const coursesWithDependenciesStatusSelector = createSelector(
  coursesSelector,
  courses =>
    courses.map(course => ({
      ...course,
      dependencies: {
        signed: course.dependencies.signed.map(code =>
          courses.find(propEq('code', code))
        ),
        approved: course.dependencies.approved.map(code =>
          courses.find(propEq('code', code))
        )
      },
      dependents: course.dependents.map(code => courses[code])
    }))
);

const coursesByYearSelector = createSelector(
  coursesWithDependenciesStatusSelector,
  groupBy(prop('year'))
);

export const sortedCoursesByYearSelector = createSelector(
  coursesByYearSelector,
  map(sortCourses)
);
