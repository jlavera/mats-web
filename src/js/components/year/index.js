import React, { Component }   from 'react'

import Course from '../course';

require('./style.css');

class Year extends Component {
  render() {
    return (
      <div className='year col-xs-2'>
        <div className="year-title h2">{this.props.year}° año</div>
        {orderedList(this.props.courses).map(course =>
          <Course key={course.code} course={course} onChangeState={this.props.onChangeState} readMode={this.props.readMode} />
        )}
      </div>
    );
  }
};

export default Year;

function orderedList(courses) {
  return courses.sort((c1, c2) => {
    if (c1.main) {
      return -1;
    }

    if (c2.main) {
      return 1;
    }

    if (c1.duration < c2.duration) {
      return -1;
    }

    if (c1.duration > c2.duration) {
      return 1;
    }

    if (c1.optative && !c2.optative) {
      return 1;
    }

    if (c2.optative && !c1.optative) {
      return -1;
    }

    if (c1.name < c2.name) {
      return -1;
    }

    if (c1.name > c2.name) {
      return 1;
    }

    return 0;
  });
}
