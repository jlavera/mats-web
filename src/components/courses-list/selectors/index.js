import { createSelector } from 'reselect';
import { ascend, descend, groupBy, map, prop, sortWith } from 'ramda';

const compareByMain     = descend(prop('main'));
const compareByDuration = ascend(prop('duration'));
const compareByOptative = ascend(prop('optative'));
const compareByName     = ascend(prop('name'));

const sortCourses = sortWith([
  compareByMain,
  compareByDuration,
  compareByOptative,
  compareByName,
]);

export const coursesSelector = state => state.coursesList.fixture;
export const isFetchingCoursesSelector = state => state.coursesList.isFetching;
export const loadedCoursesSelector = state => state.coursesList.loaded;
export const coursesErrorSelector = state => state.coursesList.error;

export const coursesByYearSelector = createSelector(coursesSelector, groupBy(prop('year')));

export const sortedCoursesByYearSelector = createSelector(coursesByYearSelector, map(sortCourses));