import React from 'react';
import { arrayOf, bool, func, number } from 'prop-types';
import { partition, prop, sortBy } from 'ramda';
import Course from '../course';
import { CourseShape } from '../../types';
import './style.css';

const Year = props => {
  const { courses, onChangeState, readMode, year } = props;

  const renderMandatoryCourse = course => (
    <Course
      key={course.code}
      course={course}
      onChangeState={onChangeState}
      readMode={readMode}
    />
  );

  const renderOptionalCourse = course => (
    <Course
      key={`opt-${year}-${course.slot}`}
      course={course}
      onChangeState={onChangeState}
      readMode={readMode}
      year={year}
      slotIndex={course.slot}
    />
  );

  const coursesPartitions = partition(course => course.optative, courses);
  const optionals = sortBy(prop('slot'), coursesPartitions[0]).map(
    renderOptionalCourse
  );
  const mandatories = coursesPartitions[1].map(renderMandatoryCourse);

  return (
    <div className="year col-xs-2">
      <div className="year-title h2">{year}° año</div>
      {mandatories.concat(optionals)}
    </div>
  );
};

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
