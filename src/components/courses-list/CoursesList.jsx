import React from 'react';
import { Year } from './components';

import './CoursesList.css';

const CoursesList = ({ readMode, isFetching, list, doChangeStateCourses }) => (
  <div className="years-holder">
    {isFetching && <div>Cargando materias...</div>}
    {Object.entries(list).map(([year, courses]) => (
      <Year
        key={`year${year}`}
        year={+year}
        courses={courses}
        onChangeState={doChangeStateCourses}
        readMode={readMode}
      />
    ))}
  </div>
);

CoursesList.propTypes = {};

export default CoursesList;
