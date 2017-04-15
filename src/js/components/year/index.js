import React, { Component }   from 'react'

import Course from '../course';

class Year extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <b>{this.props.year}◦ año:</b>
        {this.props.courses.map(course =>
          <Course key={course.code} course={course} onChangeState={this.props.onChangeState} />
        )}
      </div>
    );
  }
};

export default Year;
