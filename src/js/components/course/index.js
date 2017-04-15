import React, { Component }   from 'react'

import Dependency from '../dependency';

class Course extends Component {
  constructor(props) {
    super(props);

    this.isBlocked = this.isBlocked.bind(this);
  }

  isBlocked() {
    return !this.props.course.dependencies.every(course => (course.type === 'S' && (course.state === 'A' || course.state === 'S')) || (course.type === 'A' && course.state === 'A'));
  }

  render() {
    return (
      <div>
        <span className={this.isBlocked() ? 'blocked' : ''}><b>{this.props.course.code}</b> {this.props.course.name}</span>
        <span className={this.props.course.state === 'N' ? 'bold' : ''} onClick={() => this.props.onChangeState('N', this.props.course.code)}> N </span>
        <span className={this.props.course.state === 'S' ? 'bold' : ''} onClick={() => this.props.onChangeState('S', this.props.course.code)}> F </span>
        <span className={this.props.course.state === 'A' ? 'bold' : ''} onClick={() => this.props.onChangeState('A', this.props.course.code)}> A </span>
        {this.props.course.dependencies.map((dep, index) => <Dependency key={'' + dep.code + index} course={dep}/>)}
      </div>
    );
  }
};

export default Course;
