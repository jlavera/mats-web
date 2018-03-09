import React, { Component }   from 'react'

import Dependency from '../dependency';

require('./style.styl');

class Course extends Component {
  constructor(props) {
    super(props);

    this.isBlocked        = this.isBlocked.bind(this);
    this.hasDepsToSign    = this.hasDepsToSign.bind(this);
    this.hasDepsToApprove = this.hasDepsToApprove.bind(this);
    this.hasDeppendencies = this.hasDeppendencies.bind(this);

    this.isNone           = this.isNone.bind(this);
    this.isSigned         = this.isSigned.bind(this);
    this.isApproved       = this.isApproved.bind(this);
  }

  isBlocked() {
    return (this.props.course.dependencies.toSign.concat(this.props.course.dependencies.toApprove)).some(dep => !dep.crossed);
  }

  hasDepsToSign() {
    return !!this.props.course.dependencies.toSign.length;
  }

  hasDepsToApprove() {
    return !!this.props.course.dependencies.toApprove.length;
  }

  hasDeppendencies() {
    return this.hasDepsToSign() || this.hasDepsToApprove();
  }

  isNone() {
    return !this.props.course.state || this.props.course.state === 'N';
  }

  isSigned() {
    return this.props.course.state === 'S';
  }

  isApproved() {
    return this.props.course.state === 'A';
  }

  render() {
    return (
      <div className={(this.isBlocked() ? 'panel-warning' : this.isApproved() ? 'panel-success' : 'panel-info') + " panel"}>
        <div className="course-grid-container">
          <div className="course-grid-item-course-name">{this.props.course.name}</div>
          <div className={'course-grid-item-course-button ' + (this.isNone()     ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('N', this.props.course.code)}>Pendiente</div>
          <div className={'course-grid-item-course-button ' + (this.isSigned()   ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('S', this.props.course.code)}>Firmada</div>
          <div className="course-grid-item-course-status">Bloqueada</div>
          <div className={'course-grid-item-course-button ' + (this.isApproved() ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('A', this.props.course.code)}>Aprobada</div>
        </div>
      </div>
    );
  }
};

export default Course;
