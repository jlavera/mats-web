import React, { Component } from 'react'
import CareersList from '../careers-list';
import CoursesList from '../courses-list';

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CareersList />
        <CoursesList />
      </div>
    )
  }
}

export default Welcome;
