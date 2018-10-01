import React, { Fragment } from 'react'
import TopBar from '../top-bar';
import CareersList from '../careers-list';
import CoursesList from '../courses-list';

const App = () => (
  <Fragment>
    <TopBar />
    <CareersList />
    <CoursesList />
  </Fragment>
);

export default App;
