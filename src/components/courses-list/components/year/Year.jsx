import React from 'react';
import { arrayOf, bool, func, number } from 'prop-types';
import Course from '../course';
import { CourseShape } from '../../types';
import './Year.css';

const Year = ({ courses, onChangeState, readMode, year }) => (
  <div className="year col-xs-2">
    <div className="year-title h2">{year}° año</div>
    {courses.map(course => (
      <Course
        key={course.code}
        course={course}
        onChangeState={onChangeState}
        readMode={readMode}
      />
    ))}
  </div>
);

Year.defaultProps = {
  readMode: false
};

Year.propTypes = {
  courses: arrayOf(CourseShape).isRequired,
  onChangeState: func.isRequired,
  readMode: bool,
  year: number.isRequired
};

export default Year;
