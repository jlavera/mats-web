import React, { Component }   from 'react'

import Course from '../course';

class Year extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='col-xs-2'>
        <div className="year-title h2">{this.props.year}◦ año:</div>
        {this.props.courses.map(course =>
          <Course key={course.code} course={course} onChangeState={this.props.onChangeState} />
        )}
      </div>
    );
  }
};

export default Year;
