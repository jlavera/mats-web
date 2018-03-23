import React, { Component }   from 'react'

import Dependency from '../dependency';

require('./style.styl');

class Course extends Component {
  constructor(props) {
    super(props);

    this.isBlockedToSign    = this.isBlockedToSign.bind(this);
    this.isBlockedToApprove = this.isBlockedToApprove.bind(this);
    this.hasDepsToSign      = this.hasDepsToSign.bind(this);
    this.hasDepsToApprove   = this.hasDepsToApprove.bind(this);
    this.hasDeppendencies   = this.hasDeppendencies.bind(this);

    this.isNone             = this.isNone.bind(this);
    this.isSigned           = this.isSigned.bind(this);
    this.isApproved         = this.isApproved.bind(this);
  }

  isBlockedToSign() {
    return this.props.course.dependencies.toSign.some(dep => !dep.crossed);
  }

  isBlockedToApprove() {
    return this.props.course.dependencies.toApprove.some(dep => !dep.crossed);
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

    if (this.isNone()) {
      return (<div className="bg-light text-black course-status">HABILITADA</div>);
    }

    if (this.isSigned()) {
      return (<div className="bg-light text-black course-status">FIRMADA</div>)
    }
  }

  render() {
    return (
      <div className={(this.isSigned() ? 'border-success' : 'border-primary') + " course-container card"}>
        <div className={
          (this.props.course.main ? "underlined" : "" )
          + (this.isApproved() ? ' bg-success text-white' : '')
          + " course-name"}>{this.props.course.name}
        </div>
        <div className={(this.isNone()     ? 'bg-light' : '') + " course-button course-button-pending"}  onClick={() => this.props.onChangeState('N', this.props.course.code)}>PEND</div>
        <div className={(this.isSigned()   ? 'bg-light' : '') + " course-button course-button-signed"}   onClick={() => this.props.onChangeState('S', this.props.course.code)}>FIRM</div>
        <div className={(this.isApproved() ? 'bg-light' : '') + " course-button course-button-approved"} onClick={() => this.props.onChangeState('A', this.props.course.code)}>APRO</div>
        {this.getStatus()}
        <div className="course-deps">
          <div aria-controls="collapseExample" aria-expanded="true" className="course-arrow text-primary" data-target={"#deps-" + this.props.course.code} data-toggle="collapse"></div>
          <span className="glyphicons glyphicons-chevron-down"></span>
          <div id={"deps-" + this.props.course.code} className="collapse">
            {this.props.course.dependencies.toSign.filter(dep => dep.type === 'S').map((dep, index) => <Dependency key={'' + dep.course.code + index} course={dep}/>)}
            {this.hasDepsToSign() && this.hasDepsToApprove() ? <hr className="course-separator" /> : ''}
            {this.props.course.dependencies.toApprove.filter(dep => dep.type === 'A').map((dep, index) => <Dependency key={'' + dep.course.code + index} course={dep}/>)}
          </div>
        </div>
      </div>
      /*
      <div className={(this.isBlocked() ? 'panel-warning' : this.isApproved() ? 'panel-success' : 'panel-info') + " panel"}>
        <div className="panel-heading">
          <div className={(this.props.course.main ? "underlined" : "" ) + " course-name panel-title"}>{this.props.course.name}</div>

          {this.hasDeppendencies() ? <div aria-controls="collapseExample" aria-expanded="true" className="course-arrow glyphicon glyphicon-chevron-down" data-target={"#deps-" + this.props.course.code} data-toggle="collapse" type="button"></div> : ''}

          <div className="separator"></div>
        </div>
        <div className="panel-body">
          <div className="course-code col-xs-4">     {this.props.course.code}      </div>
          <div className="course-duration col-xs-4"> {this.props.course.duration}  </div>
          <div className="course-hours col-xs-4">    {this.props.course.hours}Hrs. </div>

          <div className="separator"></div>

          <div id={"deps-" + this.props.course.code} className="collapse">
            {this.hasDepsToSign() ? <hr className="course-separator" /> : ''}

            {this.props.course.dependencies.toSign.filter(dep => dep.type === 'S').map((dep, index) => <Dependency key={'' + dep.course.code + index} course={dep}/>)}

            {this.hasDepsToApprove() ? <hr className="course-separator" /> : ''}

            {this.props.course.dependencies.toApprove.filter(dep => dep.type === 'A').map((dep, index) => <Dependency key={'' + dep.course.code + index} course={dep}/>)}
          </div>
        </div>
        <div className="panel-footer">
          <div className={(this.isNone()     ? 'active' : '') + " btn btn-default btn-xs col-xs-4"} onClick={() => this.props.onChangeState('N', this.props.course.code)}> N </div>
          <div className={(this.isSigned()   ? 'active' : '') + " btn btn-default btn-xs col-xs-4"} onClick={() => this.props.onChangeState('S', this.props.course.code)}> F </div>
          <div className={(this.isApproved() ? 'active' : '') + " btn btn-default btn-xs col-xs-4"} onClick={() => this.props.onChangeState('A', this.props.course.code)}> A </div>
          <div className="separator"></div>
        <div className="course-grid-container">
          <div className="course-grid-item-course-name">{this.props.course.name}</div>
          <div className={'course-grid-item-course-button ' + (this.isNone()     ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('N', this.props.course.code)}>Pendiente</div>
          <div className={'course-grid-item-course-button ' + (this.isSigned()   ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('S', this.props.course.code)}>Firmada</div>
          <div className="course-grid-item-course-status">Bloqueada</div>
          <div className={'course-grid-item-course-button ' + (this.isApproved() ? 'active' : '') + " btn btn-default btn-xs"} onClick={() => this.props.onChangeState('A', this.props.course.code)}>Aprobada</div>
        </div>
      </div>
      */
    );
  }
};

export default Course;
