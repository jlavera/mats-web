import React from 'react'
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { ascend, prop, sortWith } from 'ramda';
import Course from '../course';
import './style.css';

const compareByMain     = ascend(prop('main'));
const compareByDuration = ascend(prop('duration'));
const compareByOptative = ascend(prop('optative'));
const compareByName     = ascend(prop('name'));

const sortCourses = sortWith([
  compareByMain,
  compareByDuration,
  compareByOptative,
  compareByName,
]);

const Year = props => {
  const {
    courses,
    onChangeState,
    readMode,
    year,
  } = props;

  const renderCourse = course => <Course key={course.code} course={course} onChangeState={onChangeState} readMode={readMode} />;

  return (
    <div className='year col-xs-2'>
      <div className="year-title h2">{ +year + 1 }° año</div>
      {sortCourses(courses).map(renderCourse)}
    </div>
  );
}

Year.defaultProps = {
  readMode: false,
}

// los shapes complejos se pueden pasar a un archivo aparte

/*
  ex:

  export const courseShape = shape({
    code: string.isRequired,
    duration: number.isRequired,
    main: bool.isRequired,
    name: string.isRequired,
    optative: bool.isRequired,
  });

  => courses: arrayOf(courseShape)
*/
Year.propTypes = {
  courses: arrayOf(shape({
    code: string.isRequired,
    duration: string.isRequired,
    main: bool.isRequired,
    name: string.isRequired,
    optative: bool.isRequired,
  })).isRequired,
  onChangeState: func.isRequired,
  readMode: bool,
  year: number.isRequired,
};

export default Year;
