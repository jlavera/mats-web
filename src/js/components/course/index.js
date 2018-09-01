import React, { Component }   from 'react'
import { withRouter }         from 'react-router'

import DependenciesHolder from '../dependencies-holder';
import StateSwitch        from '../state-switch';

require('./style.css');

class Course extends Component {
  constructor(props) {
    super(props);

    this.isBlockedToSign    = this.isBlockedToSign.bind(this);
    this.isBlockedToApprove = this.isBlockedToApprove.bind(this);
    this.hasDepsToSign      = this.hasDepsToSign.bind(this);
    this.hasDepsToApprove   = this.hasDepsToApprove.bind(this);
    this.hasDeppendencies   = this.hasDeppendencies.bind(this);

    this.isPending          = this.isPending.bind(this);
    this.isSigned           = this.isSigned.bind(this);
    this.isApproved         = this.isApproved.bind(this);
  }

  isBlockedToSign() {
    const signed   = this.props.course.dependencies.signed;
    const approved = this.props.course.dependencies.approved;

    return signed.some(dep => !dep.state || dep.state === 'P') ||
      approved.some(dep => dep.state !== 'A');
  }

  isBlockedToApprove() {
    const signed   = this.props.course.dependencies.signed;
    const approved = this.props.course.dependencies.approved;

    return signed.some(dep => dep.state !== 'A') ||
      approved.some(dep => dep.state !== 'A');
  }

  hasDepsToSign() {
    return !!this.props.course.dependencies.signed.length;
  }

  hasDepsToApprove() {
    return !!this.props.course.dependencies.approved.length;
  }

  hasDeppendencies() {
    return this.hasDepsToSign() || this.hasDepsToApprove();
  }

  isPending() {
    return !this.props.course.state || this.props.course.state === 'N';
  }

  isSigned() {
    return this.props.course.state === 'S';
  }

  isApproved() {
    return this.props.course.state === 'A';
  }

  getStatus() {
    if (this.isApproved()) {
      return (<div className="bg-success text-white course-status">APROBADA</div>);
    }

    if (this.isBlockedToSign()) {
      return (<div className="bg-danger text-white course-status">BLOQUEADA</div>);
    }

    if (this.isBlockedToApprove()) {
      return (<div className="bg-warning text-white course-status">BLOQUEADA P/ FINAL</div>);
    }

    if (this.isPending()) {
      return (<div className="bg-light text-black course-status">HABILITADA</div>);
    }

    if (this.isSigned()) {
      return (<div className="bg-light text-black course-status">FIRMADA</div>)
    }
  }

  render() {
    return (
      <div className='course-holder'>
        <div className='state-text'>PENDIENTE</div>
        <StateSwitch course={this.props.course} currentState={this.props.course.state} onChangeState={this.props.onChangeState} />
        <div className='course-name'>{ this.props.course.name }</div>
        <div className='course-hours'>{ this.props.course.hours}hs</div>
        <DependenciesHolder text='Para firmar'/>
        <DependenciesHolder text='Para aprobar'/>
      </div>
    );
  }
};

export default withRouter(Course);
